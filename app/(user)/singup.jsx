import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import icons from '../../constants/icons';
import { userRegister } from '../../api/user_api'; // Corrected the import from user_api to userAuth

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const userData = {
      fullName,
      email,
      username,
      password,
      avatar: {
        uri: avatar,
        type: 'image/jpeg', // or your image type
        name: 'profile.jpg', // or your image name
      },
    };

    const response = await userRegister(userData);
    console.log('user detail on ' , userData);
    if (response && response.statusCode === 200) {
      router.replace("/singin"); // Use router to navigate
      Alert.alert('Success', 'Registered successfully');
    } else {
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-row justify-center items-center gap-7 h-60">
          <Text className="text-2xl text-gray-200">Fantasy Poll</Text>
          <Image source={icons.logo} />
        </View>
        <View>
          <FormField
            title="Fullname"
            placeholder="Fullname"
            value={fullName}
            onChangeText={setFullName}
            otherStyles="w-full p-3"
            inputStyle="h-10 bg-blue-200 text-gray-100 border-none"
          />
          <FormField
            title="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            otherStyles="w-full p-3"
            inputStyle="h-10 bg-blue-200 text-gray-100 border-none"
          />
          <FormField
            title="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            otherStyles="w-full p-3"
            inputStyle="h-10 bg-blue-200 text-gray-100 border-none"
          />
          <FormField
            title="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            otherStyles="w-full p-3"
            inputStyle="h-10 bg-blue-200 text-gray-100 border-none"
          />
          <FormField
            title="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            otherStyles="w-full p-3"
            inputStyle="h-10 bg-blue-200 text-gray-100 border-none"
          />

          <View className="flex justify-center items-center">
            <TouchableOpacity
              onPress={pickImage}
              style={styles.avatarContainer}
              className="bg-blue-200 "
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Text className="text-black">Select Avatar</Text>
              )}
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={handleSignup}
            containerStyles="m-3"
            textStyles="font-bold"
          />
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-gray-200">
            Already a member <Link href="/signin" className="text-green-400">Sign In</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Signup;
