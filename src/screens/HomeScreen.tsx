import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useHabitStore} from '../store/habitStore';
import {useTheme} from '../theme/ThemeContext';

const HomeScreen = () => {
  const currentUser = useAuthStore(state => state.currentUser);
  const {getUserHabits, getTodaysProgress, isHabitCompletedToday} = useHabitStore();
  const {theme} = useTheme();

  // Get device dimensions
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375;
  const isLargeDevice = screenWidth > 414;

  // Responsive scaling
  const scale = (size: number) => (screenWidth / 375) * size;
  const verticalScale = (size: number) => (screenHeight / 812) * size;
  const moderateScale = (size: number, factor = 0.5) => 
    size + (scale(size) - size) * factor;

  // Get user data
  const userHabits = currentUser ? getUserHabits(currentUser.email) : [];
  const todaysProgress = currentUser ? getTodaysProgress(currentUser.email) : 0;
  const dailyHabits = userHabits.filter(h => h.frequency === 'daily');
  const completedToday = currentUser
    ? dailyHabits.filter(habit => isHabitCompletedToday(habit.id, currentUser.email))
    : [];
  const pendingToday = currentUser
    ? dailyHabits.filter(habit => !isHabitCompletedToday(habit.id, currentUser.email))
    : [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: moderateScale(20),
      paddingBottom: verticalScale(40),
    },
    header: {
      marginBottom: verticalScale(20),
    },
    greeting: {
      fontSize: moderateScale(28),
      fontWeight: '800',
      color: theme.text,
      marginBottom: verticalScale(4),
    },
    date: {
      fontSize: moderateScale(16),
      color: theme.text + 'AA',
      fontWeight: '500',
    },
    progressCard: {
      backgroundColor: theme.buttonBackground,
      borderRadius: moderateScale(16),
      padding: moderateScale(20),
      marginBottom: verticalScale(24),
      elevation: 4,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(8),
    },
    progressPercentage: {
      fontSize: moderateScale(32),
      fontWeight: '800',
      color: 'white',
      minWidth: scale(60),
    },
    progressTitle: {
      fontSize: moderateScale(18),
      fontWeight: '700',
      color: 'white',
      marginLeft: scale(10),
    },
    progressSubtitle: {
      fontSize: moderateScale(14),
      color: 'white',
      opacity: 0.9,
      marginLeft: scale(10),
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(16),
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontWeight: '700',
      color: theme.text,
    },
    sectionCount: {
      fontSize: moderateScale(16),
      color: theme.text + 'AA',
      marginLeft: scale(6),
    },
    habitCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(12),
      padding: moderateScale(16),
      marginBottom: verticalScale(12),
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    habitIcon: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
      backgroundColor: theme.buttonBackground + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(12),
    },
    habitIconCompleted: {
      backgroundColor: '#4CAF50' + '20',
    },
    habitInfo: {
      flex: 1,
    },
    habitTitle: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: theme.text,
      marginBottom: verticalScale(4),
    },
    habitSubtitle: {
      fontSize: moderateScale(14),
      color: theme.text + 'AA',
    },
    statusBadge: {
      paddingHorizontal: moderateScale(12),
      paddingVertical: verticalScale(4),
      borderRadius: moderateScale(8),
    },
    statusBadgeCompleted: {
      backgroundColor: '#4CAF50',
    },
    statusBadgePending: {
      backgroundColor: theme.buttonBackground,
    },
    statusText: {
      color: 'white',
      fontSize: moderateScale(12),
      fontWeight: '700',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: verticalScale(40),
    },
    emptyTitle: {
      fontSize: moderateScale(20),
      fontWeight: '700',
      color: theme.text,
      marginBottom: verticalScale(8),
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: moderateScale(16),
      color: theme.text + 'AA',
      textAlign: 'center',
      paddingHorizontal: moderateScale(20),
    },
  });

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress === 100) return 'Perfect day! Keep it up!';
    if (progress >= 75) return "You're doing great!";
    if (progress >= 50) return 'Good progress!';
    if (progress >= 25) return 'Keep going!';
    return "Let's get started!";
  };

  const getHabitIcon = (habitName: string) => {
    const name = habitName.toLowerCase();
    if (name.includes('water')) return 'local-drink';
    if (name.includes('exercise')) return 'fitness-center';
    if (name.includes('read')) return 'menu-book';
    if (name.includes('meditate')) return 'self-improvement';
    if (name.includes('journal')) return 'edit';
    if (name.includes('sleep')) return 'bedtime';
    return 'check';
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.statusBarBackground} barStyle={theme.statusBarStyle} />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Please sign in</Text>
          <Text style={styles.emptySubtitle}>Sign in to view your habits</Text>
        </View>
      </View>
    );
  }

  if (dailyHabits.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.statusBarBackground} barStyle={theme.statusBarStyle} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello, {currentUser.name?.split(' ')[0] || 'User'}!</Text>
            <Text style={styles.date}>{getCurrentDate()}</Text>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No habits yet</Text>
            <Text style={styles.emptySubtitle}>Add your first habit to get started</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.statusBarBackground} barStyle={theme.statusBarStyle} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {currentUser.name?.split(' ')[0] || 'User'}!</Text>
          <Text style={styles.date}>{getCurrentDate()}</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressPercentage}>{todaysProgress}%</Text>
            <View>
              <Text style={styles.progressTitle}>Daily Progress</Text>
              <Text style={styles.progressSubtitle}>
                {completedToday.length} of {dailyHabits.length} completed
              </Text>
            </View>
          </View>
        </View>

        {pendingToday.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>To Do</Text>
              <Text style={styles.sectionCount}>{pendingToday.length}</Text>
            </View>
            {pendingToday.map(habit => (
              <TouchableOpacity key={habit.id} style={styles.habitCard}>
                <View style={styles.habitIcon}>
                  <Icon
                    name={getHabitIcon(habit.name)}
                    size={moderateScale(24)}
                    color={theme.buttonBackground}
                  />
                </View>
                <View style={styles.habitInfo}>
                  <Text style={styles.habitTitle}>{habit.name}</Text>
                  <Text style={styles.habitSubtitle}>Daily habit</Text>
                </View>
                <View style={[styles.statusBadge, styles.statusBadgePending]}>
                  <Text style={styles.statusText}>Pending</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {completedToday.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Completed</Text>
              <Text style={styles.sectionCount}>{completedToday.length}</Text>
            </View>
            {completedToday.map(habit => (
              <TouchableOpacity key={habit.id} style={styles.habitCard}>
                <View style={[styles.habitIcon, styles.habitIconCompleted]}>
                  <Icon
                    name={getHabitIcon(habit.name)}
                    size={moderateScale(24)}
                    color="#4CAF50"
                  />
                </View>
                <View style={styles.habitInfo}>
                  <Text style={styles.habitTitle}>{habit.name}</Text>
                  <Text style={styles.habitSubtitle}>Daily habit</Text>
                </View>
                <View style={[styles.statusBadge, styles.statusBadgeCompleted]}>
                  <Text style={styles.statusText}>Done</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;