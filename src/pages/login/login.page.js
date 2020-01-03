import React from 'react';

function Login() {
    return (
        <form>
            <label>Email</label>
            <input type="email" name="email" />
            <br />
            <label>Password</label>
            <input type="password" name="password" />
            <br />
            <input type="submit" />
        </form>
    )
}

export default Login;