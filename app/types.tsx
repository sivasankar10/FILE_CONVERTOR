import { DefaultTheme, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  FileConvertor: undefined;
  JPGtoPNG :undefined;
  DownloadPage: { data: { imageUri: string; type: string } };
  FCDownload: { data: any };
  PNGDownload :{data:any};
  JPDownload :{data:any};
  PJDownload: {data:any};
  PPDownload:{data:any};
  MWDownload:{data:any};
  PNGtoJPG: undefined;
  JPGPNGtoPDF: undefined;
  PDFtoJPG: undefined;
  PDFtoPNG: undefined;
  PNGtoPDF:undefined;
  MP3toWAV: undefined;
  WAVtoMP3: undefined;
  MP3toAAC: undefined;
  AACtoMP3: undefined;
  WAVtoAAC: undefined;
  AACtoWAV: undefined;  
  JPGtoPDF:undefined;
  WAVDownload:{data:any};
};


type FileConvertorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FileConvertor'
>;
type JPGtoPNGNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'JPGtoPNG'
>;
type PNGtoJPGNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PNGtoJPG'
>;
type PNGtoPDFNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PNGtoPDF'
>;
type PDFtoJPGNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PDFtoJPG'
>;
type PDFtoPNGNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PDFtoPNG'
>;
type PNGDownloadNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PNGDownload'
>;
type JPDownloadNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'JPDownload'
>;
type PJDownloadNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PJDownload'
>;
type PPDownloadNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PPDownload'
>;

type MP3toWAVNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PPDownload'
>;

type WAVtoMP3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WAVtoMP3'
>;
type AACtoWAVNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AACtoWAV'
>;
type MWDownloadNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MWDownload'
>;
type JPGtoPDFNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'JPGtoPDF'
>;






type DownloadPageRouteProp = RouteProp<RootStackParamList, 'DownloadPage'>;

export default RootStackParamList;