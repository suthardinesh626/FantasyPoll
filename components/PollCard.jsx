import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { votePoll, deletePoll } from '../api/poll_api';
import icons from '../constants/icons';

const PollCard = ({ pollId, title, summary, options, profileCard }) => {

  const handleVote = async (optionId) => {
    try {
      const result = await votePoll(pollId, optionId);
      console.log('Thi is the result', result);
      if (result) {
        Alert.alert("Success", "Voted successfully!");
      } else if (!result) {
        
      }
    } catch (error) {
      // Alert.alert("Error", "An error occurred while voting. Please try again.");
      Alert.alert("You have","Already Voted!",  );
    }
  };

  const handleDelete = async () => {
    if (!pollId) {
      console.warn('No pollId available for deletion.');
      return;
    }

    try {
      const result = await deletePoll(pollId);
      if (result) {
        Alert.alert("Success", "Poll deleted successfully!");
      } else {
        Alert.alert("Error", "Failed to delete poll. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the poll. Please try again.");
    }
  };

  return (
    <View className="w-full justify-center">
      <View className="rounded-lg p-5 m-5 shadow-lg bg-secondary-100">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-700 mb-2">{title}</Text>
            <Text className="text-base text-gray-600 mb-4">{summary}</Text>
          </View>
          {profileCard === 'user' && (
            <View>
              <TouchableOpacity onPress={handleDelete}>
                <Image
                  className="w-6 h-6"
                  source={icons.bin}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <FlatList
            data={options}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => handleVote(item._id)}>
                  <View className="flex-row justify-between bg-secondary-200 m-1 p-2 rounded-lg">
                    <Text className="text-gray-200">{item.optiontext}</Text>
                    <Text className="text-gray-200">Votes: {item.votes}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default PollCard;
