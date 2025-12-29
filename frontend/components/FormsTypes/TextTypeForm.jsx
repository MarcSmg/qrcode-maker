import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function TextTypeForm({setData}) {


    return (
        <div className="url-type-container">
            <div className="url-type-header">
                <h2>Entrez votre texte a convertir en code QR</h2>
                <div className='input-container'>
                    <InputConnexion
                        className={'form-input'}
                        label={"Entrez votre texte"}
                        placeholder={"Votre texte ici..."}
                    />
                </div>

            </div>
        </div>
    );
};

export default TextTypeForm
