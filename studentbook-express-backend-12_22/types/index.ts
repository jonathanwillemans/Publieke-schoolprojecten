export interface User {
    id: number;
    name: string;
    Messages: Array<Message> | null;
    friends: Array<User> | null;
    status: string;
    loggedIn: boolean;
    
    
}

export interface Message {
    id: number;
    tekst: string;
    datesent: string;
    author: string;
    type: string;
}






