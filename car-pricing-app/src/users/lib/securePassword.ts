import { randomBytes,scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);

export function generateSalt(){
    return randomBytes(8).toString('hex');
}

export async function hashPassword(password:string,salt:string){
    const hash = await scrypt(password,salt,64) as Buffer ;
    const result = salt+"."+ hash.toString('hex');
    return result;
}

export async function comparePassword(claimedPassword:string,correctPassword:string){
    const [salt]= correctPassword.split('.');
    const result = await hashPassword(claimedPassword,salt);

    return result === correctPassword;
}