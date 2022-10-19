import React, { useEffect } from 'react';
import { Box, Center, Text } from 'native-base';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useSplash } from '../hooks/useSplash';
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const Splash = () => {
  const { setLoading } = useSplash();
  const splashAnimation = useSharedValue(0);

  const brandStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 0.5, 1], [1, 0.3, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 1],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 1],
            [-50, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(
      1,
      {
        duration: 1000,
      },
      () => {
        'worklet';
        runOnJS(startApp)();
      }
    );
  }, []);

  const startApp = () => {
    setLoading(false);
  };

  return (
    <Center bg="trueGray.900" flex="1">
      <AnimatedBox position="absolute" alignSelf="center" style={brandStyles}>
        <Text
          color="trueGray.200"
          fontSize="48"
          _light={{
            color: 'trueGray.800',
          }}
        >
          D
        </Text>
      </AnimatedBox>

      <AnimatedBox position="absolute" alignSelf="center" style={logoStyles}>
        <Text color="violet.800" fontSize="48">
          DISASTER ALERT
        </Text>
      </AnimatedBox>
    </Center>
  );
};
