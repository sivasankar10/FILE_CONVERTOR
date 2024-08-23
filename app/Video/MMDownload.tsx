import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MMDownload: React.FC = () => {
  const route = useRoute();
  const { converted_file_url, converted_format, message, original_format } = route.params;

  const downloadFile = () => {
    Linking.openURL(converted_file_url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Converted Video</Text>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.text}>Original Format: {original_format}</Text>
      <Text style={styles.text}>Converted Format: {converted_format}</Text>

      <TouchableOpacity style={styles.button} onPress={downloadFile}>
        <Text style={styles.buttonText}>Download MOV</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default MMDownload;
