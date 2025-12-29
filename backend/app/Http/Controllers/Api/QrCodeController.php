<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QrCode as QrCodeModel;
use App\Models\QrScan;
use App\Models\QrType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\QrCode;
use SimpleSoftwareIO\QrCode\Facades\QrCode as QrCodeGenerator;
use Illuminate\Support\Facades\Validator;

class QrCodeController extends Controller
{
    // Récupérer tous les types de QR code
    public function getQrTypes()
    {
        $types = QrType::all();
        return response()->json($types);
    }

    public function show($id){
        $qrcode = QrCodeModel::with('type')->findOrFail($id);

        return response()->json([
            'data' => $qrcode
    ]);
}

    // Créer un nouveau QR code
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type_id' => 'required|exists:qr_types,id',
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'scan_limit' => 'nullable|integer|min:1',
            'design' => 'nullable|array',
            'metadata' => 'nullable|array',
        ]);

        $type = QrType::findOrFail($validated['type_id']);
        $content = $this->formatContentForType($type->name, $validated['content'], $validated['metadata'] ?? []);

        // dd(Auth::id());


        // $qrCode = QrCodeModel::create([
        //     'user_id' => Auth::id(),
        //     'type_id' => $validated['type_id'],
        //     'name' => $validated['name'],
        //     'content' => $content,
        //     'short_code' => $this->generateUniqueShortCode(),
        //     'scan_limit' => $validated['scan_limit'] ?? null,
        //     'design' => $validated['design'] ?? null,
        //     'metadata' => $validated['metadata'] ?? [],
        // ]);
        
        $qrCode = QrCodeModel::create([
            'user_id' => Auth::id(),
            'type_id' => $validated['type_id'],
            'name' => $validated['name'],
            'content' => $content,
            'short_code' => $this->generateUniqueShortCode(),
            'scan_limit' => $validated['scan_limit'] ?? null,
            'design' => $validated['design'] ?? null,
            'metadata' => $validated['metadata'] ?? [],
        ]);

        return response()->json([
            'message' => 'QR code créé avec succès',
            'data' => $qrCode->load('type'),
        ], 201);
    }

    // Générer l'image du QR code
    public function generateQrCode($shortCode)
    {
        $qrCode = QrCodeModel::where('short_code', $shortCode)->firstOrFail();
        
        // Vérifier la limite de scans
        if ($qrCode->isReachedScanLimit()) {
            return response()->json(['message' => 'Limite de scans atteinte pour ce QR code'], 403);
        }
        
        // Enregistrer le scan
        // $this->recordScan($qrCode);
        
        // Récupérer les paramètres de design

        $defaultDesign = [
            'color' => [0, 0, 0],
            'background' => [255, 255, 255],
            'size' => 300,
            'margin' => 1,
            'style' => 'square',
            'eye' => 'square',
        ];

        $design = array_merge(
            $defaultDesign,
            $qrCode->design ?? []
        );

        // $design = $qrCode->design ?? [
        //     'color' => [0, 0, 0],
        //     'background' => [255, 255, 255],
        //     'size' => 300,
        //     'margin' => 1,
        //     // 'style' => 'square',
        //     // 'eye' => 'square',
        //     // 'gradient' => null, 
        // ];

        // Générer le QR code avec les options de design

        $url =rtrim(config('app.domain'), '/') . '/r/' . $qrCode->short_code;

        $qrImage = QrCodeGenerator::format('svg')
            ->size($design['size'])
            ->color($design['color'][0] ?? 0, $design['color'][1] ?? 0, $design['color'][2] ?? 0)
            ->backgroundColor($design['background'][0] ?? 255, $design['background'][1] ?? 255, $design['background'][2] ?? 255)
            ->margin($design['margin'])
            ->generate($url);

        return response($qrImage)->header('Content-Type', 'image/svg+xml');
    }

    // Enregistrer un scan
    protected function recordScan(QrCodeModel $qrCode): void
    {
        $qrCode->increment('scan_count');
        
        // Obtenir les informations de géolocalisation (à implémenter avec un service externe si nécessaire)
        $geoData = [
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'country' => null,
            'city' => null,
            'region' => null,
            'latitude' => null,
            'longitude' => null,
        ];
        
        // Enregistrer le scan dans la base de données
        QrScan::create([
            'qr_code_id' => $qrCode->id,
            'ip_address' => $geoData['ip_address'],
            'user_agent' => $geoData['user_agent'],
            'country' => $geoData['country'],
            'city' => $geoData['city'],
            'region' => $geoData['region'],
            'latitude' => $geoData['latitude'],
            'longitude' => $geoData['longitude'],
        ]);
    }

    // Obtenir l'historique des scans
    public function getScanHistory($id): JsonResponse
    {
        $qrCode = QrCodeModel::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $scans = $qrCode->scans()
            ->select([
                'id',
                'ip_address',
                'country',
                'city',
                'region',
                'latitude',
                'longitude',
                'user_agent',
                'created_at'
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'total_scans' => $scans->count(),
            'scans' => $scans
        ]);
    }

    // Lister les QR codes de l'utilisateur
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');
        $typeId = $request->input('type_id');
        
        $query = QrCodeModel::where('user_id', Auth::id())
            ->with('type')
            ->withCount('scans');
            
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        if ($typeId) {
            $query->where('type_id', $typeId);
        }
        
        $qrCodes = $query->paginate($perPage);
            
        return response()->json([
            'data' => $qrCodes->items(),
            'pagination' => [
                'total' => $qrCodes->total(),
                'per_page' => $qrCodes->perPage(),
                'current_page' => $qrCodes->currentPage(),
                'last_page' => $qrCodes->lastPage(),
            ]
        ]);
    }
    
    // Méthodes privées pour le formatage du contenu selon le type de QR code
    private function formatContentForType(string $type, string $content, array $metadata = []): string
    {
        switch (strtolower($type)) {
            case 'website':
                return $this->formatWebsiteContent($content);
            case 'social':
                return $this->formatSocialContent($content, $metadata);
            case 'pdf':
                return $this->formatPdfContent($content, $metadata);
            case 'text':
            default:
                return $content;
        }
    }
    
    private function formatWebsiteContent(string $url): string
    {
        // S'assurer que l'URL a le bon format
        if (!preg_match("~^https?://~i", $url)) {
            $url = 'https://' . $url;
        }
        return $url;
    }
    
    private function formatSocialContent(string $username, array $metadata): string
    {
        $platform = $metadata['platform'] ?? 'instagram';
        
        return match(strtolower($platform)) {
            'facebook' => "https://facebook.com/{$username}",
            'twitter' => "https://twitter.com/{$username}",
            'instagram' => "https://instagram.com/{$username}",
            'linkedin' => "https://linkedin.com/in/{$username}",
            'tiktok' => "https://tiktok.com/@{$username}",
            default => $username,
        };
    }
    
    private function formatPdfContent(string $fileUrl, array $metadata): string
    {
        // Ici, vous pourriez ajouter une logique pour télécharger et stocker le PDF
        // puis retourner une URL sécurisée pour le téléchargement
        return $fileUrl;
    }
    
    private function generateUniqueShortCode(int $length = 8): string
    {
        do {
            $code = Str::random($length);
        } while (QrCodeModel::where('short_code', $code)->exists());
        
        return $code;
    }

    public function updateDesign(Request $request, QrCode $qrcode){
        $validated = $request->validate([
            'margin' => 'sometimes|integer|min:0|max:10',
            'size' => 'sometimes|integer|min:100|max:1000',
            'color' => 'sometimes|array|size:3',
            'background' => 'sometimes|array|size:3',
        ]);

        $design = $qrcode->design ?? [];

        foreach ($validated as $key => $value) {
            $design[$key] = $value;
        }

        $qrcode->design = $design;
        $qrcode->save();

        return response()->json([
            'message' => 'Design mis à jour',
            'design' => $qrcode->design,
        ]);
    }

    public function updateStatus(Request $request, QrCode $qrcode){
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $qrcode->is_active = $validated['is_active'];
        $qrcode->save();

        return response()->json([
            'message' => 'Statut du QR code mis à jour',
            'is_active' => $qrcode->is_active,
        ]);
    }

}

