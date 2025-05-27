// src/theme.ts
import {useColorScheme} from 'react-native';

export type Theme = {
  background: string;
  text: string;
  titleBar: string;
  buttonBackground: string;
  statusBarBackground: string;
  statusBarStyle: 'dark-content' | 'light-content';
  inputBackground: string;
  cardBackground: string;
  borderColor: string;
  error: string;
  placeholderText: string;
};

export const lightTheme: Theme = {
  background: '#F8FAFF',
  text: '#1A1D29',
  titleBar: '#E8EFFF',
  buttonBackground: '#6366F1',
  statusBarBackground: '#E8EFFF',
  statusBarStyle: 'dark-content',
  inputBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  borderColor: '#E2E8F0',
  error: '#EF4444',
  placeholderText: '#64748B',
};

export const darkTheme: Theme = {
  background: '#0F172A',
  text: '#F1F5F9',
  titleBar: '#1E293B',
  buttonBackground: '#8B5CF6',
  statusBarBackground: '#1E293B',
  statusBarStyle: 'light-content',
  inputBackground: '#1E293B',
  cardBackground: '#334155',
  borderColor: '#475569',
  error: '#F87171',
  placeholderText: '#94A3B8',
};
/*export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  return {theme, isDarkMode};
};*/
