import ApiManager from "./ApiManager";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export { allPoll, usePoll }