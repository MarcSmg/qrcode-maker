import { useEffect, useState } from "react";
import "../../styles/Forms.css";
import InputConnexion from "../InputConnexion";

function EmailTypeForm({ setData }) {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        body: "", // renamed from "content" for clarity
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Generate proper mailto: URI
    const generateMailtoUri = () => {
        if (!formData.email.trim()) return "";

        let uri = `mailto:${encodeURIComponent(formData.email.trim())}`;

        const params = new URLSearchParams();
        if (formData.subject.trim()) {
            params.append("subject", formData.subject.trim());
        }
        if (formData.body.trim()) {
            params.append("body", formData.body.trim());
        }

        if (params.toString()) {
            uri += `?${params.toString()}`;
        }

        return uri;
    };

    // Update parent data.content whenever form changes
    useEffect(() => {
        const mailtoUri = generateMailtoUri();

        if (mailtoUri) {
            setData((prev) => ({
                ...prev,
                content: mailtoUri,
                name: formData.subject || "QR Email", // nice default name
            }));
        }
    }, [formData, setData]);

    return (
        <div className="email-type-container">
            <div className="email-type-header">
                <h2>QR Code Email</h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                    Scannez pour ouvrir un email pré-rempli
                </p>

                <div className="input-container">
                    <InputConnexion
                        type="email"
                        id="email"
                        name="email"
                        icon="Mail"
                        className="form-input"
                        label="Adresse e-mail du destinataire"
                        placeholder="contact@exemple.com"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />

                    <InputConnexion
                        type="text"
                        id="subject"
                        name="subject"
                        icon="Type"
                        className="form-input"
                        label="Sujet (facultatif)"
                        placeholder="Bonjour !"
                        onChange={handleChange}
                        value={formData.subject}
                    />

                    <label
                        htmlFor="body"
                        style={{
                            textAlign: "left",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#2b2b2b",
                            marginTop: "16px",
                            display: "block",
                        }}
                    >
                        Message pré-rempli (facultatif)
                    </label>

                    <textarea
                        name="body"
                        id="body"
                        placeholder="Bonjour,\n\nJe vous contacte au sujet de..."
                        rows="5"
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontFamily: "inherit",
                            resize: "none",
                        }}
                        onChange={handleChange}
                        value={formData.body}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailTypeForm;