import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Video } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const MP4toMOV: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigation = useNavigation();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  const convertVideo = async () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedVideo,
        type: 'video/mp4',
        name: 'video.mp4',
      });
      formData.append('format', 'mov');

      try {
        const response = await fetch('http://3.143.222.88:8000/convert/video', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await response.json();
        navigation.navigate('MMDownload', { fileUrl: data.converted_file_url });
      } catch (error) {
        console.error('Error converting video:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>

      {selectedVideo && (
        <View style={styles.videoContainer}>
          <Text>Selected Video:</Text>
          <Video
            source={{ uri: selectedVideo }}
            style={{ width: 300, height: 200 }}
            useNativeControls
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={convertVideo}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default MP4toMOV;
