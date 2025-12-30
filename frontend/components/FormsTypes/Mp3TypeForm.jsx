import { useState } from 'react';
import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function Mp3TypeForm({ data, setData }) {

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
        <div className="mp3-type-container">
            <div className="mp3-type-header">
                <h2>Entrez le lien vers votre fichier audio</h2>
                <div className='input-container'>
                    <InputConnexion
                        id='mp3'
                        name='mp3'
                        icon='Link'
                        className={'form-input'}
                        label={"Lien du fichier mp3"}
                        placeholder={"https://example.com/audio/song.mp3"}
                        onChange={handleChange}
                        value={currentData.content}
                    />
                </div>

            </div>
        </div>
    );
};

export default Mp3TypeForm
