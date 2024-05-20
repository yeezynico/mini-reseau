import React, { useState } from 'react';
import Cookies from 'js-cookie'

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            identifier: email,
            password: password
        };

        fetch('http://localhost:1337/api/auth/local', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                Cookies.get('token', data.jwt);
                console.log(data);
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire :', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Adresse e-mail:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Mot de passe:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LogIn;