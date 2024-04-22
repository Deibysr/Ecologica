export interface User {
    name: string;
    email: string;
    age: number;
    isAdmin: boolean;
    password: string;
}

export interface FormRegisterDataUser {
    name: string;
    lastName?: string;
    email: string;
    age: number;
    password: string;
    confirmPassword?: string;
    isAdmin:boolean;
    [key:string]: string | number | boolean | undefined
  }