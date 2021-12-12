import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const submit = (e) => {
        e.preventDefault();

        // login with basic error handling in wrong email or password entered
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                setError("Wrong email or password")
                setPassword('')
                setEmail('')
            } else {
                setError('')
            }
        });
    };

    return (

        <form onSubmit={submit} className="login-form">
            <label htmlFor="email">Email</label>

            <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>

            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <button type="submit">Log In</button>
            </div>
            <div>
                {error !== '' && <p>{error}</p>}
            </div>
        </form>

    );
};