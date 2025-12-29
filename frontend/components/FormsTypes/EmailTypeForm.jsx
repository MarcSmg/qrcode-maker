import { useState } from 'react';
import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function EmailTypeForm({ setData }) {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        content: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            console.log(updated);
            return updated;
        });
    };




    return (
        <div className="email-type-container">
            <div className="email-type-header">
                <h2>Entrez votre mail</h2>
                <div className='input-container'>
                    <div className='inline-container'>
                        <InputConnexion
                            type={'text'}
                            id='email'
                            name='email'
                            icon='Mail'
                            className={'form-input'}
                            label={"E-mail"}
                            placeholder={"qrit@qr.com"}
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <InputConnexion
                            type={'text'}
                            id='subject'
                            name='subject'
                            icon='Info'
                            className={'form-input'}
                            label={"Sujet"}
                            placeholder={"Demande de.."}
                            onChange={handleChange}
                            value={formData.subject}

                        />
                    </div>
                    <label style={{
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#2b2b2b',
                    }} htmlFor="content">Message</label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder='Entrez votre message'
                        onChange={handleChange}
                    ></textarea>
                </div>

            </div>
        </div>
    );
};

export default EmailTypeForm
