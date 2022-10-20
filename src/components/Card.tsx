import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { IAlert } from '../Screens/Home';

interface CardProps {
  data: IAlert;
  onPress: (data: IAlert) => void;
  loading: boolean;
  onPressChat: (data: IAlert) => void;
  isOpen: boolean;
  onClose: () => void;
}
export function Card({
  data,
  onPress,
  onPressChat,
  loading,
  isOpen,
  onClose,
}: CardProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box
        position="absolute"
        bottom="32"
        right="10%"
        left="10%"
        w="80%"
        p="4"
        rounded="lg"
        bg="trueGray.900"
        shadow="9"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Button
            onPress={() => onPress(data)}
            isLoading={loading}
            bg="red.400"
            colorScheme="red"
            startIcon={
              <Icon
                as={<Ionicons name="close-outline" />}
                size="md"
                color="white"
              />
            }
          >
            Remover alerta
          </Button>

          <Pressable onPress={() => onPressChat(data)} flexDirection="row">
            <HStack space="2" alignItems="center">
              <Text color="white">Chat</Text>
              <Icon
                as={Ionicons}
                name="chatbubbles-outline"
                size="md"
                color="violet.700"
              />
            </HStack>
          </Pressable>
        </HStack>

        <HStack
          mt="4"
          space="2"
          alignItems="flex-start"
          justifyContent="space-around"
        >
          <VStack space="2" alignItems="center" flex="1">
            <Icon
              as={MaterialIcons}
              name="description"
              size="md"
              color="violet.700"
            />
            <Text color="white">Descrição</Text>
            <Text color="trueGray.400">{data?.description}</Text>
          </VStack>

          <VStack space="2" alignItems="center" flex="1">
            <Icon as={Feather} name="alert-circle" size="md" color="red.700" />
            <Text color="white">{data?.category?.toUpperCase()}</Text>
            <Box>
              <Text color="trueGray.400">
                Latitude: {data?.lat?.toFixed(4)}
              </Text>
              <Text color="trueGray.400">
                Longitude: {data?.long?.toFixed(4)}
              </Text>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Modal>
  );
}
