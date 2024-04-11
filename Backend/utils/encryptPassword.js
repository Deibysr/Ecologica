import bcrypt from 'bcrypt';

export default async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10)
    const encrypted = await bcrypt.hash(password, salt)
    return encrypted
}