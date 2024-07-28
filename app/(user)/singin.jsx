import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import icons from '../../constants/icons';
import { useGlobalContext } from '../../context/GlobalProvider'; // Import context

const Signin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useGlobalContext(); // Get login function from context

  const handleLogin = async () => {
    try {
      const result = await login({
        email: email.toLowerCase(),
        username: username,
        password: password
      });

      router.replace("/home"); // Use router to navigate
      // 
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
            onChangeText={setUsername}
            inputStyle='h-12 bg-blue-200 text-gray-100 border-none'
            otherStyles="w-full p-2"
          />
          <FormField
            title="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            otherStyles="w-full p-2"
            inputStyle='h-12 bg-blue-200 border-none'

          />
          <FormField
            title="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            otherStyles="w-full p-2"
            inputStyle='h-12 bg-blue-200 text-gray-100 border-none'

          />
          <CustomButton
            title="Sign In"
            containerStyles="w-full m-4"
            textStyles="font-bold"
            handlePress={handleLogin}
          />
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-gray-200">
            Don't have an account? <Link href="/singup" className="text-green-400">Sign Up</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
