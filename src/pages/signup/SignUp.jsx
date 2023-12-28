import './SignUp.css';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormInputField from '../../components/forminputfield/FormInputField.jsx';
import Button from '../../components/button/Button.jsx';
import axios from 'axios';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: username,
                email: email,
                password: password,
                role: [role],
            });
            navigate('/signin');
            console.log(`gebruiker ${username} is aangemaakt`);
        } catch(e) {
            console.error(e);
            toggleError(true);
            console.log(`geen gebruiker aangemaakt`);
        }
        toggleLoading(false);
    }

    return (
        <main className='outer-container-signup signup-background'>
            <section className='signup-inner-container'>
                <h1>Registreren</h1>

                <article className='form-style-signup'>
                    <form onSubmit={handleSubmit} >
                        <div className='form-header-signup'>
                            <h4>Vul onderstaand formulier in om u als gebruiker te registreren.</h4>
                        </div>

                        <div className='form-entry-style-signup'>
                            <FormInputField
                                labelClass='form-label-class-style-signup'
                                inputClass='form-input-class-style-signup'
                                labelName='inputUsername'
                                labelText='Username'
                                inputType='text'
                                inputName='inputUsername'
                                inputValue={username}
                                setInput={setUsername}
                                required={true}
                                placeholder='bv. patrickvantessel'
                            />
                        </div>

                        <div className='form-entry-style-signup'>
                            <FormInputField
                                labelClass='form-label-class-style-signup'
                                inputClass='form-input-class-style-signup'
                                labelName='inputEmail'
                                labelText='E-mailadres'
                                inputType='email'
                                inputName='inputEmail'
                                inputValue={email}
                                setInput={setEmail}
                                required={true}
                                placeholder='bv. patrick.van.tessel@capazit.nl'
                            />
                        </div>

                        <div className='form-entry-style-signup'>
                            <FormInputField
                                labelClass='form-label-class-style-signup'
                                inputClass='form-input-class-style-signup'
                                formClass='form-input-style'
                                labelName='inputPassword'
                                labelText='Password'
                                inputType='password'
                                inputName='inputPassword'
                                inputValue={password}
                                setInput={setPassword}
                                required={true}
                                placeholder='Wachtwoord'
                            />
                        </div>

                        <div className='form-entry-style-signup'>
                            <FormInputField
                                labelClass='form-label-class-style-signup'
                                inputClass='form-input-class-style-signup'
                                formClass='form-input-style'
                                labelName='inputRole'
                                labelText='Rol'
                                inputType='text'
                                inputName='inputRole'
                                inputValue={role}
                                setInput={setRole}
                                required={true}
                                placeholder='bv. admin of user'
                            />
                        </div>

                        {error && <p className='error'>Dit account bestaat al. Gebruik een ander username & E-mailadres.</p>}

                        <div className='form-button-signup'>
                            <Button
                                buttonType='submit'
                                buttonClass='styleButton'
                                buttonState={loading}
                            >
                                Registreren
                            </Button>
                        </div>
                    </form>
                </article>

                <article>
                    <h4 className='style-link-signup'>Heeft u al een account? Dan kunt u <Link
                        to='/signin'>hier</Link> naar de inlogpagina.</h4>
                </article>

            </section>
        </main>
    );
}

export default SignUp;