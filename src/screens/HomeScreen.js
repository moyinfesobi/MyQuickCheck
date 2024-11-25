import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { fetchTopStories } from "../services/hackerNewsAPI";

const HomeScreen = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10; // Number of stories per page

  const loadStories = async (reset = false) => {
    setLoading(true);
    try {
      const newStories = await fetchTopStories(reset ? 0 : page, pageSize);
      setStories(reset ? newStories : [...stories, ...newStories]);
      if (reset) setPage(0); // Reset page for refresh
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStories = () => {
    setRefreshing(true);
    loadStories(true).finally(() => setRefreshing(false));
  };

  const loadMoreStories = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      loadStories();
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.story}>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.storyBy}>By: {item.by}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshStories} />
        }
        onEndReached={loadMoreStories}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
   
  },
  story: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyBy: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
