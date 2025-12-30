import { useState } from 'react';
import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function SocialTypeForm({ data, setData }) {

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
        <div className="social-type-container">
            <div className="social-type-header">
                <h2>Entrez le lien de votre profil</h2>
                <div className='input-container'>
                    <InputConnexion
                        id='facebook'
                        name='facebook'
                        icon='Link'
                        className={'form-input'}
                        label={"Lien de profil"}
                        placeholder={"https://facebook.com/..."}
                        onChange={handleChange}
                        value={currentData.content}
                    />
                </div>

            </div>
        </div>
    );
};

export default SocialTypeForm
