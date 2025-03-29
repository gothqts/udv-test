export interface IAuthValues{
    email: string;
    password: string;
}
export interface IMessage {
    id: number;
    senderEmail: string;
    text: string;
}

export interface IChatRoom {
    id: number | null;
    name: string;
    members: string[];
    messages: IMessage[];
}


export interface IUserProfile {
    email: string;
    password: string;
    token: string;
}
