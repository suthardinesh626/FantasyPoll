import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'

const Home = () => {
    return (
        <View className="flex justify-center items-center h-full bg-primary" >
            <Text className="text-gray-200" >This is the Home Screeen</Text>
            <StatusBar style='auto' />
            <Text className="" >
                <Text className="text-gray-200" >
                    This is the Entry Point {" "}
                </Text>
                <Text>
                    <Link href="/home" className="text-emerald-400" >This is for Home</Link>
                </Text>
            </Text>
        </View>
    );
}



export default Home;
