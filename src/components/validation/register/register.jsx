import { useRef } from "react";

async function createAccount(username, password) {
    let response = await fetch(`http://localhost:3000/register/${username}/${password}`, {
        method: "POST",
        mode: "cors"
    });
    return response.json();
};

async function verifyAccount(username) {
    let response = await fetch(`http://localhost:3000/register/verify/${username}`, {
        method: "GET",
        mode: "cors"
    });
    return response.json();
};

export const RegisterForm = (props) => {
    let username = useRef(null);
    let password = useRef(null);
    let usernameWarning = useRef(null);

    const verifyUsername = e => verifyAccount(e.target.value).then(res => {
        if (res.message) {
            usernameWarning.current.style.display = 'block';
            e.target.style.border = '2px solid #e11a1a';
        } else {
            usernameWarning.current.style.display = 'none';
            e.target.style.border = '1px solid #808080bd';
        };
    }).catch(err => console.error(err));

    const handleSubmit = () => {
        if (username.current.value && password.current.value) {
            createAccount(username.current.value, password.current.value).then(res => {
                props.validationTab('login');
            }).catch(err => console.error(err));
        } else {
            window.alert(`You need to provide a valid username and a password`);
        };
    };

    return (
        <form className="register">
            <fieldset>
                <legend>Create your account</legend>
                <p> Let's get started with your free account.</p>
                <p>
                    <input id='username' type="text" name='username' minLength={8} placeholder="Type your username (minimum of 8 characters)" ref={username} onBlur={verifyUsername} title="Register a new username" />
                    <span className="warning" ref={usernameWarning}>Username already exists</span>
                </p>
                <p>
                    <input id='password' type="password" name='password' placeholder="Password" ref={password} title="Register your password" />
                </p>
                <p className="submit">
                    <button type="button" onClick={handleSubmit} title="Click to create your account">Create Account</button>
                </p>
                <p>
                    Already has an account? <button type="button" name='login' onClick={props.validationTab} title="Signin if you already have an account">Sign In</button>
                </p>
            </fieldset>
        </form>
    );
};