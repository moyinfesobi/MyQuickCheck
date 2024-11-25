import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your profile picture
        style={styles.image}
      />
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.text}>
        Hi, I'm [Your Name], a passionate developer who loves building mobile
        applications. This app is a project to showcase how to interact with
        the Hacker News API and implement user authentication locally.
      </Text>
      <Text style={styles.text}>
        GitHub: [Your GitHub Link]
      </Text>
      <Text style={styles.text}>
        LinkedIn: [Your LinkedIn Link]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default AboutScreen;
