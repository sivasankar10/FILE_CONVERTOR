import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../App';
import { Video, ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const Compressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      
      if (file.type === 'video') {
        file.type = 'video'; 
      }

      setSelectedFile(file);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      Alert.alert('No file selected', 'Please select a file to compress');
      return;
    }

    setLoading(true);

    
    const fileUri = selectedFile.uri;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: selectedFile.type || 'application/octet-stream',
      name: selectedFile.fileName || fileUri.split('/').pop(),
    } as any);

    try {
      const response = await fetch('http://3.143.222.88:8000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        navigation.navigate('DownloadPage', { data });
      } else {
        setLoading(false);
        Alert.alert('Error', data.message || 'Failed to compress the file');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred while compressing the file');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        (*MP4, *MOV, *AVI, *MKV, *JPG/JPEG, *PNG, *GIF, *WAV, *MP3, *PDF)
      </Text>

      <Button title="Open Gallery" onPress={pickFile} />

      {selectedFile && (
        <View style={{ marginTop: 20 }}>
          {selectedFile.type.startsWith('image') && (
            <Image
              source={{ uri: selectedFile.uri }}
              style={{ width: '100%', height: 400 }}
            />
          )}
          {selectedFile.type === 'video' && (
            <Video
              source={{ uri: selectedFile.uri }}
              style={{ width: '100%', height: 300 }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={handleCompress}
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
          <Text style={{ color: '#FFF', fontSize: 16 }}>COMPRESS</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Compressor;
