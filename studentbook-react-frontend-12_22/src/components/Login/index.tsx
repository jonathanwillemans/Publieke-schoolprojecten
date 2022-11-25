import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, Login, Response, StatusMessage } from '../../types';
import classNames from 'classnames';
import { Console } from 'console';

const Login: React.FC = () => {
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const login = async (usernamecred: Login) => {
        try {
            let login = await UserService.login(usernamecred);

            sessionStorage.setItem('id', login.data.id.toString());
            if (sessionStorage.getItem('user_status') == null) {
                let status = await UserService.status({ status: 'Online' });
                sessionStorage.setItem('user_status', status.data.status.toString());
            }
            window.location.reload();
            setNameInput('');
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: error.response.data.errorMessage, type: 'error' },
            ]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (nameInput.trim() == '') {
            setStatusMessages([{ message: 'Voer een valide gebruikersnaam in.', type: 'error' }]);
        } else {
            const loginCredentials = { username: nameInput };
            login(loginCredentials);
        }
    };

    return (
        <article>
            {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            className={classNames({
                                'text-danger': type == 'error',
                            })}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="submit-form">
                <h2>Login</h2>
                <p>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Log in" />
                </p>
            </form>
        </article>
    );
};

export default Login;
