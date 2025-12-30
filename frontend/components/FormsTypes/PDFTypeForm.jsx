import React, { useState, useRef, useEffect } from 'react';
import { CloudUpload, FileText, X } from 'lucide-react';
import '../../styles/Forms.css';

function PDFTypeForm({ setData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update parent data whenever file changes
  useEffect(() => {
    if (!selectedFile) {
      setData((prev) => ({
        ...prev,
        content: "",
        name: "",
      }));
      return;
    }

    // Fake short URL for live preview (real one comes after creation)
    const previewShortUrl = "https://qrit.app/r/abc123";

    setData((prev) => ({
      ...prev,
      name: selectedFile.name.replace(/\.pdf$/i, ""), // clean name without extension
      content: previewShortUrl, // QR points to tracking link
      file: selectedFile, // pass file for final submission
    }));
  }, [selectedFile, setData]);

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
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Veuillez déposer un fichier PDF valide");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else if (file) {
      alert("Type de fichier non supporté. Veuillez sélectionner un PDF.");
      e.target.value = "";
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="pdf-type-container">
      <div className="pdf-type-header">
        <h2>Importez votre PDF</h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Transformez votre document en QR code téléchargeable avec suivi des scans
        </p>
      </div>

      <div className="pdf-type-content">
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
            <CloudUpload size={48} color={isDragging ? "#546FFF" : "#9CA3AF"} />
          </div>

          <div className="upload-text">
            {isDragging ? 'Déposez votre PDF ici' : 'Glissez et déposez votre PDF ici'}
          </div>

          <div className="upload-subtext">- OU -</div>

          <button className="browse-btn" onClick={handleBrowseClick}>
            Parcourir les fichiers
          </button>
        </div>

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

              <button className="remove-btn" onClick={handleRemoveFile} title="Supprimer">
                <X size={18} />
              </button>
            </div>
          )}

          {selectedFile && (
            <div style={{ marginTop: "20px", padding: "16px", background: "#f0f9ff", borderRadius: "12px", textAlign: "center" }}>
              <p style={{ fontSize: "14px", color: "#0369a1", margin: "0 0 8px" }}>
                <strong>Prévisualisation du lien court :</strong>
              </p>
              <code style={{
                background: "#e0f2fe",
                color: "#0c4a6e",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "15px",
                wordBreak: "break-all",
              }}>
                https://qrit.app/r/abc123
              </code>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "8px 0 0" }}>
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