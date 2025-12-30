import { useEffect, useState } from "react";
import "../../styles/Forms.css";
import InputConnexion from "../InputConnexion";

function EmailTypeForm({ setData }) {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        content: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const generateEmailQR = ({ email, subject, body }) => {
        let uri = `mailto:${email}`;

        const params = new URLSearchParams();
        if (subject) params.append("subject", subject);
        if (body) params.append("body", body);

        if ([...params].length > 0) {
            uri += `?${params.toString()}`;
        }

        return uri;
    };

    // 🔥 UPDATE QR DATA ON UNMOUNT
    useEffect(() => {
        return () => {
            if (!formData.email) return;

            setData((prev) => ({
                ...prev,
                content: generateEmailQR({
                    email: formData.email,
                    subject: formData.subject,
                    body: formData.content,
                }),
            }));
        };
    }, [formData, setData]);

    return (
        <div className="email-type-container">
            <div className="email-type-header">
                <h2>Entrez votre mail</h2>

                <div className="input-container">
                    <div className="inline-container">
                        <InputConnexion
                            type="text"
                            id="email"
                            name="email"
                            icon="Mail"
                            className="form-input"
                            label="E-mail"
                            placeholder="qrit@qr.com"
                            onChange={handleChange}
                            value={formData.email}
                        />

                        <InputConnexion
                            type="text"
                            id="subject"
                            name="subject"
                            icon="Info"
                            className="form-input"
                            label="Sujet"
                            placeholder="Demande de.."
                            onChange={handleChange}
                            value={formData.subject}
                        />
                    </div>

                    <label
                        htmlFor="content"
                        style={{
                            textAlign: "left",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#2b2b2b",
                        }}
                    >
                        Message
                    </label>

                    <textarea
                        name="content"
                        id="content"
                        placeholder="Entrez votre message"
                        onChange={handleChange}
                        value={formData.content}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailTypeForm;
