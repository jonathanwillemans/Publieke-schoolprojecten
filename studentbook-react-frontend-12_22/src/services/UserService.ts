import axios from '../axios';
import { User, Login , String, Status} from '../types';

const getAllUsers = () => axios.get<Array<User>>('/user');

const login = (username: Login) => axios.post<User>('/user/login', username);

const status = (status : Status) => axios.put<Status>('/user/status', {
    id: sessionStorage.getItem('id'),
    status: status.status
});

const logout = () => {
    sessionStorage.removeItem("id");
    window.location.reload();
}
const UserService = {
    getAllUsers,login,logout, status
};



export default UserService;
