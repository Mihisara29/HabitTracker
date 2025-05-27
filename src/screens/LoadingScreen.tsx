// src/screens/LoadingScreen.tsx
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const LoadingScreen = () => {
  const {theme} = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1b2e', // Dark indigo background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a213f', // Slightly lighter for contrast
    padding: 28,
    borderRadius: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoContainer: {
    width: 140,
    height: 140,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#8B5CF6', // Violet
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a78bfa',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 16,
    zIndex: 2,
  },
  loadingSpinner: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#8B5CF640', // Faded violet border
    borderTopColor: '#8B5CF6', // Solid violet for spinning top
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C4B5FD', // Light violet
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#dcd1ffb0', // Subtle violet-gray text
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#e9ddff88',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dots: {
    flexDirection: 'row',
    marginTop: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
    marginHorizontal: 4,
  },
});



  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>

        <Text style={styles.title}>Habit Tracker</Text>
        <Text style={styles.subtitle}>
          Building better habits, one day at a time
        </Text>

        <Text style={styles.loadingText}>Loading your progress...</Text>

        <View style={styles.dots}>
          <Animated.View style={[styles.dot, {opacity: 0.3}]} />
          <Animated.View style={[styles.dot, {opacity: 0.6}]} />
          <Animated.View style={[styles.dot, {opacity: 1}]} />
        </View>
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
