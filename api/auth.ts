import axios, { AxiosResponse } from 'axios';
import { UserAuth } from '../types/UserAuth';
import { Envs } from '../constants/envs';

const API_KEY = Envs.API_KEY;
const BASE_URL = Envs?.BASE_URL;

export const authenticate = async <T = any>(mode: string, email: string, password: string) => {
    const url = `${BASE_URL}:${mode}?key=${API_KEY}`;

    const response = await axios.post<T, AxiosResponse<T>, { email: string, password: string, returnSecureToken: boolean }>(url, {
        email,
        password,
        returnSecureToken: true
    });

    return response.data;
};

export const createUser = async (email: string, password: string): Promise<UserAuth> => {
    return authenticate<UserAuth>('signUp', email, password);
};

export const login = async (email: string, password: string): Promise<UserAuth> => {
    return authenticate<UserAuth>('signInWithPassword', email, password);
};
