import { ActivityIndicator, FlatList, Image, Text, View, ScrollView } from 'react-native';
import PollCard from '../../components/PollCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import icons from '../../constants/icons';
import { useState } from 'react';

const Home = () => {
    const { polls, user } = useGlobalContext();
    // console.log("Poll data from Home:", polls);

    return (
        <SafeAreaView className="flex justify-start w-full h-full bg-primary">
            <View className="flex-row justify-between m-2">
                <View className="flex-row justify-center items-center">
                    <Image
                        className="w-9 h-9 m-2"
                        source={icons.logo}
                    />
                    <Text className="text-gray-200 font-extrabold text-xl m-2">Fantasy Poll</Text>
                </View>
                {user && (
                    <View className="flex-row justify-end items-center">
                        <Image
                            className="h-10 w-10 m-2 rounded-3xl"
                            source={{ uri: user.avatar }}
                        />
                        <Text className="text-gray-200 font-bold text-xl m-2">
                            {user?.fullName}
                        </Text>
                    </View>
                )}
            </View>
            <View>
                <FlatList
                    data={polls.data}
                    renderItem={({ item }) => (
                        <PollCard
                            title={item.title}
                            summary={item.summary}
                            optiontext={item.options}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;
