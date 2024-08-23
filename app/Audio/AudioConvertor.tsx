import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MP3toWAV: undefined;
  WAVtoMP3: undefined;
  MP3toAAC: undefined;
  AACtoMP3: undefined;
  WAVtoAAC: undefined;
  AACtoWAV: undefined;
};

const AudioConvertor: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Required Conversion</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MP3toWAV')}
      >
        <Text style={styles.buttonText}>MP3 to WAV</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WAVtoMP3')}
      >
        <Text style={styles.buttonText}>WAV to MP3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MP3toAAC')}
      >
        <Text style={styles.buttonText}>MP3 to AAC</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WAVtoAAC')}
      >
        <Text style={styles.buttonText}>WAV to AAC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AACtoWAV')}
      >
        <Text style={styles.buttonText}>AAC to WAV</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AudioConvertor;
