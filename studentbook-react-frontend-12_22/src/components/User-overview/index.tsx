import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User } from '../../types';
import MessagesOverviewTable from '../Message-overview/MessagesOverviewTable';
import UsersOverviewTable from './UsersOverviewTable';

const UserOverview: React.FC = () => {
    const [Users, setUsers] = useState<Array<User>>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const res: AxiosResponse<Array<User>> = await UserService.getAllUsers();
        setUsers(res.data);
    };

    return (
        <section className="row justify-content-center">
            <UsersOverviewTable Users={Users} setSelectedUser={setSelectedUser} />
            {selectedUser && selectedUser.Messages && (
                <MessagesOverviewTable Messages={selectedUser.Messages} />
            )}
        </section>
    );
};

export default UserOverview;
