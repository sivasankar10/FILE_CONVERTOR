import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const DownloadPage: React.FC = () => {
  const route = useRoute<any>();
  const { data } = route.params;

  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Determine file extension from URL or API response
      const fileExtension = data.compressed_file_url.split('.').pop();
      const fileUri = FileSystem.documentDirectory + `compressed_file.${fileExtension}`;

      const downloadResumable = FileSystem.createDownloadResumable(
        data.compressed_file_url,
        fileUri,
        {}
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult?.uri) {
        if (Platform.OS === 'ios') {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
            Alert.alert('Download Complete', 'File saved to Photos');
          } else {
            Alert.alert('Permission Denied', 'Permission to access photos is required.');
          }
        } else if (Platform.OS === 'android') {
          const { granted } = await MediaLibrary.requestPermissionsAsync();
          if (!granted) {
            setDownloading(false);
            return Alert.alert('Permission Denied', 'Permission to access files is required.');
          }

          const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
          const album = await MediaLibrary.getAlbumAsync('Download');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          Alert.alert('Download Complete', 'File saved to Downloads');
        }
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Download Failed', 'An error occurred while downloading the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Original File Size: {data.initial_file_size} bytes</Text>
      <Text>Compressed File Size: {data.compressed_file_size} bytes</Text>

      <Button
        title="Download Compressed File"
        onPress={handleDownload}
        disabled={downloading}
      />

      {downloading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
};

export default DownloadPage;
