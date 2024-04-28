export interface User {
    name: string;
    email: string;
    age: number;
    isAdmin: number;
    password: string;
    id: string
}

export interface FormRegisterDataUser {
    name: string;
    lastName?: string;
    email: string;
    age: number;
    password: string;
    confirmPassword?: string;
    isAdmin:number;
    [key:string]: string | number | undefined
  }