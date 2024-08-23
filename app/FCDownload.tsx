import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const FCDownload: React.FC = () => {
  const route = useRoute<any>();
  const { data } = route.params;

  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Determine file extension and URL from API response
      const fileExtension = data.converted_format;
      const fileUri = FileSystem.documentDirectory + `converted_file.${fileExtension}`;
      const fileUrl = data.converted_file_url;

      console.log('File URL:', fileUrl);
      console.log('File URI:', fileUri);

      // Create a download resumable
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileUri,
        {}
      );

      // Download the file
      const downloadResult = await downloadResumable.downloadAsync();
      console.log('Download result:', downloadResult);

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
          let album = await MediaLibrary.getAlbumAsync('Download');
          if (album == null) {
            album = await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          Alert.alert('Download Complete', 'File saved to Downloads');
        }
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Error during download:', error);
      Alert.alert('Download Failed', 'An error occurred while downloading the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Original Format: {data.original_format.toUpperCase()}</Text>
      <Text>Converted Format: {data.converted_format.toUpperCase()}</Text>

      <Button
        title="Download Converted File"
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

export default FCDownload;
