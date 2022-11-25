import { RowDataPacket } from 'mysql2';
import { User, Message } from '../types';

const mapToUsers = (rows: RowDataPacket[]): User[] => {
    const result: User[] = [];

    rows.forEach(
        ({
            user_id,
            user_name,
            user_status,            
            user_loggedin,
            message_id,
            message_tekst,
            message_datesent,
            message_author,
            message_type,
            friend_name,
            friend_status,
        }) => {
            const Message: Message = {
                id: message_id,
                tekst: message_tekst,
                datesent: message_datesent,
                author: message_author,
                type: message_type,
            };

            
            const user: User = {
                id: user_id, name: user_name, status: user_status, loggedIn: user_loggedin,
                Messages: [Message],
                friends: []
            };

            const existing = result.find((el) => el.id === user_id);
            if (!existing) {
                result.push(user);
            } else {
                existing.Messages.push(Message);
               
            }
        }
    );

    return result;
};

export default mapToUsers;
