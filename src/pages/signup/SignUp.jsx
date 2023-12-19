import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import FormInputField from '../../components/forminputfield/FormInputField.jsx';

function SignUp() {
    const { signup } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        signup();
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <FormInputField
                        labelName="inputUsername"
                        labelText="Username"
                        inputType="text"
                        inputName="inputUsername"
                        inputValue={username}
                        setInput={setUsername}
                        required={true}
                        placeholder="bv. Patrick van Tessel"
                    />

                    <FormInputField
                        labelName="inputEmail"
                        labelText="Emailadres"
                        inputType="email"
                        inputName="inputEmail"
                        inputValue={email}
                        setInput={setEmail}
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

                <button type="submit">Registreren</button>

            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;