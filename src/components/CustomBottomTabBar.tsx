// src/components/CustomBottomTabBar.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../theme/ThemeContext';

const {width, height} = Dimensions.get('window');

interface CustomBottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

export const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const {theme} = useTheme();

  const tabs = [
    {name: 'home', icon: 'home'},
    {name: 'habits', icon: 'track-changes'},
    {name: 'add', icon: 'playlist-add', isCenter: true},
    {name: 'progress', icon: 'insights'},
    {name: 'profile', icon: 'person-pin-circle'},
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}> 
      <View style={[styles.tabBar, {backgroundColor: theme.cardBackground}]}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.name;
          const isCenter = tab.isCenter;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tabButton,
                isCenter && styles.centerButton,
                isActive && styles.activeTab,
              ]}
              onPress={() => onTabPress(tab.name)}
              activeOpacity={0.8}>
              <Icon
                name={tab.icon}
                size={isCenter ? 34 : 24}
                color={isActive ? '#8B5CF6' : theme.text + '99'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#8B5CF620',
  },
  tabBar: {
    flexDirection: 'row',
    width: '90%',
    height: 60,
    borderRadius: 40,
    shadowColor: '#8B5CF6',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2aCC',
    
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    width: 60,
    height: 60,
    marginTop: -30,
    shadowColor: '#8B5CF6',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scale: 1.05}],
  },
  activeTab: {
    transform: [{scale: 1.1}],
  },
});
