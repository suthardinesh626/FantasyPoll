import ApiManager from "./ApiManager";
import AsyncStorage from '@react-native-async-storage/async-storage';

const createPoll = async (data) => {
    // console.log('This is the data', data);

    try {
        const token = await AsyncStorage.getItem('accessToken');
        const user = await AsyncStorage.getItem('currentUser');
        // console.log('This the userId', user._id);

        // console.log(token);
        const result = await ApiManager('/poll/createpoll', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        });

        return result;
    } catch (error) {
        console.error('Error creating poll:', error.message);
        throw error;
    }
};

const allPoll = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const result = await ApiManager('/poll/allpoll', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log('This is the polls :', result.data);

        return result.data;
    } catch (error) {
        console.error('Error fetching polls:', error.message);
        return [];
    }
};

const usePoll = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const user = await AsyncStorage.getItem('currentUser');

        if (user) {
            const parsedUser = JSON.parse(user);
            // console.log('This is the user details:', parsedUser._id);
            const result = await ApiManager(`/poll/user/${parsedUser._id}/polls`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(result.data);
            return result.data;
        } else {
            console.error('No current user found.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching user polls:', error.message);
        return [];
    }
};

export { allPoll, usePoll, createPoll }