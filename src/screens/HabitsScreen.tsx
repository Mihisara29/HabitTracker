// src/screens/HabitsScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useHabitStore, Habit} from '../store/habitStore';
import {useAuthStore} from '../store/authStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FilterType = 'all' | 'today' | 'completed';

const HabitsScreen = () => {
  const {theme} = useTheme();
  const {
    toggleHabitCompletion,
    isHabitCompletedToday,
    getHabitsByFilter,
    removeHabit,
  } = useHabitStore();
  const currentUser = useAuthStore(state => state.currentUser);

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Get device dimensions for responsive design
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375;
  const isLargeDevice = screenWidth > 414;

  // Responsive scaling functions
  const scale = (size: number) => (screenWidth / 375) * size;
  const verticalScale = (size: number) => (screenHeight / 812) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const filteredHabits = currentUser
    ? getHabitsByFilter(activeFilter, currentUser.email)
    : [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: screenWidth * 0.05, // 5% of screen width
      paddingTop: verticalScale(8),
      paddingBottom: verticalScale(80),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(isSmallDevice ? 16 : isLargeDevice ? 24 : 20),
      justifyContent: 'center',
      paddingVertical: verticalScale(8),
    },
    title: {
      fontSize: moderateScale(isSmallDevice ? 26 : isLargeDevice ? 32 : 30),
      fontWeight: '800',
      color: theme.text,
      marginLeft: scale(8),
      letterSpacing: 0.5,
    },
    filterContainer: {
      flexDirection: 'row',
      marginBottom: verticalScale(16),
      gap: screenWidth * 0.025, // 2.5% of screen width
    },
    filterButton: {
      flex: 1,
      paddingVertical: verticalScale(
        isSmallDevice ? 8 : isLargeDevice ? 12 : 10,
      ),
      paddingHorizontal: screenWidth * 0.03,
      borderRadius: moderateScale(isSmallDevice ? 10 : 12),
      backgroundColor: theme.cardBackground,
      borderWidth: 1.5,
      borderColor: theme.borderColor,
      alignItems: 'center',
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(1)},
      shadowOpacity: 0.05,
      shadowRadius: moderateScale(2),
      elevation: 2,
      minHeight: verticalScale(40),
      justifyContent: 'center',
    },
    filterButtonActive: {
      backgroundColor: theme.buttonBackground,
      borderColor: theme.buttonBackground,
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(4),
      elevation: 4,
    },
    filterButtonText: {
      fontSize: moderateScale(isSmallDevice ? 13 : isLargeDevice ? 15 : 14),
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
      letterSpacing: 0.2,
    },
    filterButtonTextActive: {
      color: 'white',
    },
    habitCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(isSmallDevice ? 14 : 16),
      padding: screenWidth * 0.04, // 4% of screen width
      marginBottom: verticalScale(12),
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: verticalScale(3)},
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(4),
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.borderColor + '25',
    },
    habitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    habitInfo: {
      flex: 1,
      marginRight: scale(8),
    },
    habitName: {
      fontSize: moderateScale(isSmallDevice ? 16 : isLargeDevice ? 19 : 18),
      fontWeight: '700',
      color: theme.text,
      marginBottom: verticalScale(4),
      letterSpacing: 0.3,
      lineHeight: moderateScale(22),
    },
    habitFrequency: {
      fontSize: moderateScale(isSmallDevice ? 12 : 13),
      color: theme.text + '70',
      marginBottom: verticalScale(6),
      fontWeight: '500',
      letterSpacing: 0.2,
    },
    habitStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(2),
      paddingHorizontal: screenWidth * 0.02,
      borderRadius: moderateScale(6),
      backgroundColor: theme.inputBackground + '30',
    },
    statusText: {
      fontSize: moderateScale(isSmallDevice ? 12 : 13),
      marginLeft: scale(6),
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    statusCompleted: {
      color: '#4CAF50',
    },
    statusPending: {
      color: theme.text + '70',
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: verticalScale(6),
      alignItems: 'flex-end',
    },
    completeButton: {
      backgroundColor: theme.buttonBackground,
      paddingHorizontal: screenWidth * 0.035,
      paddingVertical: verticalScale(
        isSmallDevice ? 6 : isLargeDevice ? 10 : 8,
      ),
      borderRadius: moderateScale(isSmallDevice ? 16 : 20),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: screenWidth * 0.18, // 18% of screen width
      shadowColor: theme.buttonBackground,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.25,
      shadowRadius: moderateScale(4),
      elevation: 4,
    },
    completeButtonCompleted: {
      backgroundColor: '#4CAF50',
      shadowColor: '#4CAF50',
    },
    completeButtonText: {
      color: 'white',
      fontSize: moderateScale(isSmallDevice ? 12 : 13),
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    deleteButton: {
      backgroundColor: '#FF5252',
      paddingHorizontal: screenWidth * 0.035,
      paddingVertical: verticalScale(
        isSmallDevice ? 6 : isLargeDevice ? 10 : 8,
      ),
      borderRadius: moderateScale(isSmallDevice ? 16 : 20),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: screenWidth * 0.18, // 18% of screen width
      shadowColor: '#FF5252',
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.25,
      shadowRadius: moderateScale(4),
      elevation: 4,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: moderateScale(isSmallDevice ? 12 : 13),
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: verticalScale(30),
      paddingHorizontal: screenWidth * 0.08,
    },
    emptyIcon: {
      marginBottom: verticalScale(16),
      opacity: 0.8,
    },
    emptyTitle: {
      fontSize: moderateScale(isSmallDevice ? 18 : isLargeDevice ? 22 : 20),
      fontWeight: '700',
      color: theme.text,
      marginBottom: verticalScale(6),
      letterSpacing: 0.3,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: moderateScale(isSmallDevice ? 14 : 15),
      color: theme.text + '70',
      textAlign: 'center',
      paddingHorizontal: screenWidth * 0.05,
      lineHeight: moderateScale(20),
      fontWeight: '500',
    },
    habitCount: {
      fontSize: moderateScale(isSmallDevice ? 14 : 15),
      color: theme.text + '80',
      marginBottom: verticalScale(8),
      textAlign: 'center',
      fontWeight: '600',
      letterSpacing: 0.2,
    },
  });

  const handleToggleCompletion = (habitId: string) => {
    if (!currentUser?.email) return;

    const today = getTodayString();
    toggleHabitCompletion(habitId, today, currentUser.email);
  };

  const handleDeleteHabit = (habitId: string, habitName: string) => {
    if (!currentUser?.email) return;

    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habitName}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeHabit(habitId, currentUser.email);
            Alert.alert(
              'Habit Deleted',
              `"${habitName}" has been successfully deleted.`,
              [{text: 'OK'}],
            );
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderHabitItem = ({item}: {item: Habit}) => {
    if (!currentUser?.email) return null;

    const isCompleted = isHabitCompletedToday(item.id, currentUser.email);

    return (
      <View style={styles.habitCard}>
        <View style={styles.habitHeader}>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitFrequency}>
              {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}{' '}
              habit
            </Text>
            <View style={styles.habitStatus}>
              <Icon
                name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
                size={moderateScale(isSmallDevice ? 18 : 20)}
                color={isCompleted ? '#4CAF50' : theme.text + '50'}
              />
              <Text
                style={[
                  styles.statusText,
                  isCompleted ? styles.statusCompleted : styles.statusPending,
                ]}>
                {isCompleted ? 'Completed today' : 'Not completed'}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.completeButton,
                isCompleted && styles.completeButtonCompleted,
              ]}
              onPress={() => handleToggleCompletion(item.id)}
              activeOpacity={0.8}>
              <Text style={styles.completeButtonText}>
                {isCompleted ? 'Undo' : 'Complete'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteHabit(item.id, item.name)}
              activeOpacity={0.8}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const getEmptyStateContent = () => {
    switch (activeFilter) {
      case 'today':
        return {
          icon: 'event-note',
          title: 'Nothing to track today',
          subtitle: 'Create a few daily habits to get started!',
        };
      case 'completed':
        return {
          icon: 'done-all',
          title: 'Nothing completed yet',
          subtitle: 'Check off habits to see them here!',
        };
      default:
        return {
          icon: 'add-circle-outline',
          title: 'Start your habit journey',
          subtitle: 'Add your first habit to begin!',
        };
    }
  };

  const emptyState = getEmptyStateContent();

  const filters = [
    {key: 'all' as FilterType, label: 'All Habits'},
    {key: 'today' as FilterType, label: "Today's Habits"},
    {key: 'completed' as FilterType, label: 'Completed'},
  ];

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Please log in</Text>
          <Text style={styles.emptySubtitle}>
            You need to be logged in to view your habits.
          </Text>
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

      <View style={styles.content}>
        <View style={styles.header}>
          <Icon
            name="event-note"
            size={moderateScale(isSmallDevice ? 28 : isLargeDevice ? 36 : 32)}
            color={theme.buttonBackground}
          />
          <Text style={styles.title}>My Habits</Text>
        </View>

        <View style={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                activeFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter.key)}
              activeOpacity={0.8}>
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter.key && styles.filterButtonTextActive,
                ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredHabits.length > 0 && (
          <Text style={styles.habitCount}>
            {filteredHabits.length}{' '}
            {filteredHabits.length === 1 ? 'habit' : 'habits'}
          </Text>
        )}

        {filteredHabits.length > 0 ? (
          <FlatList
            data={filteredHabits}
            renderItem={renderHabitItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: verticalScale(20)}}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon
              name={emptyState.icon}
              size={moderateScale(isSmallDevice ? 56 : isLargeDevice ? 72 : 64)}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>{emptyState.title}</Text>
            <Text style={styles.emptySubtitle}>{emptyState.subtitle}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HabitsScreen;
