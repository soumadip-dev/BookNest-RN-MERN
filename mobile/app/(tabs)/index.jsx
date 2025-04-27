import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

import { Image } from 'expo-image';
import { useEffect, useState } from 'react';

import styles from '../../assets/styles/home.styles';
import { API_URL } from '../../constants/api';
import { Ionicons } from '@expo/vector-icons';
// import { formatPublishDate } from '../../lib/utils';
import COLORS from '../../constants/colors';
// import Loader from '../../components/Loader';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  );
};
export default Home;
