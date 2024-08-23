import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import RootStackParamList from './types';

type PNGtoJPGNavigationProp = NavigationProp<RootStackParamList, 'JPGtoPNG'>;

const PNGtoJPG: React.FC = () => {
  const navigation = useNavigation<PNGtoJPGNavigationProp>();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openGallery = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setSelectedFile(pickerResult.assets[0]);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      Alert.alert('No Image Selected', 'Please select an image to convert.');
      return;
    }

    setLoading(true);

    const fileUri = selectedFile.uri;
    const fileName = fileUri.split('/').pop() || 'file.png'; // Ensure the file name is defined

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: selectedFile.type || 'image/png',
      name: fileName,
    } as any);
    formData.append('format', 'jpg');

    try {
      const response = await axios.post('http://3.143.222.88:8000/convert/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      setLoading(false);

      if (response.status === 200) {
        navigation.navigate('PNGDownload', { data });
      } else {
        Alert.alert('Error', data.message || 'Failed to convert the file.');
      }
    } catch (error) {
      setLoading(false);
      // Alert.alert('Error', `An error occurred while converting the file: ${message}`);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Select the conversion type:
      </Text>

      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={openGallery}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>PNG to JPG</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={{ marginTop: 20 }}>
          {selectedFile.type.startsWith('image') && (
            <Image
              source={{ uri: selectedFile.uri }}
              style={{ width: '100%', height: 400 }}
            />
          )}
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

export default PNGtoJPG;
