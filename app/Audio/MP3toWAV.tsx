import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import RootStackParamList from '../types';

type MP3toWAVNavigationProp = NavigationProp<RootStackParamList, 'WAVDownload'>;

const MP3toWAV: React.FC = () => {
  const navigation = useNavigation<MP3toWAVNavigationProp>();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/mpeg', 'audio/mp3'], // MIME types for MP3 files
      });

      console.log('Document Picker Result:', result); // Debug log

      if (result.type === 'success') {
        setSelectedFile(result);
      } else if (result.type === 'cancel') {
        Alert.alert('File Selection Cancelled', 'No file was selected.');
      } else {
        Alert.alert('File Selection Error', 'An unexpected error occurred while selecting the file.');
      }
    } catch (error) {
      console.error('Document Picker Error:', error); // Debug log
      Alert.alert('Error', 'An error occurred while selecting the file.');
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      Alert.alert('No File Selected', 'Please select an MP3 file to convert.');
      return;
    }

    setLoading(true);

    const fileUri = selectedFile.uri;
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: selectedFile.mimeType || 'audio/mpeg',
      name: selectedFile.name || fileUri.split('/').pop(),
    } as any);

    formData.append('format', 'wav');

    try {
      const response = await axios.post('http://3.143.222.88:8000/convert/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response:', response.data); // Debug log

      const data = response.data;

      if (response.status === 200) {
        navigation.navigate('WAVDownload', { data });
      } else {
        Alert.alert('Error', data.message || 'Failed to convert the file.');
      }
    } catch (error) {
      console.error('API Error:', error); // Debug log
      Alert.alert('Error', 'An error occurred while converting the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Select an MP3 file to convert to WAV:
      </Text>

      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={openFilePicker}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Pick MP3 File</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected File: {selectedFile.name}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleConvert}
        style={{
          marginTop: 20,
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={{ color: '#FFF', fontSize: 16 }}>CONVERT</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MP3toWAV;
