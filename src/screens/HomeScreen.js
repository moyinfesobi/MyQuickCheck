import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTopStories } from '../services/hackerNewsAPI';
import { setStories } from '../redux/storiesSlice';



const HomeScreen = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.stories);

  // Fetch stories on mount
  useEffect(() => {
    const loadStories = async () => {
      const fetchedStories = await fetchTopStories(0, 10);
      dispatch(setStories(fetchedStories));
    };
    loadStories();
  }, [dispatch]);

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.storyContainer}>
          <Text style={styles.storyTitle}>{item.title}</Text>
        </View>
      )}
      onEndReached={() => console.log('Load more stories')}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
