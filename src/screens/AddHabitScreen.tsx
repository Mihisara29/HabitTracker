// src/screens/AddHabitScreen.tsx
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useHabitStore} from '../store/habitStore';
import {useAuthStore} from '../store/authStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddHabitScreen = () => {
  const {theme} = useTheme();
  const addHabit = useHabitStore(state => state.addHabit);
  const currentUser = useAuthStore(state => state.currentUser);

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  // Get device dimensions for responsive design
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375;
  const isLargeDevice = screenWidth > 414;
  const isShortDevice = screenHeight < 700;

  // Responsive scaling functions
  const scale = (size: number) => (screenWidth / 375) * size;
  const verticalScale = (size: number) => (screenHeight / 812) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

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
      paddingHorizontal: screenWidth * 0.05, // 5% of screen width
      paddingTop: screenHeight * 0.02, // 2% of screen height
      paddingBottom: Math.max(verticalScale(120), screenHeight * 0.15), // Ensure enough bottom space
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(
        isSmallDevice ? 20 : isShortDevice ? 24 : isLargeDevice ? 36 : 32,
      ),
      justifyContent: 'center',
      paddingVertical: verticalScale(8),
    },
    title: {
      fontSize: moderateScale(isSmallDevice ? 24 : isLargeDevice ? 32 : 28),
      fontWeight: '800',
      color: theme.text,
      marginLeft: scale(10),
      letterSpacing: 0.5,
      textAlign: 'center',
      flex: 1,
      lineHeight: moderateScale(isSmallDevice ? 30 : isLargeDevice ? 38 : 34),
    },
    formSection: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(isSmallDevice ? 20 : 24),
      padding: screenWidth * 0.06, // 6% of screen width
      marginBottom: verticalScale(isShortDevice ? 12 : 16),
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(6)},
      shadowOpacity: 0.12,
      shadowRadius: moderateScale(12),
      elevation: 8,
      borderWidth: 1,
      borderColor: theme.borderColor + '20',
      width: '100%',
      maxWidth: isLargeDevice ? screenWidth * 0.95 : screenWidth,
      alignSelf: 'center',
    },
    label: {
      fontSize: moderateScale(isSmallDevice ? 15 : isLargeDevice ? 18 : 17),
      fontWeight: '700',
      color: theme.text,
      marginBottom: verticalScale(6),
      letterSpacing: 0.3,
    },
    input: {
      height: verticalScale(isSmallDevice ? 48 : isLargeDevice ? 64 : 56),
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor + '40',
      borderWidth: 2,
      borderRadius: moderateScale(isSmallDevice ? 12 : 16),
      paddingHorizontal: screenWidth * 0.05,
      fontSize: moderateScale(isSmallDevice ? 15 : 16),
      color: theme.text,
      marginBottom: verticalScale(isShortDevice ? 16 : 20),
      fontWeight: '500',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.05,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    frequencyContainer: {
      marginBottom: verticalScale(4),
    },
    frequencyOptions: {
      flexDirection: 'row',
      gap: screenWidth * 0.03, // 3% of screen width
    },
    frequencyButton: {
      flex: 1,
      paddingVertical: verticalScale(
        isSmallDevice ? 12 : isLargeDevice ? 20 : 16,
      ),
      paddingHorizontal: screenWidth * 0.04,
      borderRadius: moderateScale(isSmallDevice ? 12 : 16),
      borderWidth: 2,
      borderColor: theme.borderColor + '60',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.inputBackground + '40',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.05,
      shadowRadius: moderateScale(4),
      elevation: 2,
      minHeight: verticalScale(isShortDevice ? 44 : 50),
    },
    frequencyButtonActive: {
      backgroundColor: theme.buttonBackground,
      borderColor: theme.buttonBackground,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(3)},
      shadowOpacity: 0.3,
      shadowRadius: moderateScale(6),
      elevation: 6,
      transform: [{scale: 1.02}],
    },
    frequencyButtonText: {
      fontSize: moderateScale(isSmallDevice ? 14 : isLargeDevice ? 17 : 16),
      fontWeight: '700',
      color: theme.text + 'CC',
      letterSpacing: 0.5,
    },
    frequencyButtonTextActive: {
      color: 'white',
    },
    habitExamples: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(isSmallDevice ? 16 : 20),
      padding: screenWidth * 0.05,
      marginBottom: verticalScale(isShortDevice ? 16 : 20),
      borderWidth: 1,
      borderColor: theme.borderColor + '30',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(3)},
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(6),
      elevation: 4,
      width: '100%',
      maxWidth: isLargeDevice ? screenWidth * 0.95 : screenWidth,
      alignSelf: 'center',
    },
    exampleTitle: {
      fontSize: moderateScale(isSmallDevice ? 16 : isLargeDevice ? 19 : 18),
      fontWeight: '700',
      color: theme.text,
      marginBottom: verticalScale(10),
      letterSpacing: 0.3,
    },
    exampleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(6),
      paddingVertical: verticalScale(4),
      paddingHorizontal: screenWidth * 0.02,
      borderRadius: moderateScale(6),
      backgroundColor: theme.inputBackground + '30',
      minHeight: verticalScale(36),
    },
    exampleText: {
      fontSize: moderateScale(isSmallDevice ? 14 : 15),
      color: theme.text + 'DD',
      marginLeft: scale(10),
      fontWeight: '500',
      flex: 1,
      lineHeight: moderateScale(18),
    },
    submitButton: {
      backgroundColor: theme.buttonBackground,
      borderRadius: moderateScale(isSmallDevice ? 16 : 20),
      paddingVertical: verticalScale(
        isSmallDevice ? 14 : isLargeDevice ? 22 : 18,
      ),
      paddingHorizontal: screenWidth * 0.05,
      alignItems: 'center',
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(4)},
      shadowOpacity: 0.3,
      shadowRadius: moderateScale(8),
      elevation: 8,
      marginTop: verticalScale(8),
      marginBottom: verticalScale(20), // Extra bottom margin
      minHeight: verticalScale(54),
      width: '100%',
      maxWidth: isLargeDevice ? screenWidth * 0.95 : screenWidth,
      alignSelf: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: moderateScale(isSmallDevice ? 16 : isLargeDevice ? 19 : 18),
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    submitButtonDisabled: {
      backgroundColor: theme.borderColor + 'AA',
      shadowOpacity: 0.1,
      elevation: 2,
    },
  });

  const handleSubmit = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    if (!currentUser?.email) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    addHabit(habitName.trim(), frequency, currentUser.email);
    setHabitName('');
    Alert.alert(
      'Success',
      `"${habitName}" habit has been added successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    );
  };

  const dailyExamples = [
    'Take a short walk outside',
    'Do 15 minutes of stretching',
    'Read one chapter of a book',
    'Practice gratitude journaling',
    'Plan your day in the morning',
  ];

  const weeklyExamples = [
    'Organize your digital files',
    'Prepare meals in advance',
    'Catch up with a friend',
    'Reflect on weekly progress',
    'Declutter your workspace',
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <View style={styles.header}>
            <Icon
              name="add-circle"
              size={moderateScale(isSmallDevice ? 32 : isLargeDevice ? 40 : 36)}
              color={theme.buttonBackground}
            />
            <Text style={styles.title}>Add New Habit</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter habit name..."
              placeholderTextColor={theme.placeholderText}
              value={habitName}
              onChangeText={setHabitName}
              maxLength={50}
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <View style={styles.frequencyContainer}>
              <Text style={styles.label}>Frequency</Text>
              <View style={styles.frequencyOptions}>
                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    frequency === 'daily' && styles.frequencyButtonActive,
                  ]}
                  onPress={() => setFrequency('daily')}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      frequency === 'daily' && styles.frequencyButtonTextActive,
                    ]}>
                    Daily
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    frequency === 'weekly' && styles.frequencyButtonActive,
                  ]}
                  onPress={() => setFrequency('weekly')}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      frequency === 'weekly' &&
                        styles.frequencyButtonTextActive,
                    ]}>
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.habitExamples}>
            <Text style={styles.exampleTitle}>
              {frequency === 'daily' ? 'Daily' : 'Weekly'} Habit Examples
            </Text>
            {(frequency === 'daily' ? dailyExamples : weeklyExamples).map(
              (example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Icon
                    name="lightbulb-outline"
                    size={moderateScale(isSmallDevice ? 16 : 18)}
                    color={theme.buttonBackground}
                  />
                  <Text style={styles.exampleText}>{example}</Text>
                </View>
              ),
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              !habitName.trim() && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!habitName.trim()}
            activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Create Habit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddHabitScreen;
