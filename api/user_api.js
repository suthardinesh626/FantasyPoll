// userAuth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

const userRegister = async (data) => {
    try {
    console.log('this is the user registration details on api function: data', data);

        const result = await ApiManager('/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });

        console.log("Registration result:", result);
        if (result.status === 200 && result.data.data.accessToken) {
            await AsyncStorage.setItem('accessToken', result.data.data.accessToken);
            await AsyncStorage.setItem('currentUser', JSON.stringify(result.data.data.user));
        }

        return result;
    } catch (error) {
        console.error('Error during registration:', error.message);
    }
};
const userLogin = async (data) => {
    try {
        const result = await ApiManager('/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });

        console.log("this is the result:", result);
        if (result.status === 200 && result.data.data.accessToken) {
            await AsyncStorage.setItem('accessToken', result.data.data.accessToken);
            await AsyncStorage.setItem('currentUser', JSON.stringify(result.data.data.user));
        }

        return result;
    } catch (error) {
        console.error('Error during login:', error.message);
    }
};

const currentUser = async () => {

    try {
        const user = await AsyncStorage.getItem('currentUser');
        // console.log(user);
        if (user) {
            return JSON.parse(user);
        } else {

            return null;
        }
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        return null;
    }
};

const userLogout = async () => {
    try {
        // Clear AsyncStorage
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('currentUser');

        // Optionally, you can also clear all AsyncStorage items if needed
        // await AsyncStorage.clear();

        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};

export { userLogin, currentUser, userLogout, userRegister };
