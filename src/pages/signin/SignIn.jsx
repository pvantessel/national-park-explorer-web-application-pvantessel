import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import FormInputField from '../../components/forminputfield/FormInputField.jsx';

function SignIn() {
    const { login } = useContext(AuthContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        login(emailAddress);
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <FormInputField
                        labelName="inputEmail"
                        labelText="Emailadres"
                        inputType="email"
                        inputName="inputEmail"
                        inputValue={emailAddress}
                        setInput={setEmailAddress}
                        required={true}
                        placeholder="bv. patrick.van.tessel@capazit.nl"
                    />

                    <FormInputField
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

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;