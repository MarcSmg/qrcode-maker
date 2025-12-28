import '../../styles/Forms.css';
import InputConnexion from '../InputConnexion';


function EmailTypeForm() {


    return (
        <div className="email-type-container">
            <div className="email-type-header">
                <h2>Entrez votre mail</h2>
                <div className='input-container'>
                    <div className='inline-container'>
                        <InputConnexion
                            id='email_address'
                            name='email_address'
                            icon='Mail'
                            className={'form-input'}
                            label={"E-mail"}
                            placeholder={"qrit@qr.com"}
                        />
                        <InputConnexion
                            id='subject'
                            name='subject'
                            icon='Info'
                            className={'form-input'}
                            label={"Sujet"}
                            placeholder={"Demande de.."}
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
                    ></textarea>
                </div>

            </div>
        </div>
    );
};

export default EmailTypeForm
