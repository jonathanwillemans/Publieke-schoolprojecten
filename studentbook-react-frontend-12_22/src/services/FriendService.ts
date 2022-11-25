import axios from '../axios';
import { User, String } from '../types';

const getAllFriends = () => axios.get<Array<User>>('/friends', {

        
    headers: {
        'id': <string>sessionStorage.getItem('id')
      } 
});

const addFriend = (Name : String ) => axios.post<Array<User>>('/friends', {
    loggedin : sessionStorage.getItem('id'),
    newfriend : Name.string
});

const FriendService = {
    getAllFriends,addFriend,
};

export default FriendService;