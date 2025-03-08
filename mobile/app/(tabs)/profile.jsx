import { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import { useAuthStore } from '../../store/authStore';
import styles from '../../assets/styles/profile.styles';
// import ProfileHeader from '../../components/ProfileHeader';
import LogoutButton from '../../components/LogoutButton';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { Image } from 'expo-image';
import { sleep } from '.';
import Loader from '../../components/Loader';

const Profile = () => {
  return (
    <View style={styles.container}>
      <LogoutButton />
    </View>
  );
};
export default Profile;
