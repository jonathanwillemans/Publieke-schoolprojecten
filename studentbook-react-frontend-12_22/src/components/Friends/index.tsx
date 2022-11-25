import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import FriendService from '../../services/FriendService';
import { User, StatusMessage, String } from '../../types';
import FriendOverviewTable from '../Friends/Friend-overview';
import classNames from 'classnames';
import { useInterval } from 'use-interval';

const Friends: React.FC = () => {
    const [Friend, setFriend] = useState<Array<User>>([]);
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    useEffect(() => {
        getFriends();
    }, []);

    useInterval(() => {
        getFriends();
    }, 5000);

    const addfriend = async (nameInput: String) => {
        try {
            let status = await FriendService.addFriend(nameInput);

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
            const nameinput = { string: nameInput };
            addfriend(nameinput);
        }
    };

    const getFriends = async () => {
        const res: AxiosResponse<Array<User>> = await FriendService.getAllFriends();
        setFriend(res.data);
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
            <h3 className="p-3">Friends</h3>
            <form onSubmit={handleSubmit} className="submit-form">
                <p className="d-flex flex-row">
                    <label>
                        <input
                            type="text"
                            placeholder="Add Friend"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Add" />
                </p>
            </form>
            <section>
                <FriendOverviewTable Friends={Friend} />
            </section>
        </article>
    );
};

export default Friends;
