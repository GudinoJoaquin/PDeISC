import { Pressable, PressableProps, Text } from 'react-native';

interface TabProps extends PressableProps {
  title: string;
  tab: string;
}

export default function Tab({ title, tab, onPress }: TabProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 py-3 ${
        tab === title ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
      }`}>
      <Text
        className={`text-center font-medium ${tab === title ? 'text-blue-600' : 'text-gray-500'}`}>
        {title}
      </Text>
    </Pressable>
  );
}
