import '@/global.css';
import useOAuthAccessToken from '@/hooks/useOAuthAccessToken';
import getSession from '@/utils/getSession';
import { Tabs, usePathname } from 'expo-router';
import { useEffect } from 'react';
import saveSession from '@/utils/saveSession';
import getLocalSession from '@/utils/getLocalSession';
import { useSessionStore } from '@/store/sessionStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  const accessToken = useOAuthAccessToken();
  const pathname = usePathname();
  const { jwt, setSession } = useSessionStore();

  useEffect(() => {
    const verifySession = async () => {
      if (jwt) return; // ya hay sesión activa

      const localSession = await getLocalSession();
      if (localSession?.token && localSession?.user_id && accessToken) {
        console.log('Sesion local encontrada', localSession);
        setSession(localSession.token, localSession.user_id, accessToken);
        return;
      }

      if (accessToken) {
        const session = await getSession(accessToken);
        console.log('Sesion obtenida', session);
        saveSession({ ...session, access_token: accessToken });
        setSession(session.token, session.user_id, accessToken);
      }
    };

    verifySession();
  }, [accessToken, jwt, pathname, setSession]);

  return (
    <Tabs
      key={jwt ? 'auth' : 'guest'} // 👈 fuerza re-render al iniciar/cerrar sesión
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
      }}
    >
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

      {/* Solo visible si NO hay sesión */}
      <Tabs.Screen
        name="(auth)/login"
        options={{
          animation: 'shift',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="sign-in" size={24} color={focused ? '#3b82f6' : '#9ca3af'} />
          ),
          title: 'Login',
          headerShown: false,
          href: jwt ? null : '/(auth)/login',
        }}
      />

      {/* Solo visible si HAY sesión */}
      <Tabs.Screen
        name="account"
        options={{
          animation: 'shift',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={24} color={focused ? '#3b82f6' : '#9ca3af'} />
          ),
          title: 'Account',
          headerShown: false,
          href: jwt ? '/account' : null,
        }}
      />

      <Tabs.Screen
        name="(auth)/(steps)"
        options={{
          href: null, // no aparece
        }}
      />
    </Tabs>
  );
}
