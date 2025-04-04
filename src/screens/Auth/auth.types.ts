export interface IAuthValues{
    email: string;
    password: string;
}
export interface IMessage {
    id: number | null;
    senderEmail: string;
    text: string;
    images?:Image[];
}
export interface Image {
    name: string;
    url: string;
    type: string;
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
