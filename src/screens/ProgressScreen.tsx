// src/screens/ProgressScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useHabitStore} from '../store/habitStore';
import {useAuthStore} from '../store/authStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const ProgressScreen = () => {
  const {theme} = useTheme();
  const currentUser = useAuthStore(state => state.currentUser);
  const {
    getUserHabits,
    getTodaysProgress,
    getWeeklyProgress,
    isHabitCompletedToday,
  } = useHabitStore();

  // Get user-specific data
  const userHabits = currentUser ? getUserHabits(currentUser.email) : [];
  const todaysProgress = currentUser ? getTodaysProgress(currentUser.email) : 0;
  const weeklyProgress = currentUser
    ? getWeeklyProgress(currentUser.email)
    : [];
  const dailyHabits = userHabits.filter(h => h.frequency === 'daily');
  const weeklyHabits = userHabits.filter(h => h.frequency === 'weekly');

  // Get today's completed habits
  const completedTodayCount = currentUser
    ? dailyHabits.filter(habit =>
        isHabitCompletedToday(habit.id, currentUser.email),
      ).length
    : 0;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
      justifyContent: 'center',
      paddingVertical: 12,
    },
    title: {
      fontSize: 30,
      fontWeight: '800',
      color: theme.text,
      marginLeft: 12,
      letterSpacing: 0.5,
    },
    progressCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 24,
      padding: 28,
      marginBottom: 24,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme.borderColor + '25',
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    progressIcon: {
      width: 60,
      height: 60,
      backgroundColor: theme.buttonBackground + '25',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 18,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    progressInfo: {
      flex: 1,
    },
    progressTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 6,
      letterSpacing: 0.3,
    },
    progressSubtitle: {
      fontSize: 15,
      color: theme.text + 'AA',
      fontWeight: '500',
      letterSpacing: 0.2,
    },
    progressPercentage: {
      fontSize: 42,
      fontWeight: '800',
      color: theme.buttonBackground,
      textAlign: 'center',
      marginVertical: 20,
      letterSpacing: 0.5,
    },
    progressBar: {
      height: 12,
      backgroundColor: theme.borderColor + '40',
      borderRadius: 6,
      overflow: 'hidden',
      marginVertical: 16,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.buttonBackground,
      borderRadius: 6,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
      paddingVertical: 8,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.buttonBackground,
      marginBottom: 6,
      letterSpacing: 0.3,
    },
    statLabel: {
      fontSize: 13,
      color: theme.text + 'AA',
      textAlign: 'center',
      fontWeight: '600',
      letterSpacing: 0.2,
      lineHeight: 16,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 20,
      marginTop: 16,
      letterSpacing: 0.3,
    },
    weeklyChart: {
      backgroundColor: theme.cardBackground,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.borderColor + '25',
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 20,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    chartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      height: 140,
      paddingTop: 20,
    },
    chartBar: {
      alignItems: 'center',
      flex: 1,
    },
    bar: {
      width: 24,
      backgroundColor: theme.buttonBackground,
      borderRadius: 12,
      marginBottom: 12,
      minHeight: 6,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    chartDay: {
      fontSize: 13,
      color: theme.text + 'AA',
      fontWeight: '700',
      letterSpacing: 0.2,
    },
    chartValue: {
      fontSize: 11,
      color: theme.text + 'CC',
      marginBottom: 6,
      fontWeight: '600',
      letterSpacing: 0.1,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      paddingHorizontal: 32,
    },
    emptyIcon: {
      marginBottom: 24,
      opacity: 0.8,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.text + 'AA',
      textAlign: 'center',
      paddingHorizontal: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    summaryCard: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    summaryText: {
      color: 'white',
      fontSize: 17,
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '600',
      letterSpacing: 0.3,
    },
    summaryEmoji: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 12,
    },
    emptyViewContainer: {
      height: 100,
      width: '100%',
    },
  });

  const getMotivationalMessage = (progress: number) => {
    if (progress === 100)
      return "🎉 Perfect day! You've completed all your habits!";
    if (progress >= 75) return "🔥 Amazing progress! You're almost there!";
    if (progress >= 50) return '💪 Great job! Keep the momentum going!';
    if (progress >= 25) return '🌱 Good start! Every step counts!';
    return '⭐ Ready to build some great habits today?';
  };

  // Handle case when user is not logged in
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon name="trending-up" size={36} color={theme.buttonBackground} />
            <Text style={styles.title}>Progress</Text>
          </View>

          <View style={styles.emptyState}>
            <Icon
              name="person"
              size={72}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>Please log in</Text>
            <Text style={styles.emptySubtitle}>
              You need to be logged in to view your progress.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (userHabits.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon name="trending-up" size={36} color={theme.buttonBackground} />
            <Text style={styles.title}>Progress</Text>
          </View>

          <View style={styles.emptyState}>
            <Icon
              name="show-chart"
              size={72}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No habits to track yet</Text>
            <Text style={styles.emptySubtitle}>
              Add some habits first to see your progress and track your journey!
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Icon name="trending-up" size={36} color={theme.buttonBackground} />
          <Text style={styles.title}>Progress</Text>
        </View>

        {/* Motivational Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>
            {todaysProgress === 100 ? '🎉' : todaysProgress >= 50 ? '🔥' : '⭐'}
          </Text>
          <Text style={styles.summaryText}>
            {getMotivationalMessage(todaysProgress)}
          </Text>
        </View>

        {/* Today's Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <Icon name="today" size={26} color={theme.buttonBackground} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressSubtitle}>
                {completedTodayCount} of {dailyHabits.length} daily habits
                completed
              </Text>
            </View>
          </View>

          <Text style={styles.progressPercentage}>{todaysProgress}%</Text>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressBarFill, {width: `${todaysProgress}%`}]}
            />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedTodayCount}</Text>
              <Text style={styles.statLabel}>Completed{'\n'}Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{dailyHabits.length}</Text>
              <Text style={styles.statLabel}>Daily{'\n'}Habits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyHabits.length}</Text>
              <Text style={styles.statLabel}>Weekly{'\n'}Habits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userHabits.length}</Text>
              <Text style={styles.statLabel}>Total{'\n'}Habits</Text>
            </View>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        {dailyHabits.length > 0 && (
          <View style={styles.weeklyChart}>
            <Text style={styles.chartTitle}>7-Day Progress</Text>
            <View style={styles.chartContainer}>
              {weeklyProgress.map((day, index) => {
                const percentage =
                  day.total > 0 ? (day.completed / day.total) * 100 : 0;
                const barHeight = Math.max((percentage / 100) * 100, 6);

                return (
                  <View key={index} style={styles.chartBar}>
                    <Text style={styles.chartValue}>
                      {day.completed}/{day.total}
                    </Text>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barHeight,
                          backgroundColor:
                            percentage === 100
                              ? '#4CAF50'
                              : percentage >= 50
                              ? theme.buttonBackground
                              : theme.borderColor + '80',
                        },
                      ]}
                    />
                    <Text style={styles.chartDay}>{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Achievement Summary */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <Icon
                name="emoji-events"
                size={26}
                color={theme.buttonBackground}
              />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Quick Stats</Text>
              <Text style={styles.progressSubtitle}>
                Your habit journey at a glance
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {weeklyProgress.length > 0
                  ? Math.round(
                      weeklyProgress.reduce(
                        (acc, day) =>
                          acc +
                          (day.total > 0
                            ? (day.completed / day.total) * 100
                            : 0),
                        0,
                      ) / weeklyProgress.length,
                    )
                  : 0}
                %
              </Text>
              <Text style={styles.statLabel}>7-Day{'\n'}Average</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {
                  weeklyProgress.filter(
                    day => day.total > 0 && day.completed === day.total,
                  ).length
                }
              </Text>
              <Text style={styles.statLabel}>Perfect{'\n'}Days</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {weeklyProgress.reduce((acc, day) => acc + day.completed, 0)}
              </Text>
              <Text style={styles.statLabel}>Total{'\n'}Completed</Text>
            </View>
          </View>
        </View>
        <View style={styles.emptyViewContainer}></View>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;



