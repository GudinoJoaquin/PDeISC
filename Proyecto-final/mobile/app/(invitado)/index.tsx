import { View } from 'react-native';
import Screen from '@/components/Screen';
import AccountHeader from '@/components/AccountHeader';
import AccountTabs from '@/components/AccountTabs';
import { useSessionStore } from '@/store/sessionStore';

export default function Account() {
  const { session } = useSessionStore();
  const metadata = session?.user?.user_metadata || {};
  const role = metadata.role;

  return (
    <Screen>
      <View className="flex-1 bg-gray-100">
        <View className="px-6 pt-10">
          <AccountHeader />
        </View>
        <View className="flex-1">
          <AccountTabs role={role} topics={metadata.topics} />
        </View>
      </View>
    </Screen>
  );
}
