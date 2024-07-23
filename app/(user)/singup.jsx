import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import FormField from '../../components/FormField'
import { SafeAreaView } from 'react-native-safe-area-context'
import CutomButton from '../../components/CutomButton'
import { Link } from 'expo-router'
import icons from '../../constants/icons'
import { Image } from 'react-native'

const singup = () => {
  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView>
        <View className="flex-row justify-center items-center gap-7 h-60 " >
          <Text className="text-2xl text-gray-200" >Fantasy Poll</Text>
          <Image
            source={icons.logo}
          />
        </View>
        <View>
          <FormField placeholder={"Fullname"} otherStyles={"w-full p-2"} />
          <FormField placeholder={"Username"} otherStyles={"w-full p-2"} />
          <FormField placeholder={"Password"} otherStyles={"w-full p-2"} />
          <FormField placeholder={"Confirm Password"} otherStyles={"w-full p-2"} />
          <CutomButton
            title="Sing Up"
            containerStyles="m-3"
            textStyles="font-bold"
          />
        </View>
        <View className="flex justify-center items-center" >
          <Text className="text-gray-200" >
            Already a member <Link href="/singin" className='text-green-400' >Sign In</Link>
          </Text>
        </View>
      </ ScrollView>
    </SafeAreaView>

  )
}

export default singup