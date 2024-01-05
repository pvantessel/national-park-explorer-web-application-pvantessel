import './Profile.css';
import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import FormInputField from "../../components/forminputfield/FormInputField.jsx";

function Profile() {
    const {user} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [authority, setAuthority] = useState('');
    const [info, setInfo] = useState('');

    // Laad gebruikersinformatie bij het mounten van de component
    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setAuthority(user.roles[0].authority || '');
            setInfo(user.info || '');
        }
    }, [user]);

    return (
        <main className='profile-outer-container'>

            <section className='profile-header'>
                <div className='profile-header-content'>
                    <h1>Profiel pagina</h1>
                </div>
            </section>

            <section className='profile-form-style'>
                <form className='profile-form'>
                    <div className='profile-form-header'>
                        <h4>Uw persoonlijke gegevens <span className='profile-style-username'>{username}</span></h4>
                    </div>

                    <div className='profile-form-entry-style'>
                        <FormInputField
                            labelClass='profile-form-label-class-style'
                            inputClass='profile-form-input-class-style'
                            labelName='inputUsername'
                            labelText='Username'
                            inputType='text'
                            inputName='inputUsername'
                            inputValue={username}
                            setInput={setUsername}
                            readOnly={true}
                        />
                    </div>
                    <div className='profile-form-entry-style'>
                        <FormInputField
                            labelClass='profile-form-label-class-style'
                            inputClass='profile-form-input-class-style'
                            labelName='inputEmail'
                            labelText='E-mailadres'
                            inputType='email'
                            inputName='inputEmail'
                            inputValue={email}
                            setInput={setEmail}
                            readOnly={true}
                        />
                    </div>
                    <div className='profile-form-entry-style'>
                        <FormInputField
                            labelClass='profile-form-label-class-style'
                            inputClass='profile-form-input-class-style'
                            labelName='inputAuthority'
                            labelText='Authorisaties'
                            inputType='text'
                            inputName='inputAuthority'
                            inputValue={authority}
                            setInput={setAuthority}
                            readOnly={true}
                        />
                    </div>
                    <div className='profile-form-entry-style'>
                        <FormInputField
                            labelClass='profile-form-label-class-style'
                            inputClass='profile-form-input-class-style'
                            labelName='inputInfo'
                            labelText='Informatie'
                            inputType='info'
                            inputName='inputInfo'
                            inputValue={info}
                            setInput={setInfo}
                            readOnly={true}
                        />
                    </div>

                </form>
            </section>

            <section className='profile-remark'>
                <div className='profile-remark-content'>
                    <h4 className='profile-style-link'>
                        Terug naar de homepage, klik dan <Link to="/">hier</Link>.
                    </h4>
                </div>
            </section>

        </main>
    );
}

export default Profile;