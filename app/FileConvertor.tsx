import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import  RootStackParamList  from './types'; // Assuming you have this file
import JPGtoPDF from './JPGtoPDF';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FileConvertor: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select the conversion type:</Text>

      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('JPGtoPNG')}>
        <Text style={styles.blockText}>JPG to PNG</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('PNGtoJPG')}>
        <Text style={styles.blockText}>PNG to JPG</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('PNGtoPDF')}>
        <Text style={styles.blockText}>PNG to PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('JPGtoPDF')}>
        <Text style={styles.blockText}>JPG to PDF</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.block} onPress={() => navigation.navigate('PDFtoPNG')}>
        <Text style={styles.blockText}>PDF to PNG</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  block: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  blockText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default FileConvertor;
