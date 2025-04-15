import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        <Link href="/signup">Signup Page</Link>
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        <Link href="/login">Login Page</Link>
      </Text>
    </View>
  );
}
