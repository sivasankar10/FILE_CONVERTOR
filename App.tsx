import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './app/HomePage';
import Compressor from './app/Compressor';
import FileConvertor from './app/FileConvertor';
import VideoConvertor from './app/Video/VideoConvertor';
import AudioConvertor from './app/Audio/AudioConvertor';
import DownloadPage from './app/DownloadPage';
import FCDownload from './app/FCDownload';
import JPGtoPNG from './app/JPGtoPNG';
import PNGtoJPG from './app/PNGtoJPG';
import PNGtoPDF from './app/PNGtoPDF';
import PDFtoJPG from './app/PDFtoJPG';
import PDFtoPNG from './app/PDFtoPNG';
import PNGDownload from './app/PNGDownload';
import JPDownload from './app/JPDownload';
import PJDownload from './app/PJDownload';
import PPDownload from './app/PPDownload';
import MP3toWAV from './app/Audio/MP3toWAV';
import WAVtoMP3 from './app/Audio/WAVtoMP3';
import MP3toAAC from './app/Audio/MP3toAAC';
import AACtoWAV from './app/Audio/AACtoWAV';
import WAVtoAAC from './app/Audio/WAVtoAAC';
import MWDownload from './app/MWDownload';
import JPGtoPDF from './app/JPGtoPDF';
import WAVDownload from './app/Audio/WAVDownload';
import MP4toMOV from './app/Video/MP4toMOV';
export type StackParamList = {
  Home: undefined;
  Compressor: undefined;
  FileConvertor: undefined;
  VideoConvertor: undefined;
  AudioConvertor: undefined;
  DownloadPage: { data: any }; 
  types:undefined;
  FCDownload:{data:any};
  JPGtoPNG:undefined;
  PNGtoJPG:undefined;
  PNGtoPDF:undefined;
  PDFtoJPG:undefined;
  PDFtoPNG:undefined;
  PNGDownload:{data:any};
  JPDownload:{data:any};
  PJDownload:undefined;
  PPDownload:undefined;
  MP3toWAV: undefined;
  WAVtoMP3: undefined;
  MP3toAAC: undefined;
  AACtoMP3: undefined;
  WAVtoAAC: undefined;
  AACtoWAV: undefined;
  JPGtoPDF: undefined;
  WAVDownload: undefined;
  MP4toMOV: undefined;

};

const Stack = createNativeStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Compressor" component={Compressor} />
        <Stack.Screen name="FileConvertor" component={FileConvertor} />
        <Stack.Screen name="VideoConvertor" component={VideoConvertor} />
        <Stack.Screen name="AudioConvertor" component={AudioConvertor} />
        <Stack.Screen name="FCDownload" component={FCDownload} />
        <Stack.Screen name="DownloadPage" component={DownloadPage} />
        <Stack.Screen name="JPGtoPNG" component={JPGtoPNG} />
        <Stack.Screen name="PNGtoJPG" component={PNGtoJPG} />
        <Stack.Screen name="PNGtoPDF" component={PNGtoPDF} />
        <Stack.Screen name="PDFtoJPG" component={PDFtoJPG} />
        <Stack.Screen name="PDFtoPNG" component={PDFtoPNG} />
        <Stack.Screen name="PNGDownload" component={PNGDownload} />
        <Stack.Screen name="JPDownload" component={JPDownload} />
        <Stack.Screen name="PJDownload" component={PJDownload} />
        <Stack.Screen name="PPDownload" component={PPDownload} />
        <Stack.Screen name="MP3toWAV" component={MP3toWAV}/>
        <Stack.Screen name="WAVtoMP3" component={WAVtoMP3}/>
        <Stack.Screen name="MP3toAAC" component={MP3toAAC}/>
        <Stack.Screen name="AACtoMP3" component={AACtoWAV}/>
        <Stack.Screen name="WAVtoAAC" component={WAVtoAAC}/>
        <Stack.Screen name="AACtoWAV" component={AACtoWAV}/>
        <Stack.Screen name="JPGtoPDF" component={JPGtoPDF}/>
        <Stack.Screen name="WAVDownload" component={WAVDownload}/>
        <Stack.Screen name="MP4toMOV" component={MP4toMOV}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
