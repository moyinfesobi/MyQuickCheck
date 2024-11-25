import  { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

import * as SQLite from 'expo-sqlite/legacy';

// Open the SQLite database
const db = SQLite.openDatabase('hackernews.db');

const LoginScreen = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



//   Create table if it doesn't exist
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT);',
        [],
        () => console.log('Table created successfully'),
        (_, error) => {
          console.error('Table creation error:', error.message);
          return false;
        }
      );
    });
  }, []);

  // Register user
  const registerUser = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (username, password) VALUES (?, ?);',
        [username, password],
        () => {
          Alert.alert('Success', 'Registration successful!');
          setUsername('');
          setPassword('');
        },
        (_, error) => {
          Alert.alert('Error', 'Username already exists or invalid input.');
          console.error('Insert error:', error.message);
          return false;
        }
      );
    });
  };

//   Log in user
  const loginUser = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?;',
        [username, password],
        (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            Alert.alert('Success', `Welcome, ${username}!`);
            setUsername('');
            setPassword('');
          } else {
            Alert.alert('Error', 'Invalid username or password.');
          }
        },
        (_, error) => {
          Alert.alert('Error', 'Something went wrong.');
          console.error('Query error:', error.message);
          return false;
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Register</Text>
       <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={registerUser} />
      <View style={styles.spacer} />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  spacer: {
    marginVertical: 10,
  },
});

export default LoginScreen;
