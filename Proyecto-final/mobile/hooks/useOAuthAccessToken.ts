import { useState, useEffect, useCallback } from 'react';
import * as Linking from 'expo-linking';

export default function useOAuthAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleDeepLink = useCallback((event: { url: string }) => {
    const url = event.url;

    // Google OAuth devuelve el token en el hash (#access_token=...)
    const hash = url.split('#')[1];
    if (!hash) return;

    const params = Object.fromEntries(
      hash.split('&').map((kv) => {
        const [key, value] = kv.split('=');
        return [key, decodeURIComponent(value)];
      })
    );

    const token = params['access_token'];
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    // Escuchar deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Revisar si la app se abrió con un deep link ya
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, [handleDeepLink]);

  return accessToken;
}
