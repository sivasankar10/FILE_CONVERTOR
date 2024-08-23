import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRoute, RouteProp } from '@react-navigation/native';
import RootStackParamList from './types';

type JPDownloadRouteProp = RouteProp<RootStackParamList, 'JPDownload'>;

const JPDownload: React.FC = () => {
  const route = useRoute<JPDownloadRouteProp>();
  const { data } = route.params;
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const uri = data.converted_file_url;
      const fileUri = `${FileSystem.documentDirectory}${data.fileName || 'converted_file.pdf'}`;
      
      // Download the PDF file
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        fileUri,
        {},
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult && downloadResult.uri) {
        // Display success message
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
        Your file is ready to download as a PDF.
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
          <Text style={{ color: '#FFF', fontSize: 16 }}>Download PDF</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default JPDownload;
