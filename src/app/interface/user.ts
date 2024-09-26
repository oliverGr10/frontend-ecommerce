

export interface User{
    username:String;
    email: string;
    password:String;
    role: 'user' | 'admin';
}