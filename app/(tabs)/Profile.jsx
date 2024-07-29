import { View, Text, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useEffect, useState } from 'react';
import { usePoll } from '../../api/poll_api';
import PollCard from '../../components/PollCard';
import icons from '../../constants/icons';
import { userLogout } from '../../api/user_api';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const fetchedPolls = await usePoll();
        setPolls(fetchedPolls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleLogout = async () => {
    await userLogout();
    setUser(null);
    setIsLogged(false);
    router.replace("/");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text >Error: {error}</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full w-full">

      <View className="flex-row justify-end m-4">
        <Text className="text-gray-200 text-xl mr-3" onPress={handleLogout}>
          Logout
        </Text>
        <Image
          className="h-8 w-8"
          source={icons.logout}
          onPress={handleLogout}
        />
      </View>
      <Text className="text-3xl font-bold text-gray-200 text-center">Profile</Text>
      <View className="">
        <FlatList
          ListHeaderComponent={() => (
            user ? (
              <View className="w-full flex justify-center items-center">
                <View className="w-16 h-16 flex justify-center items-center">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="w-[90%] h-[90%] rounded-lg border border-white"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text className="text-gray-200 text-3xl">
                    {user?.fullName}
                  </Text>
                </View>
              </View>
            ) : (
              <Text className="text-gray-200 text-xl text-center">User not logged in</Text>
            )
          )}
        />
      </View>

      <View className="flex justify-center items-center w-full">
        <Text className="text-gray-200 text-2xl">
          Your Polls: {polls.data ? polls.data.length : 0}
        </Text>
      </View>

      <FlatList
        data={polls.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PollCard
            pollId={item._id}
            title={item.title}
            summary={item.summary}
            options={item.options}
            profileCard="user"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
