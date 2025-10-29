import { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useAlertStore } from '@/store/alertStore';

export default function Alert() {
  const { visible, message, type, hideAlert } = useAlertStore();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  const colors = {
    error: '#EF4444',
    success: '#22C55E',
    info: '#3B82F6',
    warning: '#EAB308',
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -100, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible || !message) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors[type],
          transform: [{ translateY }],
          opacity,
          width: screenWidth * 0.9,
        },
      ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    zIndex: 999,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    flex: 1,
  },
  close: {
    marginLeft: 8,
  },
});
