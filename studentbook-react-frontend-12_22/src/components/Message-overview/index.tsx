import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import { Message } from '../../types';
import MessagesOverviewTable from '../Message-overview/MessagesOverviewTable';
import { useInterval } from 'use-interval';

const MessageOverview: React.FC = () => {
    const [Message, setMessage] = useState<Array<Message>>([]);

    useEffect(() => {
        getFriends();
    }, []);

    useInterval(() => {
        getFriends();
    }, 5000);

    const getFriends = async () => {
        const res: AxiosResponse<Array<Message>> =
            await MessageService.getAllMLatestPublicMessages();
        setMessage(res.data);
    };

    return (
        <section className="row justify-content-center">
            <MessagesOverviewTable Messages={Message} />
        </section>
    );
};

export default MessageOverview;
