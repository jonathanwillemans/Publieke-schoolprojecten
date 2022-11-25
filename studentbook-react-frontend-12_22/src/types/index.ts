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

export interface Response {
    status: 'error' | 'success';
    userId?: number;
    errorMessage?: string;
}

export interface Login {
    username: string;
}

export interface StatusMessage {
    message: string;
    type: 'error' | 'success';
}

export interface Status {
    status: string
}

export interface String {
    string: string
}


export interface PMessage {
    tekst : string
}







