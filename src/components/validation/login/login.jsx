import { useRef } from "react";
import { useNavigate } from "react-router-dom";

async function getUser(username, password) {
    let response = await fetch(`http://localhost:3000/register/validation/${username}/${password}`, {
        method: "GET",
        mode: "cors"
    });
    return response.json();
};

export const LoginForm = (props) => {
    let username = useRef(null);
    let password = useRef(null);
    let passwordWarning = useRef(null);
    let usernameWarning = useRef(null);
    let navigate = useNavigate();

    const handleSubmit = () => {
        if (username && password) {
            getUser(username.current.value, password.current.value).then(res => {
                switch (res.message) {
                    case 'User found':
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('username', username.current.value);
                        password.current.style.border = '2px solid #808080bd';
                        username.current.style.border = '2px solid #808080bd';
                        passwordWarning.current.style.display = 'none';
                        usernameWarning.current.style.display = 'none';
                        navigate('/');
                        break;
                    case 'Invalid password':
                        password.current.style.borderBottom = '1px solid #e11a1a';
                        passwordWarning.current.style.display = 'block';
                        break;
                    case 'User not found':
                        username.current.style.borderBottom = '1px solid #e11a1a';
                        usernameWarning.current.style.display = 'block';
                        break;
                    default:
                        console.error(`System error`);
                        break;
                };
            }).catch(err => console.error(err));
        } else {
            window.alert(`You need to provide an username and password`);
        };
    };

    return (
        <form className="login">
            <fieldset>
                <legend> Welcome back!</legend>
                <p>
                    Welcome back! Please enter your details.
                </p>
                <p>
                    <input id='username' type="text" name='username' placeholder="Type your username" ref={username} title="Inform your registered username" />
                    <span className="warning" ref={usernameWarning}>User not found</span>
                </p>
                <p>
                    <input id='password' type="password" name='password' placeholder="Password" ref={password} title="Inform a valid password" />
                    <span className="warning" ref={passwordWarning}>Password not found</span>
                </p>
                <p className="passwords">
                    <span>
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember for 30 days</label>
                    </span>
                    <button type="button" name='login' title="Click if you forgot your password">Forgot password</button>
                </p>
                <p className="submit">
                    <button type="button" onClick={handleSubmit} title="Click here to login to your account">Login</button>
                </p>
                <p>
                    Don't have an account? <button type="button" name='register' onClick={props.validationTab} title="Register if you don't have an account">Sign up for free</button>
                </p>
            </fieldset>
        </form>
    );
};