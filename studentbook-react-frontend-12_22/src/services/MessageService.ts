import axios from '../axios';
import { PMessage, String , Message } from '../types';

const getAllMLatestPublicMessages = () => axios.get<Array<Message>>('/messages', {

        
            headers: {
                'id': <string>getuserid()
              } 
});

const publishmessage = (tekst: PMessage, date = new Date()) => axios.post<String>('/messages', {
    
    tekst: tekst.tekst,
     userid: sessionStorage.getItem('id'),
     type: 'Public',
     date: date.toISOString().slice(0, 19).replace('T', ' ')
});


function getuserid() {
    if(sessionStorage.getItem('id')){
        return sessionStorage.getItem('id')
    }else{
        return ''
    }
  }

const MessageService = {
    
    getAllMLatestPublicMessages,publishmessage,
};

export default MessageService;