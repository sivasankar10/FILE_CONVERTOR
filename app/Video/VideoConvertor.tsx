import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VideoConvertor: React.FC = () => {
  const navigation = useNavigation();

  const renderButton = (title: string, screen: string) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Required Conversion</Text>

      <View style={styles.row}>
        {renderButton('MP4 to MOV', 'MP4toMOV')}
        {renderButton('MP4 to AVI', 'MP4toAVI')}
      </View>

      <View style={styles.row}>
        {renderButton('MP4 to MKV', 'MP4toMKV')}
        {renderButton('MOV to MP4', 'MOVtoMP4')}
      </View>

      <View style={styles.row}>
        {renderButton('MOV to AVI', 'MOVtoAVI')}
        {renderButton('MOV to MKV', 'MOVtoMKV')}
      </View>

      <View style={styles.row}>
        {renderButton('AVI to MP4', 'AVItoMP4')}
        {renderButton('AVI to MOV', 'AVItoMOV')}
      </View>

      <View style={styles.row}>
        {renderButton('AVI to MKV', 'AVItoMKV')}
        {renderButton('MKV to MP4', 'MKVtoMP4')}
      </View>

      <View style={styles.row}>
        {renderButton('MKV to MOV', 'MKVtoMOV')}
        {renderButton('MKV to AVI', 'MKVtoAVI')}
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 0.48,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default VideoConvertor;
