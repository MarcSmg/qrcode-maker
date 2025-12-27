import React, { useState, useRef } from 'react';
import { CloudUpload, FileText, FileSpreadsheet, Music, File, X } from 'lucide-react';
import '../../styles/Forms.css';


function PDFTypeForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

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
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // Only take the first file
            setSelectedFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        // Reset input value so same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        if (['pdf'].includes(extension)) return <FileText size={20} />;
        if (['xlsx', 'xls', 'csv'].includes(extension)) return <FileSpreadsheet size={20} />;
        if (['mp3', 'wav', 'ogg'].includes(extension)) return <Music size={20} />;
        if (['doc', 'docx'].includes(extension)) return <FileText size={20} />;
        return <File size={20} />;
    };

    const getFileClass = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        if (['pdf'].includes(extension)) return 'pdf';
        if (['xlsx', 'xls', 'csv'].includes(extension)) return 'xsl';
        if (['mp3', 'wav', 'ogg'].includes(extension)) return 'sound';
        if (['doc', 'docx'].includes(extension)) return 'doc';
        return 'default';
    };

    return (
        <div className="pdf-type-container">
            <div className="pdf-type-header">
                <h2>Upload Files</h2>
                <p>Upload documents you want to share with your team</p>
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
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <div className="upload-icon">
                        <CloudUpload size={48} color={isDragging ? "#546FFF" : "#9CA3AF"} />
                    </div>
                    <div className="upload-text">
                        {isDragging ? 'Drop file here' : 'Drag and drop files here'}
                    </div>
                    <div className="upload-subtext">- OR -</div>
                    <button className="browse-btn" onClick={handleBrowseClick}>Browse Files</button>
                </div>

                <div className="file-list-section">
                    <h3>Uploaded Files</h3>

                    {!selectedFile && (
                        <div className="no-file-message">
                            <p>No file selected yet</p>
                        </div>
                    )}

                    {selectedFile && (
                        <div className="file-item">
                            <div className={`file-icon ${getFileClass(selectedFile.name)}`}>
                                {getFileIcon(selectedFile.name)}
                            </div>
                            <div className="file-info">
                                <div className="file-name-row">
                                    <span className="file-name">{selectedFile.name} (100%)</span>
                                    <span className="file-status">Completed</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={handleRemoveFile}>
                                <X size={16} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PDFTypeForm
