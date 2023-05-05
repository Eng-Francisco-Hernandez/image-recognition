import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'image-recognition',
  webDir: 'out',
  server: {
    // url: "http://192.168.2.228:3000",
    // cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
