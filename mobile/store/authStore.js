import { create } from 'zustand';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/api';

export const useAuthStore = create(set => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success) {
        //  await AsyncStorage.setItem('user', JSON.stringify(data.user));
        //  await AsyncStorage.setItem('token', data.token);

        set({
          user: data.user,
          token: data.token,
          isLoading: false,
        });
        return { success: true };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message || 'Something went wrong, please try again' };
    }
  },
}));
