// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useAuthStore} from '../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useTheme} from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);
  const {theme, isDarkMode} = useTheme();

  // Get device dimensions for responsive design
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375;
  const isLargeDevice = screenWidth > 414;
  
  // Responsive scaling functions
  const scale = (size: number) => (screenWidth / 375) * size;
  const verticalScale = (size: number) => (screenHeight / 812) * size;
  const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: screenWidth * 0.06, // 6% of screen width
      paddingVertical: screenHeight * 0.05, // 5% of screen height
    },
    content: {
      width: '100%',
      maxWidth: isLargeDevice ? screenWidth * 0.85 : screenWidth,
      alignSelf: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: verticalScale(isSmallDevice ? 24 : isLargeDevice ? 36 : 32),
    },
    icon: {
      width: moderateScale(isSmallDevice ? 70 : isLargeDevice ? 90 : 80),
      height: moderateScale(isSmallDevice ? 70 : isLargeDevice ? 90 : 80),
      borderRadius: moderateScale(isSmallDevice ? 35 : isLargeDevice ? 45 : 40),
      backgroundColor: theme.buttonBackground + '20',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(3)},
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(6),
      elevation: 4,
      borderWidth: moderateScale(isSmallDevice ? 2 : 3),
      borderColor: theme.buttonBackground + '30',
    },
    header: {
      fontSize: moderateScale(isSmallDevice ? 28 : isLargeDevice ? 38 : 34),
      fontWeight: '800',
      color: theme.text,
      marginBottom: verticalScale(8),
      textAlign: 'center',
      letterSpacing: 0.5,
      lineHeight: moderateScale(isSmallDevice ? 34 : isLargeDevice ? 44 : 40),
      paddingHorizontal: screenWidth * 0.05,
    },
    subtitle: {
      fontSize: moderateScale(isSmallDevice ? 15 : isLargeDevice ? 19 : 17),
      color: theme.text + 'CC',
      textAlign: 'center',
      marginBottom: verticalScale(isSmallDevice ? 36 : isLargeDevice ? 56 : 48),
      fontWeight: '500',
      letterSpacing: 0.2,
      lineHeight: moderateScale(isSmallDevice ? 20 : isLargeDevice ? 26 : 22),
      paddingHorizontal: screenWidth * 0.08,
    },
    formContainer: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(isSmallDevice ? 20 : 24),
      padding: screenWidth * 0.07, // 7% of screen width
      marginBottom: verticalScale(24),
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(6)},
      shadowOpacity: 0.12,
      shadowRadius: moderateScale(12),
      elevation: 8,
      borderWidth: 1,
      borderColor: theme.borderColor + '25',
      width: '100%',
      maxWidth: isLargeDevice ? screenWidth * 0.85 : screenWidth,
      alignSelf: 'center',
    },
    inputContainer: {
      marginBottom: verticalScale(16),
    },
    inputLabel: {
      fontSize: moderateScale(isSmallDevice ? 14 : 15),
      fontWeight: '600',
      color: theme.text,
      marginBottom: verticalScale(6),
      letterSpacing: 0.2,
      paddingHorizontal: screenWidth * 0.01,
    },
    input: {
      height: verticalScale(isSmallDevice ? 50 : isLargeDevice ? 62 : 56),
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor + '50',
      borderWidth: 2,
      borderRadius: moderateScale(isSmallDevice ? 14 : 16),
      paddingHorizontal: screenWidth * 0.05, // 5% of screen width
      fontSize: moderateScale(isSmallDevice ? 15 : 16),
      color: theme.text,
      fontWeight: '500',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.05,
      shadowRadius: moderateScale(3),
      elevation: 2,
    },
    button: {
      backgroundColor: theme.buttonBackground,
      borderRadius: moderateScale(isSmallDevice ? 14 : 16),
      paddingVertical: verticalScale(isSmallDevice ? 16 : isLargeDevice ? 22 : 18),
      paddingHorizontal: screenWidth * 0.05,
      alignItems: 'center',
      marginTop: verticalScale(6),
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(4)},
      shadowOpacity: 0.3,
      shadowRadius: moderateScale(8),
      elevation: 8,
      minHeight: verticalScale(54),
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: moderateScale(isSmallDevice ? 16 : isLargeDevice ? 18 : 17),
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    linkContainer: {
      alignItems: 'center',
      marginTop: verticalScale(20),
      paddingHorizontal: screenWidth * 0.05,
    },
    linkText: {
      color: theme.buttonBackground,
      textAlign: 'center',
      fontSize: moderateScale(isSmallDevice ? 15 : 16),
      fontWeight: '600',
      letterSpacing: 0.3,
      lineHeight: moderateScale(20),
      paddingVertical: verticalScale(8),
      paddingHorizontal: screenWidth * 0.04,
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    login(email, password);

    if (!useAuthStore.getState().isLoggedIn) {
      Alert.alert('Error', 'Invalid credentials');
    }

    /*if (useAuthStore.getState().isLoggedIn) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }*/
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.titleBar}
        barStyle={theme.statusBarStyle}
      />

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                <Icon 
                  name="login" 
                  size={moderateScale(isSmallDevice ? 32 : isLargeDevice ? 40 : 36)} 
                  color={theme.buttonBackground} 
                />
              </View>
            </View>

            <Text style={styles.header}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your habit journey</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={theme.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={theme.placeholderText}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  autoComplete="password"
                />
              </View>

              <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                activeOpacity={0.7}
              >
                <Text style={styles.linkText}>
                  Don't have an account? Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;