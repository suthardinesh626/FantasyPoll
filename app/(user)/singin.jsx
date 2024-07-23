import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import FormField from '../../components/FormField';
import CutomButton from '../../components/CutomButton';
import icons from '../../constants/icons';
import { userLogin } from '../../api/user_api';

const Singin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const handleLogin = async () => {
    try {

      const result = await userLogin({
        email: email.toLowerCase(),
        username:username,
        password: password
      
      });
      // console.log("This is the result in frontend", result.data);

      if (result.status === 200) {
        await AsyncStorage.setItem("accessToken", result.data.data.accessToken);
        router.replace("home"); // Use navigation.replace for navigation
      } else {
        Alert.alert("Login Failed", "Please check your credentials and try again.");
      }
    } catch (err) {
      console.error('Login Error:', err);
      Alert.alert("Login Error", err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full p-2">
      <ScrollView>
        <View className="flex-row justify-center items-center gap-7 h-60">
          <Text className="text-2xl text-gray-200">Fantasy Poll</Text>
          <Image source={icons.logo} />
        </View>
        <View className="flex justify-center items-center">
          <FormField
            title="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername} // Add onChangeText prop
            otherStyles="w-full p-2"
          />
          <FormField
            title="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail} // Add onChangeText prop
            otherStyles="w-full p-2"
          />
          <FormField
            title="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword} // Add onChangeText prop
            secureTextEntry // Add secureTextEntry for password field
            otherStyles="w-full p-2"
          />
          <CutomButton
            title="Sign In" // Corrected typo
            containerStyles="w-full m-4"
            textStyles="font-bold"
            handlePress={handleLogin}
          />
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-gray-200">
            Don't have an account? <Link href="/signup" className="text-green-400">Sign Up</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Singin;
