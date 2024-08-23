import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  Compressor: undefined;
  FileConvertor: undefined;
  VideoConvertor: undefined;
  AudioConvertor: undefined;
};

const HomePage: React.FC = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable 
          style={styles.pressableContainer} 
          onPress={() => navigation.navigate('Compressor')}
        >
          <Text style={styles.text}>Compressor</Text>
        </Pressable>
        <Pressable 
          style={styles.pressableContainer} 
          onPress={() => navigation.navigate('FileConvertor')}
        >
          <Text style={styles.text}>File Convertor</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable 
          style={styles.pressableContainer} 
          onPress={() => navigation.navigate('VideoConvertor')}
        >
          <Text style={styles.text}>Video Convertor</Text>
        </Pressable>
        <Pressable 
          style={styles.pressableContainer} 
          onPress={() => navigation.navigate('AudioConvertor')}
        >
          <Text style={styles.text}>Audio Convertor</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pressableContainer: {
    flex: 1,
    padding: 20,
    height: 160,
    marginHorizontal: 10,
    backgroundColor: 'darkviolet',
    borderRadius: 15,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 40,
  },
});
