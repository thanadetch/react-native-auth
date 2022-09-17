import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Envs } from '../constants/envs';

const BASE_URL = Envs.FIRE_BASE_URL;

export const getMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/message.json`, {
        params: {
            auth: token
        }
    });
    return response.data;
};