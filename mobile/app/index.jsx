import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {user && (
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}
        >{`Hello ${user.username}`}</Text>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        <Link href="/(auth)/signup">Signup Page</Link>
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        <Link href="/(auth)">Login Page</Link>
      </Text>
      {user && (
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }} onPress={logout}>
          Logout
        </Text>
      )}
    </View>
  );
}
