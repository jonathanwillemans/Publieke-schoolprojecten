import { RowDataPacket } from 'mysql2';
import { Message } from '../types';

const mapToMessages = (rows: RowDataPacket[]): Message[] => {


    const result: Message[] = [];

    rows.forEach(
        ({
            message_id,
            message_tekst,
            message_datesent,
            message_author,
            message_type,
        }) => {
            const Message: Message = {
                id: message_id,
                tekst: message_tekst,
                datesent: message_datesent,
                author: message_author,
                type: message_type, 
                
        }
        result.push(Message);
    }
        
    );
    return result;
};

export default mapToMessages;