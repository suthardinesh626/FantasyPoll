import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import FormField from '../../components/FormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import icons from '../../constants/icons';
import { userRegister } from '../../api/user_api';
import * as DocumentPicker from 'expo-document-picker';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const userData = {
      fullName,
      email,
      username,
      password,
      avatar
    };

    const result = await userRegister(userData);
    if (result && result.status === 200) {
      Alert.alert("Success", "Registration successful!");
    } else {
      Alert.alert("Error", "Registration failed!");
    }
  };

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*'],  // Type should be an array
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log('Document picker result:', result);

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        console.log('Picked file URI:', fileUri);
        setAvatar(fileUri);
      } else {
        console.log('Document picker cancelled or no assets found');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert("Error", "Could not pick the document.");
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
            placeholder="Fullname"
            value={fullName}
            onChangeText={setFullName}
            otherStyles="w-full p-2"
          />
          <FormField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            otherStyles="w-full p-2"
          />
          <FormField
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            otherStyles="w-full p-2"
          />
          <FormField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            otherStyles="w-full p-2"
          />
          <FormField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            otherStyles="w-full p-2"
          />

          {/* Avatar Section */}
          <View className="flex justify-center items-center" >
            <TouchableOpacity
              onPress={openPicker}
              style={styles.avatarContainer}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarText}>Select Avatar</Text>
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
  },
});

export default Signup;
