export interface User {
    name: string;
    email: string;
    age: number;
    isAdmin: boolean;
    password: string;
}

export interface PrevUserToSend {
    name: string;
    confirmPassword?: string;
    lastName?: string;
    email: string;
    age: number;
    isAdmin: boolean;
    password: string;
}