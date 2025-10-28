import '@/global.css';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '@/config/supabase';
import { useSessionStore } from '@/store/sessionStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Session } from '@supabase/supabase-js';

export default function Layout() {
  const { session, setSession } = useSessionStore();

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.log(error);
      if (data.session) setSession(data.session as Session);
    };

    verifySession();
  }, []); // 👈 solo al montar

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          backgroundColor: '#ffffff',
          borderRadius: 16,
          marginHorizontal: 16,
          marginBottom: 20,
          height: 'auto',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          animation: 'shift',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={24} color={focused ? '#3b82f6' : '#9ca3af'} />
          ),
          title: 'Home',
          headerShown: false,
        }}
      />

      {!session && (
        <Tabs.Screen
          name="(auth)/login"
          options={{
            animation: 'shift',
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="sign-in" size={24} color={focused ? '#3b82f6' : '#9ca3af'} />
            ),
            title: 'Login',
            headerShown: false,
          }}
        />
      )}

      {session && (
        <Tabs.Screen
          name="account"
          options={{
            animation: 'shift',
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="user" size={24} color={focused ? '#3b82f6' : '#9ca3af'} />
            ),
            title: 'Account',
            headerShown: false,
          }}
        />
      )}

      <Tabs.Screen
        name="(auth)/(steps)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
