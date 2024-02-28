import './SignUp.css';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormInputField from '../../components/forminputfield/FormInputField.jsx';
import Button from '../../components/button/Button.jsx';
import axios from 'axios';
import ScrollToTopOnMount from "../../components/scrolltotoponmount/ScrollToTopOnMount.jsx";

function SignUp() {
    const apiKey = 'nationalparkexplorer:a';
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authority, setAuthority] = useState('');

    const [info, setInfo] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isAuthorityFocused, setIsAuthorityFocused] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('https://api.datavortex.nl/nationalparkexplorer/users',
                {
                    username: username,
                    email: email,
                    password: password,
                    info: info,
                    authorities: [
                        {
                            authority: authority
                        }
                    ]
                },
                {
                    headers: {
                        'X-Api-Key': apiKey,
                    }
                }
            );
            navigate('/signin');

        } catch (e) {
            console.error(e);
            toggleError(true);
            console.log(`geen gebruiker aangemaakt`);
        }
        toggleLoading(false);
    }


    return (
        <main className='signup-outer-container'>
            <ScrollToTopOnMount />

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
                            placeholder={isUsernameFocused ? '' : 'bv. patrickvantessel'}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            readOnly={false}
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
                            placeholder={isEmailFocused ? '' : 'bv. patrick.van.tessel@capazit.nl'}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            readOnly={false}
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
                            placeholder={isPasswordFocused ? '' : 'Wachtwoord'}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            readOnly={false}
                        />
                    </div>

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
                            labelName='inputAuthority'
                            labelText='Autorisaties'
                            inputType='text'
                            inputName='inputAuthority'
                            inputValue={authority.toUpperCase()}
                            setInput={setAuthority}
                            required={true}
                            placeholder={isAuthorityFocused ? '' : 'bv. USER of ADMIN'}
                            onFocus={() => setIsAuthorityFocused(true)}
                            onBlur={() => setIsAuthorityFocused(false)}
                            readOnly={false}
                        />
                    </div>

                    <div className='signup-form-entry-style'>
                        <FormInputField
                            labelClass='signup-form-label-class-style'
                            inputClass='signup-form-input-class-style'
                            labelName='inputInfo'
                            labelText='Informatie'
                            inputType='text'
                            inputName='inputInfo'
                            inputValue={info}
                            setInput={setInfo}
                            required={false}
                            readOnly={false}
                        />
                    </div>

                    {error &&
                        <p className='error'>Er bestaat al een account onder deze naam.</p>}

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