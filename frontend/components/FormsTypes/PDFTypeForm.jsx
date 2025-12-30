import React, { useState, useRef, useEffect } from 'react';
import { CloudUpload, FileText, X } from 'lucide-react';
import '../../styles/Forms.css';

function PDFTypeForm({ setData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [customName, setCustomName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update parent whenever file or name changes
  useEffect(() => {
    if (!selectedFile) {
      setData((prev) => ({
        ...prev,
        file: null,
        name: '',
        content: '',
      }));
      return;
    }

    // This will be replaced by real code_url after backend response
    const placeholderUrl = 'https://qrit.app/r/abc123';

    setData((prev) => ({
      ...prev,
      // Important: pass the actual File object
      file: selectedFile,
      // Use custom name or fallback to filename
      name: customName || selectedFile.name.replace(/\.pdf$/i, ''),
      // For live preview in Step 3
      content: placeholderUrl,
    }));
  }, [selectedFile, customName, setData]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF valide.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit (adjust to your backend)
      alert('Le fichier est trop volumineux (max 10 Mo).');
      return;
    }

    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setCustomName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="pdf-type-container">
      <div className="pdf-type-header">
        <h2>QR Code PDF</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Transformez votre document en QR code téléchargeable avec suivi des scans
        </p>
      </div>

      <div className="pdf-type-content">
        {/* Optional name input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Nom du document (facultatif)
          </label>
          <input
            type="text"
            placeholder="Ex: Contrat 2025, Menu, Brochure..."
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '15px',
            }}
          />
        </div>

        {/* Upload zone */}
        <div
          className={`upload-area ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <div className="upload-icon">
            <CloudUpload size={48} color={isDragging ? '#546FFF' : '#9CA3AF'} />
          </div>

          <div className="upload-text">
            {isDragging ? 'Déposez votre PDF ici' : 'Glissez et déposez votre PDF ici'}
          </div>

          <div className="upload-subtext">- OU -</div>

          <button className="browse-btn" onClick={handleBrowseClick}>
            Parcourir les fichiers
          </button>
        </div>

        {/* Selected file preview */}
        <div className="file-list-section">
          <h3>Fichier importé</h3>

          {!selectedFile ? (
            <div className="no-file-message">
              <p>Aucun fichier sélectionné</p>
            </div>
          ) : (
            <div className="file-item">
              <div className="file-icon pdf">
                <FileText size={24} />
              </div>

              <div className="file-info">
                <div className="file-name-row">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-status">Prêt</span>
                </div>
                <div className="file-size">
                  {formatFileSize(selectedFile.size)}
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              <button className="remove-btn" onClick={handleRemoveFile}>
                <X size={18} />
              </button>
            </div>
          )}

          {selectedFile && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f0f9ff',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              <strong>Prévisualisation du lien court :</strong><br/>
              <code style={{
                background: '#e0f2fe',
                color: '#0c4a6e',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                marginTop: '8px'
              }}>
                https://qrit.app/r/abc123
              </code>
              <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#64748b' }}>
                Le vrai lien sera généré après création
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PDFTypeForm;