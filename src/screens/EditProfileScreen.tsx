// src/screens/EditProfileScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = ({navigation}: Props) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const updateUser = useAuthStore(state => state.updateUser);
  const {theme} = useTheme();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
  content: {
    paddingHorizontal: screenWidth * 0.06, // 6% of screen width
    paddingVertical: screenHeight * 0.02, // 2% of screen height
    paddingBottom: verticalScale(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(isSmallDevice ? 24 : isLargeDevice ? 40 : 32),
    paddingVertical: verticalScale(6),
  },
  backButton: {
    marginRight: scale(12),
    padding: moderateScale(10),
    borderRadius: moderateScale(isSmallDevice ? 12 : 16),
    backgroundColor: theme.cardBackground,
    shadowColor: theme.text,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.borderColor + '30',
    minWidth: moderateScale(44),
    minHeight: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(isSmallDevice ? 22 : isLargeDevice ? 28 : 26),
    fontWeight: '800',
    color: theme.text,
    flex: 1,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: theme.cardBackground,
    borderRadius: moderateScale(isSmallDevice ? 16 : 20),
    padding: screenWidth * 0.06, // 6% of screen width
    marginBottom: verticalScale(20),
    shadowColor: theme.text,
    shadowOffset: {width: 0, height: verticalScale(4)},
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(8),
    elevation: 6,
    borderWidth: 1,
    borderColor: theme.borderColor + '25',
    width: '100%',
    maxWidth: isLargeDevice ? screenWidth * 0.95 : screenWidth,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: moderateScale(isSmallDevice ? 17 : isLargeDevice ? 20 : 19),
    fontWeight: '700',
    color: theme.text,
    marginBottom: verticalScale(16),
    letterSpacing: 0.3,
  },
  inputLabel: {
    fontSize: moderateScale(isSmallDevice ? 14 : 15),
    fontWeight: '600',
    color: theme.text,
    marginBottom: verticalScale(6),
    marginTop: verticalScale(12),
    letterSpacing: 0.2,
  },
  firstInputLabel: {
    marginTop: 0,
  },
  input: {
    height: verticalScale(isSmallDevice ? 46 : isLargeDevice ? 58 : 52),
    backgroundColor: theme.inputBackground,
    borderColor: theme.borderColor + '50',
    borderWidth: 2,
    borderRadius: moderateScale(isSmallDevice ? 12 : 14),
    paddingHorizontal: screenWidth * 0.045, // 4.5% of screen width
    fontSize: moderateScale(isSmallDevice ? 15 : 16),
    color: theme.text,
    fontWeight: '500',
    shadowColor: theme.text,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(3),
    elevation: 2,
  },
  passwordToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(3),
    marginBottom: verticalScale(8),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: theme.inputBackground + '40',
    minHeight: verticalScale(44),
  },
  toggleText: {
    fontSize: moderateScale(isSmallDevice ? 15 : 16),
    color: theme.buttonBackground,
    marginLeft: scale(8),
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
  saveButton: {
    backgroundColor: theme.buttonBackground,
    borderRadius: moderateScale(isSmallDevice ? 12 : 16),
    paddingVertical: verticalScale(isSmallDevice ? 14 : isLargeDevice ? 20 : 18),
    paddingHorizontal: screenWidth * 0.05,
    alignItems: 'center',
    marginTop: verticalScale(6),
    shadowColor: theme.buttonBackground,
    shadowOffset: {width: 0, height: verticalScale(4)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 8,
    minHeight: verticalScale(52),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: moderateScale(isSmallDevice ? 16 : 17),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: theme.borderColor + '80',
    borderWidth: 2,
    borderRadius: moderateScale(isSmallDevice ? 12 : 16),
    paddingVertical: verticalScale(isSmallDevice ? 14 : isLargeDevice ? 20 : 18),
    paddingHorizontal: screenWidth * 0.05,
    alignItems: 'center',
    marginTop: verticalScale(12),
    shadowColor: theme.text,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(3),
    elevation: 2,
    minHeight: verticalScale(52),
  },
  cancelButtonText: {
    color: theme.text + 'DD',
    fontSize: moderateScale(isSmallDevice ? 15 : 16),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  warningText: {
    fontSize: moderateScale(isSmallDevice ? 12 : 13),
    color: theme.text + 'AA',
    marginTop: verticalScale(6),
    fontStyle: 'italic',
    lineHeight: moderateScale(16),
    paddingHorizontal: screenWidth * 0.01,
  },
});

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Email cannot be empty');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (isChangingPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        Alert.alert('Error', 'Please fill all password fields');
        return false;
      }

      if (currentPassword !== currentUser?.password) {
        Alert.alert('Error', 'Current password is incorrect');
        return false;
      }

      if (newPassword.length < 6) {
        Alert.alert('Error', 'New password must be at least 6 characters long');
        return false;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'New passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validateInputs() || !currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      password: isChangingPassword ? newPassword : currentUser.password,
    };

    updateUser(currentUser.email, updatedUser);

    Alert.alert('Success', 'Profile updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleCancel = () => {
    // Reset form to original values
    setName(currentUser?.name || '');
    setEmail(currentUser?.email || '');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon 
              name="arrow-back" 
              size={moderateScale(isSmallDevice ? 20 : 24)} 
              color={theme.text} 
            />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={[styles.inputLabel, styles.firstInputLabel]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={theme.placeholderText}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={theme.placeholderText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.warningText}>
            Changing your email will require you to log in again with the new
            email.
          </Text>
        </View>

        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => {
              setIsChangingPassword(!isChangingPassword);
              if (isChangingPassword) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }
            }}
            activeOpacity={0.7}>
            <Icon
              name={
                isChangingPassword ? 'check-box' : 'check-box-outline-blank'
              }
              size={moderateScale(isSmallDevice ? 20 : 22)}
              color={theme.buttonBackground}
            />
            <Text style={styles.toggleText}>Change Password</Text>
          </TouchableOpacity>

          {isChangingPassword && (
            <>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />
              <Text style={styles.warningText}>
                Password must be at least 6 characters long.
              </Text>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Bottom spacing for scroll */}
        <View style={{height: verticalScale(20)}} />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;