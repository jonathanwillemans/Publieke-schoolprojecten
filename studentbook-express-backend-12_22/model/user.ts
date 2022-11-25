import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToUsers from './user-mapper';
import { User } from '../types';
import { connectionPool } from '../database';

const getUsers = async (onResult: (error: Error, users: User[]) => void) => {
    const query = 'Select u.user_id as user_id, u.name as user_name, u.status as user_status, u.loggedin as user_loggedin, m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, m.type as message_type  FROM chat.user AS u inner join messages AS m ON user_id = m.fk_user'

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToUsers(rows));
     *  })().catch((err) => onResult(err));
     */
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToUsers(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getUser = async (
    userId: number,
    onResult: (error: Error, user: User) => void
) => {
    const query = 'Select u.user_id as user_id, u.name as user_name, u.status as user_status, u.loggedin as user_loggedin, m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, m.type as message_type FROM chat.user AS u inner join messages AS m ON user_id = m.fk_user where user_id = ?'

    try {
        const [row] = await connectionPool.execute(query, [userId]);
        onResult(null, mapToUsers(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};

const getUserWithUsername = async (
    username: string,
    onResult: (error: Error, user: User) => void
) => {
    
    const query = 'Select u.user_id as user_id, u.name as user_name, u.status as user_status, u.loggedin as user_loggedin, m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, m.type as message_type FROM chat.user AS u left outer join messages AS m ON user_id = m.fk_user where name like ?'

    try {
        const [row] = await connectionPool.execute(query, [username]);
        if(mapToUsers(<RowDataPacket[]>row).length == 0){
            throw new Error("User bestaat niet")
        }
        onResult(null, mapToUsers(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};

const changeStatus = async (
    id: number,
    status: string,
    onResult:(error: Error, result: string) => void
) => {
    
    const query1 = "select * from chat.user where user_id = ?"
    const query = "UPDATE chat.user SET status = ? WHERE user_id = ?;"
    try{
        const [check] = await connectionPool.execute(query1, [id]);
        console.log((<RowDataPacket[]>check).length)
        if((<RowDataPacket[]>check).length == 0){
            throw new Error('User not found')
        }else{
            connectionPool.execute(query, [status, id]);
            onResult(null, "succes");
        }
        
    }catch(error){
        onResult(error, null)
    }
};

const getFriends = async (
    loggedin: number,
    onResult:(error: Error, user:User[]) => void
) => {
    const query = 'Select u.user_id as user_id, u.name as user_name, u.status as user_status, u.loggedin as user_loggedin  from chat.user as u  where user_id in (select f.friend_id from chat.friends as f where f.user_id = ?)'
    try{
        const [row] = await connectionPool.execute(query, [loggedin]);
        onResult(null,  mapToUsers(<RowDataPacket[]>row));

    }catch(error){
        onResult(error, null);
    }
    



}

const addFriend = async (
    loggedin: number,
    newfriend: string,
    onResult:(error: Error, user: User) => void

)  => {
    const query1 = "select * from chat.user where name like ?"
   

    const query= 'insert into chat.friends (user_id, friend_id) select ?, user_id from chat.user where name like ?;'
    const user= 'Select u.user_id as user_id, u.name as user_name, u.status as user_status, u.loggedin as user_loggedin, m.message_id as message_id, m.tekst as message_tekst, m.datesent as message_datesent, m.type as message_type FROM chat.user AS u left outer join messages AS m ON user_id = m.fk_user where user_id = (select user_id from chat.user where name like ?)'

    try{
        console.log(loggedin, newfriend)
        const [check] = await connectionPool.execute(query1, [newfriend]);
        if((<RowDataPacket[]>check).length == 0){
            throw new Error('User not found')
        }else{
            connectionPool.execute(query, [loggedin, newfriend]);
            const [row] = await connectionPool.execute(user, [newfriend])
            onResult(null,  mapToUsers(<RowDataPacket[]>row)[0]);
        }
    }catch(error){
        onResult(error, null)
    }
};
 

export { getUsers, getUser, getUserWithUsername , changeStatus, addFriend, getFriends};

  
