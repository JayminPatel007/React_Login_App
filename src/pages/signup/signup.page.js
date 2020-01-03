import React from 'react';

function Signup() {
    return (
        <form>
            <label>Email</label>
            <input type="email" name="email" />
            <label>Name</label>
            <input type="text" name="name" />
            <label>Gender</label>
            <section name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </section>
            <label>BirthDate</label>
            <input type="date" name="birthDate" />
            <label>Address</label>
            <textarea name="address"></textarea>
            <br />
            <label>Password</label>
            <input type="password" name="password" />
            <br />
            <input type="submit" />
        </form>
    )
}

export default Signup;