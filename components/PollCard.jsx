import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';

const PollCard = ({ title, summary, optiontext }) => {
  const { polls } = useGlobalContext();
  // console.log('poll on pollc:', polls.data);
  return (
    <View className="w-full justify-center ">
      <View className=" rounded-lg p-5 m-5  shadow-lg bg-secondary-100 ">
        <Text className="text-xl font-bold mb-2 ">{title}</Text>
        <Text className="text-base text-gray-600 mb-4">{summary}</Text>
        <View>
          <FlatList
            data={optiontext}
            renderItem={({ item }) => (
              <View>
                <Text className="bg-secondary-200 m-1 p-2 rounded-lg text-gray-200 ">{item.optiontext}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default PollCard;
