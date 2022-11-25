import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Message } from '../types';
import { connectionPool } from '../database';
import mapToMessages from './message-mapper';
 
const getLast5MessagesOfFriend = async (
    loggedin: number,
    onResult: (error: Error, Messages: Message[] ) => void) => {
    

    const query= "select  m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, u.name as message_author from messages as m inner join chat.user as u on m.fk_user = u.user_id where m.fk_user in (select f.friend_id from chat.friends as f where f.user_id = ?)  order by message_datesent desc LIMIT 5"
    
    try {
        const [rows] = await connectionPool.query(query,[loggedin] );
        onResult(null, mapToMessages(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }


};

const getLast5Messages = async (onResult: (error: Error, Messages: Message[] ) => void) => {
    const query= "select  m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, m.type as message_type from messages as m inner join user m.message_idas u on  where type like 'Public' order by message_datesent LIMIT 5"
    
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToMessages(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }


};



const addMessage = async (
    tekst: string,
    date: string,
    type : string,
    fkuser: number,
    onResult: (error: Error ) => void
) => {
    console.log(tekst, fkuser, type, date)
    const query = 'INSERT INTO chat.messages (tekst, datesent, type,  fk_user) VALUES (?, ?, ?, ?);'

    let now = new Date()
    try {
        connectionPool.execute(query, [tekst, date, type,  fkuser])
        onResult(null)
    } catch (error) {
        onResult(error) 
    }
}

export {getLast5MessagesOfFriend, addMessage, getLast5Messages };

