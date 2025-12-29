import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function SocialTypeForm({setData}) {


    return (
        <div className="social-type-container">
            <div className="social-type-header">
                <h2>Entrez le lien de votre profil</h2>
                <div className='input-container'>
                    <InputConnexion
                        icon='Link'
                        className={'form-input'}
                        label={"Lien de profil"}
                        placeholder={"https://facebook.com/..."}
                    />
                </div>

            </div>
        </div>
    );
};

export default SocialTypeForm
