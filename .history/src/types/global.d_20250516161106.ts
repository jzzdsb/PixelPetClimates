declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.svg';

declare module '@env' {
  export const OPENWEATHER_API_KEY: string;
}

declare module 'react-native-dotenv' {
  export const OPENWEATHER_API_KEY: string;
} 