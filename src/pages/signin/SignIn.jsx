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
        <main className='signin-outer-container'>
                <section className='signin-header'>
                    <div className='signin-header-content'>
                        <h1>Inloggen</h1>
                    </div>
                </section>

                <section className='signin-form-style'>
                    <form onSubmit={handleSubmit}>
                        <div className='signin-form-header'>
                            <h4>U kunt hieronder inloggen met uw username en password.</h4>
                        </div>

                        <div className='signin-form-entry-style'>
                            <FormInputField
                                labelClass='signin-form-label-class-style'
                                inputClass='signin-form-input-class-style'
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

                        <div className='signin-form-entry-style'>
                            <FormInputField
                                labelClass='signin-form-label-class-style'
                                inputClass='signin-form-input-class-style'
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

                        <div className='signin-form-button'>
                            <Button
                                buttonType='submit'
                                buttonClass='styleButton'
                                buttonState={loading}
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </section>

            <section className='signin-remark'>
                <div className='signin-remark-content'>
                    <h4 className='signin-style-link'>
                        Heeft u nog geen account? Dan kunt u zich <Link to="/signup">hier</Link> eerst registreren.
                    </h4>
                </div>
            </section>
        </main>
    );
}

export default SignIn;