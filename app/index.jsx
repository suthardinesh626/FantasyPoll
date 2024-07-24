import { Link } from 'expo-router';
import { Redirect, router } from "expo-router";
import { Text, View, Image, } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import icons from '@/constants/icons';
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'

const Home = () => {

    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;
    return (
        <View className="flex justify-center items-center h-full bg-primary" >
            <View className="flex-col justify-center items-center gap-4 mb-10" >
                <Text className="text-gray-200 text-4xl" >Fantasy Poll</Text>
                <Image
                    source={icons.logo}
                />

            </View>
            <View className="flex justify-center items-center" >
                <Text className="text-gray-200  text-3xl m-5 text-justify" >
                    Welcome to the Fantasy Poll here you share your opinon and people can reponse to it.  {" "}
                </Text>
            </View>
            <CustomButton
                title="Continue with Email"
                handlePress={() => router.push("/singin")}
                containerStyles="w-full mt-7 mb-2 "
                textStyles="font-bold"
            />
            <Text className="text-gray-200 text-xl" >
                Or
            </Text>
            <CustomButton
                title="Register"
                handlePress={() => router.push("/singup")}
                containerStyles="w-full mt-2"
                textStyles="font-bold"
            />

            <StatusBar style='auto' />
        </View >
    );
}



export default Home;
