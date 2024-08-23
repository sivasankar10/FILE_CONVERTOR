import React from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import  RootStackParamList  from './types'; // Adjust the path according to your project structure

type MWDownloadRouteProp = RouteProp<RootStackParamList, 'MWDownload'>;

const MWDownload: React.FC = () => {
  const route = useRoute<MWDownloadRouteProp>();
  const { data } = route.params;

  const downloadFile = () => {
    if (data.converted_file_url) {
      Linking.openURL(data.converted_file_url);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Original Format: {data.original_format}</Text>
      <Text>Converted Format: {data.converted_format}</Text>
      <Button title="Download" onPress={downloadFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default MWDownload;
