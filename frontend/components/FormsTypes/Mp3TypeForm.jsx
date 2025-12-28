import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function Mp3TypeForm() {


    return (
        <div className="mp3-type-container">
            <div className="mp3-type-header">
                <h2>Entrez le lien vers votre fichier audio</h2>
                <div className='input-container'>
                    <InputConnexion
                        icon='Link'
                        className={'form-input'}
                        label={"Lien du fichier mp3"}
                        placeholder={"https://example.com/audio/song.mp3"}
                    />
                </div>

            </div>
        </div>
    );
};

export default Mp3TypeForm
