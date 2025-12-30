import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

function QrDownload({ data }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 260,
      height: 260,
      data: data.content,
      dotsOptions: data.dotsOptions,
      backgroundOptions: data.backgroundOptions,
      imageOptions: data.imageOptions,
      image: data.image,
    });

    qrRef.current.innerHTML = "";
    qrCodeRef.current.append(qrRef.current);
  }, []);

  // Sync updates
  useEffect(() => {
    qrCodeRef.current?.update({
      data: data.content,
      dotsOptions: data.dotsOptions,
      backgroundOptions: data.backgroundOptions,
      imageOptions: data.imageOptions,
      image: data.image,
    });
  }, [data]);

  const download = (format) => {
    qrCodeRef.current.download({
      name: "qrcode",
      extension: format,
    });
  };

  return (
    <div className="edit-main">
      <h3 style={{ paddingLeft: 30, fontSize: 20, marginBottom: 30 }}>
        4. Prévisualiser et télécharger
      </h3>

      <div
        className="main-container no-scrollbar"
      >
        {/* QR Preview */}
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 14,
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
          }}
        >
          <div ref={qrRef} />
        </div>


        <h2 style={{
          display: 'flex',
          width: '100%',
          padding: '0',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          Télécharger
        </h2>
        {/* Download buttons */}
        <div className="download-buttons" style={{ display: "flex", flexWrap: "wrap" }}>
          <button style={{
            paddingInline: '30px',
          }}
            className="btn-primary" onClick={() => download("png")}>
            PNG
          </button>

          <button style={{
            paddingInline: '30px',
          }}
            className="btn-primary" onClick={() => download("svg")}>
            SVG
          </button>

          <button style={{
            paddingInline: '30px',
          }}
            className="btn-primary" onClick={() => download("jpeg")}>
            JPG
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrDownload;
