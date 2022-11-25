import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import MessageService from '../../services/MessageService';
import { User, PMessage, Response, StatusMessage } from '../../types';
import classNames from 'classnames';
import { Console } from 'console';

const Publish: React.FC = () => {
    const [textInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const status = async (textInput: PMessage) => {
        try {
            let publish = await MessageService.publishmessage(textInput);
            console.log(sessionStorage.getItem('id'));
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
        if (textInput.trim() == '') {
            setStatusMessages([{ message: 'Vul iets in', type: 'error' }]);
        } else {
            const nameinput = { tekst: textInput };
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
            <form onSubmit={handleSubmit} className="mb-4 submit-form">
                <h3>Publish message</h3>

                <label>
                    <input
                        type="text"
                        className="input-large search-query"
                        value={textInput}
                        placeholder="Message"
                        onChange={(event) => setNameInput(event.target.value)}
                    />
                </label>
                <input className=" m-1" type="submit" value="Publish" />
            </form>
        </article>
    );
};

export default Publish;
