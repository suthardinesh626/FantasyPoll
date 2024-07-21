import React from 'react';
import { Text, View } from 'react-native';
import PollCard from '../../components/PollCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaView>

            <View className="flex justify-start items-center h-full bg-primary" >
                <PollCard
                    title={"Title"}
                    summary={"Summary"}
                />
            </View>
        </SafeAreaView>
    );
}



export default Home;
