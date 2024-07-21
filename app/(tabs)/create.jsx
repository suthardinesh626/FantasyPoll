import { Text, View } from "react-native"
import FormField from "../../components/FormField"
import CustomButton from "../../components/CutomButton"

const Create = () => {
    return (
        <View className="flex justify-center items-center h-full bg-primary " >
            <FormField placeholder={"Title"} otherStyles={"w-full p-2"} />
            <FormField placeholder={"Summary"} otherStyles={"w-full p-2"} />
            <View className="w-2/3" >
                <FormField placeholder={"Opiton 1"} />
                <FormField placeholder={"Opiton 2"} />
                <FormField placeholder={"Opiton 3"} />
                <FormField placeholder={"Opiton 4"} />
            </View>
            <CustomButton
                title={'Publish'}
                containerStyles={"w-2/3 m-6"}
            />
        </View>
    )
}

export default Create