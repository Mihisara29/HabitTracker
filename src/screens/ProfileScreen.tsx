import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentUser = useAuthStore(state => state.currentUser);
  const logout = useAuthStore(state => state.logout);
  const {theme, themePreference, setThemePreference} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Get device dimensions for responsive design
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375;
  const isLargeDevice = screenWidth > 414;
  
  // Responsive scaling functions
  const scale = (size: number) => (screenWidth / 375) * size;
  const verticalScale = (size: number) => (screenHeight / 812) * size;
  const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

  const themeOptions: {label: string; value: 'system' | 'light' | 'dark'}[] = [
    {label: 'System Default', value: 'system'},
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
  ];

  // derive the display label for current preference
  const currentThemeLabel =
    themeOptions.find(opt => opt.value === themePreference)?.label ||
    'System Default';

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  const handleSelectTheme = (value: 'light' | 'dark' | 'system') => {
    setThemePreference(value);
    setModalVisible(false);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(40),
    },
    header: {
      fontSize: moderateScale(28),
      fontWeight: '800',
      color: theme.text,
      marginBottom: verticalScale(30),
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    userDetails: {
      width: '100%',
      alignItems: 'center',
      marginBottom: verticalScale(30),
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    avatarBackground: {
      width: moderateScale(120),
      height: moderateScale(120),
      borderRadius: moderateScale(60),
      backgroundColor: theme.buttonBackground + '20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: theme.buttonBackground + '40',
      marginBottom: verticalScale(10),
    },
    userName: {
      fontSize: moderateScale(22),
      fontWeight: '700',
      color: theme.text,
      letterSpacing: 0.5,
    },
    detailsCard: {
      width: '100%',
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(16),
      padding: scale(20),
      elevation: 4,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    detailItem: {
      flexDirection: 'row',
      paddingVertical: verticalScale(12),
    },
    detailIcon: {
      width: moderateScale(40),
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      fontSize: moderateScale(11),
      color: theme.text + 'AA', // Using opacity for secondary text
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: verticalScale(2),
    },
    detailValue: {
      fontSize: moderateScale(16),
      color: theme.text,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: theme.borderColor + '30', // 30% opacity
      marginVertical: verticalScale(4),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: verticalScale(15),
    },
    roundButton: {
      width: moderateScale(70),
      height: moderateScale(70),
      borderRadius: moderateScale(35),
      backgroundColor: theme.cardBackground,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.15,
      shadowRadius: 6,
      borderWidth: 2,
      borderColor: theme.borderColor + '20',
    },
    buttonText: {
      fontSize: moderateScale(10),
      color: theme.text,
      fontWeight: '600',
      marginTop: verticalScale(5),
      textAlign: 'center',
    },
    logoutButton: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(40),
      backgroundColor: theme.error || '#FF5252',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
      shadowColor: theme.error || '#FF5252',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
      alignSelf: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(20),
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: moderateScale(25),
      paddingVertical: verticalScale(20),
      width: '100%',
      maxWidth: scale(300),
      elevation: 12,
      shadowColor: theme.text,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    modalHeader: {
      fontSize: moderateScale(20),
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
      marginBottom: verticalScale(20),
    },
    modalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: verticalScale(15),
      paddingHorizontal: scale(25),
    },
    modalItemText: {
      fontSize: moderateScale(16),
      color: theme.text,
      fontWeight: '500',
    },
    separator: {
      height: 1,
      backgroundColor: theme.borderColor + '40',
      marginHorizontal: scale(25),
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Profile</Text>
<View style={styles.userDetails}>
  {/* Profile Avatar with Circular Background */}
  <View style={styles.avatarContainer}>
    <View style={styles.avatarBackground}>
      <Icon
        name="portrait"
        size={moderateScale(60)}
        color={theme.buttonBackground}
      />
    </View>
    {currentUser?.name && (
      <Text style={styles.userName}>{currentUser.name}</Text>
    )}
  </View>

  {/* Details Card */}
  <View style={styles.detailsCard}>
    {/* Name Field */}
    <View style={styles.detailItem}>
      <View style={styles.detailIcon}>
        <Icon
          name="person"
          size={moderateScale(18)}
          
        />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>FULL NAME</Text>
        <Text style={styles.detailValue} numberOfLines={1}>
          {currentUser?.name || 'Not specified'}
        </Text>
      </View>
    </View>

    {/* Divider */}
    <View style={styles.divider} />

    {/* Email Field */}
    <View style={styles.detailItem}>
      <View style={styles.detailIcon}>
        <Icon
          name="email"
          size={moderateScale(18)}
          
        />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>
        <Text style={styles.detailValue} numberOfLines={1}>
          {currentUser?.email || 'Not specified'}
        </Text>
      </View>
    </View>

    {/* Divider */}
    <View style={styles.divider} />

  
    
  </View>
</View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.roundButton}
            activeOpacity={0.7}>
            <Icon
              name="edit"
              size={moderateScale(24)}
              color={theme.text}
            />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.roundButton}
            activeOpacity={0.7}>
            <Icon
              name="palette"
              size={moderateScale(24)}
              color={theme.text}
            />
            <Text style={styles.buttonText}>Theme</Text>
          </TouchableOpacity>

    
        </View>


        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout()}
          activeOpacity={0.8}>
          <Icon 
            name="logout" 
            size={moderateScale(30)} 
            color="#fff" 
          />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <Animated.View style={[styles.modalContent, {opacity: fadeAnim}]}>
            <Text style={styles.modalHeader}>Choose Theme</Text>
            {themeOptions.map((option, index) => (
              <React.Fragment key={option.value}>
                {index > 0 && <View style={styles.separator} />}
                <Pressable
                  android_ripple={{color: theme.borderColor}}
                  onPress={() => handleSelectTheme(option.value)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{option.label}</Text>
                  {themePreference === option.value && (
                    <Icon
                      name="check"
                      size={moderateScale(20)}
                      color={theme.buttonBackground}
                    />
                  )}
                </Pressable>
              </React.Fragment>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileScreen;