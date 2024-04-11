import bcrypt from 'bcrypt';

export default async function comparePassword(password, hashDB){
    const isPassword = bcrypt.compare(password, hashDB);
    return isPassword
}