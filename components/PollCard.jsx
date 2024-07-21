import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const PollCard = ({ title, summary, options }) => {
  return (
    <View className="w-full justify-center items-center " >

      <View className="rounded-lg p-5 m-5  shadow-lg w-2/3 bg-secondary-100 ">
        <Text className="text-xl font-bold mb-2">{title}</Text>
        <Text className="text-base text-gray-600 mb-4">{summary}</Text>
        <View>
          <Text className="" >option 1</Text>
          <Text>option 2</Text>
          <Text>option 3</Text>
          <Text>option 4</Text>
          <Text>option 4</Text>
        </View>
      </View>

    </View>
  );
};

export default PollCard;
