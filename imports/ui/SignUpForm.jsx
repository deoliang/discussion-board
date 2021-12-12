import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


export const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const submit = (e) => {
        e.preventDefault();

        //create user with basic error handling
        Accounts.createUser({
            email,
            password
        }, (err) => {
            if (err) {
                setError(err.reason)
                setEmail('')
                setPassword('')
            } else {
                setError('')
            }
        });
        //log in to system only if sign up is for a brand new user
        if (Meteor.users.find({ "emails.address" : email})) {
            setEmail('')
            setPassword('')
            return
        } else {
            Meteor.loginWithPassword(email, password);
        }

    }

    return (

        <form onSubmit={submit} className="signUp-form">
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
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <button type="submit">Sign Up</button>
            </div>
            <div>
                {error !== '' && <p>{error}</p>}
            </div>
        </form>

    );
}
