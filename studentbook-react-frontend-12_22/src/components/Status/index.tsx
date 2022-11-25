import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, Login, Response, StatusMessage, String, Status } from '../../types';
import classNames from 'classnames';
import { Console } from 'console';

const Status: React.FC = () => {
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const status = async (nameInput: Status) => {
        try {
            let status = await UserService.status(nameInput);
            sessionStorage.setItem('user_status', status.data.status.toString());

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
            const nameinput = { status: nameInput };
            status(nameinput);
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
                <h3>My status: {sessionStorage.getItem('user_status')}</h3>
                <p className="d-flex flex-row">
                    <label>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Change" />
                </p>
            </form>
        </article>
    );
};

export default Status;
