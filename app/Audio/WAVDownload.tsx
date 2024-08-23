import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useRoute, RouteProp } from '@react-navigation/native';
import RootStackParamList from '../types';

type WAVDownloadRouteProp = RouteProp<RootStackParamList, 'WAVDownload'>;

const WAVDownload: React.FC = () => {
  const route = useRoute<WAVDownloadRouteProp>();
  const { data } = route.params;
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant permission to save the file.');
        setDownloading(false);
        return;
      }

      const uri = data.converted_file_url;
      const fileUri = `${FileSystem.documentDirectory}${data.fileName || 'converted_file.wav'}`;

      // Downloading the WAV file
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        fileUri,
        {},
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult?.uri) {
        const localUri = downloadResult.uri;
        const asset = await MediaLibrary.createAssetAsync(localUri);
        await MediaLibrary.createAlbumAsync('Downloads', asset, false);
        Alert.alert('Download Successful', 'File downloaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to download the file.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Your file is ready to download as a WAV.
      </Text>

      <TouchableOpacity
        onPress={handleDownload}
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
        disabled={downloading}
      >
        {downloading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={{ color: '#FFF', fontSize: 16 }}>Download WAV</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default WAVDownload;
