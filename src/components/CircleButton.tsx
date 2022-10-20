import { Component } from 'react';
import { HStack, Icon, IconButton, Stagger } from 'native-base';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface CircleButtonProps {
  isOpen: boolean;
  onPressSubtitle: () => void;
  onPressAddAlert: () => void;
  onToggle: () => void;
}
export function CircleButton({
  onPressAddAlert,
  onPressSubtitle,
  onToggle,
  isOpen,
  ...rest
}: CircleButtonProps) {
  return (
    <>
      <Stagger
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        exit={{
          translateY: 34,
          scale: 0.5,
          opacity: 0,
          transition: {
            duration: 100,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        {...rest}
      >
        <IconButton
          onPress={onPressSubtitle}
          mb="4"
          variant="solid"
          bg="violet.400"
          borderRadius="full"
          colorScheme="violet"
          icon={<Icon as={Feather} size="6" name="tag" color="warmGray.50" />}
        />
        <IconButton
          onPress={onPressAddAlert}
          mb="4"
          variant="solid"
          bg="violet.400"
          colorScheme="violet"
          borderRadius="full"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="plus"
              color="warmGray.50"
            />
          }
        />
      </Stagger>

      <HStack alignItems="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          w="12"
          h="12"
          onPress={onToggle}
          bg="violet.500"
          _pressed={{
            bg: 'violet.800',
          }}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="dots-horizontal"
              color="warmGray.50"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
    </>
  );
}
