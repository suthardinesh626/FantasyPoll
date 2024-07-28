// userAuth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

const userRegister = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const result = await ApiManager('/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        });

        console.log('this the user detsil wihle resgisetring:', result.data);

        return result.data;

    } catch (error) {
        console.error('Error during registration:', error.message);
        return null;
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

        if (result.status === 200 && result.data.data.accessToken) {
            await AsyncStorage.setItem('accessToken', result.data.data.accessToken);
            await AsyncStorage.setItem('currentUser', JSON.stringify(result.data.data.user));
            return result.data.data.user;
        }

        return null;
    } catch (error) {
        console.error('Error during login:', error.message);
        return null;
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
