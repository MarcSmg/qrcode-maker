import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";


export default function QrCustom({ data, setData }) {

  const qrCodeRef = useRef(null);
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 260,
      height: 260,
      data: data.content,
      dotsOptions: data.dotsOptions,
      backgroundOptions: data.backgroundOptions,
      imageOptions: data.imageOptions,
    });
    qrCodeRef.current.append(qrRef.current);

  }, []);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    qrCodeRef.current.update({
      data: data.content,
      dotsOptions: data.dotsOptions,
      backgroundOptions: data.backgroundOptions,
      imageOptions: data.imageOptions,
      image: data.image,
    });
  }, [data]);


  const handlePatternChange = (type) => {
    setData(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        type,
      },
    }));
  };

  const handleColorChange = (color) => {
    setData(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        color,
      },
    }));
  };

  const handleLogoChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };


  const toggle = id => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <style>{`
        .page {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          max-width: 1100px;
          margin: auto;
        }

        .left {
          flex: 1;
        }

        .right {
          width: 60vw;
          max-width: 500px;
        }

        .qr-box {
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section {
          background: white;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          user-select: none;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .icon img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }

        .texts h4 {
          margin: 0;
          font-size: 16px;
        }

        .texts p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #64748b;
        }

        .arrow {
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.2s ease;
          user-select: none;
        }

        .arrow.open {
          transform: rotate(90deg);
        }

        .content {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        button {
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .page{
            flex-direction: column-reverse;
            width: 100%;
            flex-direction-flex-start;
            padding-bottom: 100px;
          }

          .right {
            width: 100vw;
            padding-inline: 20px;
          }
        }
      `}</style>
      <div className='edit-main'>
        <h3 style={{
          paddingLeft: '30px',
          fontSize: '20px',
          width: '100%',
          marginBottom: '30px',
          fontWeight: '600',
        }}>3. Donnez du style a votre code QR</h3>
        <div className="page">
          <div className="left">
            <div className="qr-box">
              <div ref={qrRef} />
            </div>
          </div>
          <div className="right">
            <div className="section">
              <div className="header"
                onClick={() => toggle("pattern")}
              >
                <div className="header-left">
                  <div className="icon">
                    <img src="/images/motif.png" alt="Motif" />
                  </div>
                  <div className="texts">
                    <h4>Motif du QR</h4>
                    <p>Forme du QR code</p>
                  </div>
                </div>

                <div
                  className={`arrow ${openId === "pattern" ? "open" : ""}`}
                >
                  ►
                </div>
              </div>

              {openId === "pattern" && (
                <div className="content">
                  <button onClick={() => { handlePatternChange("square"); console.log("Carre") }}>
                    Carré
                  </button>
                  <button onClick={() => { handlePatternChange("dots"); console.log("Points") }}>
                    Points
                  </button>
                  <button onClick={() => { handlePatternChange("rounded"); console.log("Arrondi") }}>
                    Arrondi
                  </button>
                </div>
              )}
            </div>

            <div className="section">
              <div className="header"
                onClick={() => toggle("color")}
              >
                <div className="header-left">
                  <div className="icon"><img src="/images/couleur.png" alt="Couleur" /></div>
                  <div className="texts">
                    <h4>Couleur</h4>
                    <p>Couleur du QR code</p>
                  </div>
                </div>

                <div
                  className={`arrow ${openId === "color" ? "open" : ""}`}
                >
                  ►
                </div>
              </div>

              {openId === "color" && (
                <div className="content">
                  <button onClick={() => handleColorChange("#000000")}>Noir</button>
                  <button onClick={() => handleColorChange("#22c55e")}>Vert</button>
                  <button onClick={() => handleColorChange("#3b82f6")}>Bleu</button>
                  <button onClick={() => handleColorChange("#ef4444")}>Rouge</button>
                </div>
              )}
            </div>

            <div className="section">
              <div className="header"
                onClick={() => toggle("logo")}
              >
                <div className="header-left">
                  <div className="icon"><img src="/images/logo.png" alt="logo" /></div>
                  <div className="texts">
                    <h4>Ajouter un logo</h4>
                    <p>Importer une image</p>
                  </div>
                </div>

                <div
                  className={`arrow ${openId === "logo" ? "open" : ""}`}
                >
                  ►
                </div>
              </div>

              {openId === "logo" && (
                <div className="content">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={e => handleLogoChange(e.target.files[0])}
                  />

                  <button onClick={() => fileInputRef.current.click()}>
                    Choisir un logo
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}