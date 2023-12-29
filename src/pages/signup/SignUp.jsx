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
        } catch (e) {
            console.error(e);
            toggleError(true);
            console.log(`geen gebruiker aangemaakt`);
        }
        toggleLoading(false);
    }

    return (
        <main className='signup-outer-container'>
            <section className='signup-header'>
                <div className='signup-header-content'>
                    <h1>Registreren</h1>
                </div>
            </section>

            <section className='signup-form-style'>
                <form onSubmit={handleSubmit}>
                    <div className='signup-form-header'>
                        <h4>Vul onderstaand formulier in om u als gebruiker te registreren.</h4>
                    </div>

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
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

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
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

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
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

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
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

                    {error &&
                        <p className='error'>Dit account bestaat al. Gebruik een ander username & E-mailadres.</p>}

                    <div className='signup-form-button'>
                        <Button
                            buttonType='submit'
                            buttonClass='styleButton'
                            buttonState={loading}
                        >
                            Registreren
                        </Button>
                    </div>
                </form>
            </section>

            <section className='signup-remark'>
                <div className='signup-remark-content'>
                    <h4 className='signup-style-link'>
                        Heeft u al een account? Dan kunt u <Link to='/signin'>hier</Link> naar de inlogpagina.
                    </h4>
                </div>
            </section>
        </main>
    );
}

export default SignUp;