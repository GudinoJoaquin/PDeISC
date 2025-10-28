import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { type User } from '@supabase/supabase-js';

export default function useAccount() {
  const { user_id } = useSessionStore();
  const [account, setAccount] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await axios.post(`http://192.168.1.37:3000/user/get`, { user_id });
        setAccount(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error as Error);
        setLoading(false);
      }
    };
    getAccount();
  }, [user_id, account, loading, error, setAccount, setLoading, setError]);

  return { account, loading, error };
}
