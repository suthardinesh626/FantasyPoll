import { Text, View, Alert, FlatList } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { createPoll } from "../../api/poll_api"; // Adjust the import path as necessary
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from "react-native-safe-area-context";



const Create = () => {
    const { user } = useGlobalContext()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async () => {
        if (!title || !summary || options.some(option => !option)) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        const payload = {
            userId: user._id,
            title,
            summary,
            options: options.map(option => ({ optiontext: option }))
        };

        try {
            const response = await createPoll(payload);
            if (response.status === 201) {
                Alert.alert("Success", "Poll created successfully.");
                // Reset form
                setTitle('');
                setSummary('');
                setOptions(['', '', '', '']);
            } else {
                Alert.alert("Error", "Failed to create poll.");
            }
        } catch (error) {
            console.error('Error creating poll:', error.message);
            Alert.alert("Error", "An error occurred. Please try again.");
        }
    };

    const renderOption = ({ item, index }) => (
        <FormField
            placeholder={`Option ${index + 1}`}
            value={item}
            onChangeText={(value) => handleOptionChange(index, value)}
        />
    );

    return (
        <SafeAreaView className=" h-full bg-primary">
            <View className="flex-col justify-center items-center m-5 p-2 rounded-2xl shadow-lg bg-secondary-100" >
                <FormField
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    inputStyle='h-10 bg-secondary-200 text-gray-100 border-none'
                    otherStyles="w-full p-2 "
                />
                <FormField
                    placeholder="Summary"
                    value={summary}
                    onChangeText={setSummary}
                    inputStyle='h-10 bg-secondary-200 text-gray-100 border-none'
                    otherStyles="w-full p-2"
                />
                <View className="w-2/3">
                    <FlatList
                        data={options}
                        renderItem={renderOption}
                        keyExtractor={(item, index) => index.toString()}
                        inputStyle='h-10 bg-secondary-200'

                    />
                </View>
                <CustomButton
                    title="Publish"
                    handlePress={handleSubmit}
                    containerStyles="w-2/3 m-6"
                    textStyles="font-bold"
                />
            </View>
        </SafeAreaView>

    );
};

export default Create;