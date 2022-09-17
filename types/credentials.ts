import { Auth } from './auth';

export interface Credentials extends Auth {
    confirmEmail: string;
    confirmPassword: string;
}
