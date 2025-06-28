import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.eyeson",
  appName: "EyesOn",
  webDir: "www",
  server: {
    androidScheme: "https",
  },
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#000000",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    BarcodeScanner: {
      cameraBackground: "transparent",
      cameraPermissionText: "We need your permission to use your camera to scan QR codes",
    },
    // Keyboard: {
    //   resize: KeyboardResize.Ionic,
    //   resizeOnFullScreen: true,
    // },
  },
};

export default config;
