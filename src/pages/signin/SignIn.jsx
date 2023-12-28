import './SignIn.css';
import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import FormInputField from '../../components/forminputfield/FormInputField.jsx';
import axios from 'axios';
import Button from '../../components/button/Button.jsx';

function SignIn() {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });

            // geef de JWT token aan de login-functie van de context mee
            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <main className='outer-container-signin signin-background'>
            <section className='signin-inner-container'>
                <h1>Inloggen</h1>

                <article className='form-style-signin'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-header-signin'>
                            <h4>U kunt hieronder inloggen met uw username en password.</h4>
                        </div>

                        <div className='form-entry-style-signin'>
                            <FormInputField
                                labelClass='form-label-class-style-signin'
                                inputClass='form-input-class-style-signin'
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

                        <div className='form-entry-style-signin'>
                            <FormInputField
                                labelClass='form-label-class-style-signin'
                                inputClass='form-input-class-style-signin'
                                labelName="inputPassword"
                                labelText="Password"
                                inputType="password"
                                inputName="inputPassword"
                                inputValue={password}
                                setInput={setPassword}
                                required={true}
                                placeholder="Wachtwoord"
                            />
                        </div>

                        {error && <p className="error">De combinatie van username en wachtwoord is onjuist !</p>}

                        <div className='form-button-signin'>
                            <Button
                                buttonType='submit'
                                buttonClass='styleButton'
                                buttonState={loading}
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </article>

                <article>
                    <h4 className='style-link-signin'>Heeft u nog geen account? Dan kunt u zich <Link to="/signup">hier</Link> eerst registreren.</h4>
                </article>
            </section>
        </main>
    );
}

export default SignIn;