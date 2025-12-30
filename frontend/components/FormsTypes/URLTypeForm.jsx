import { useState } from 'react';
import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function URLTypeForm({ data, setData }) {
    const [currentData, setCurrentData] = useState(data)

    const handleChange = (e) => {
        const { value } = e.target;
        setCurrentData(prev => ({
            ...prev,
            content: value,
        }));
        setData(prev => ({
            ...prev,
            content: value,
        }));
    };

    return (
        <div className="url-type-container">
            <div className="url-type-header">
                <h2>Entrez votre lien a convertir en code QR</h2>
                <div className='input-container'>
                    <InputConnexion
                        id='link'
                        name='link'
                        icon='Link'
                        className={'form-input'}
                        label={"Entrez votre lien"}
                        placeholder={"https://..."}
                        onChange={handleChange}
                        value={currentData.content}
                    />
                </div>

            </div>
        </div>
    );
};

export default URLTypeForm
