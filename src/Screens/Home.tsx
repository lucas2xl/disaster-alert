import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Stagger,
  useDisclose,
  VStack,
} from 'native-base';
import { useSplash } from '../hooks/useSplash';
import { mapStyles } from '../styles/maps';
import { api } from '../services/api';
import { socket } from '../services/io';
import { getIcon } from '../utils/getIcon';
import { ModalPrimitive } from '../components/ModalPrimitive';
import { ActionsheetPrimitive } from '../components/ActionsheetPrimitive';
import { Splash } from './Splash';

interface IAlert {
  id: string;
  category: string;
  description: string;
  lat: number;
  long: number;
  status: boolean;
  createdAt: Date;
}

export function Home() {
  const { loading: isSplashLoading } = useSplash();
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [markers, setMarkers] = useState<IAlert[]>([]);
  const { isOpen, onToggle } = useDisclose();
  const {
    isOpen: isAddAlertOpen,
    onClose: onCloseAddAlert,
    onOpen: onOpenAddAlert,
  } = useDisclose();
  const {
    isOpen: isSubtitleOpen,
    onClose: onCloseSubtitle,
    onOpen: onOpenSubtitle,
  } = useDisclose();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  useEffect(() => {
    console.log('socket io');
    socket.on('connection', () => {
      console.log('connected');
    });

    socket.on('newAlert', data => {
      console.log('new alert', data);
      if (data) {
        setMarkers(data);
      }
    });
  }, []);

  function handleOpenAlert() {
    onOpenAddAlert();
  }

  function handleOpenSubtitle() {
    onOpenSubtitle();
  }

  async function handleAddAlert() {
    console.log('Enviando alerta');
    if (!verifyFields()) {
      return;
    }
    setLoading(true);

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      await api.post('/alerts', {
        category,
        description,
        lat: latitude,
        long: longitude,
      });

      socket.emit('newAlert', {
        category,
        description,
        lat: latitude,
        long: longitude,
      });
      resetFields();
    } catch (error: any) {
      console.log({ error });
    } finally {
      setLoading(false);
      onCloseAddAlert();
    }
  }

  function verifyFields() {
    if (category !== '' && description !== '') {
      setIsValid(true);
      return true;
    } else {
      setIsValid(false);
      return false;
    }
  }

  function resetFields() {
    setCategory('');
    setDescription('');
  }

  if (isSplashLoading) {
    return <Splash />;
  }

  return (
    <VStack
      flex="1"
      bg="trueGray.900"
      safeArea={Platform.OS === 'android' ? true : undefined}
    >
      <MapView
        showsUserLocation={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyles}
        style={{ height: '100%', width: '100%' }}
        showsMyLocationButton
      >
        {markers?.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.long,
            }}
            title={marker.category}
            description={marker.description}
          >
            {getIcon(marker.category)}
          </Marker>
        ))}
      </MapView>

      <Box position="absolute" left="3.5" bottom="12" zIndex="999">
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
        >
          <IconButton
            onPress={handleOpenSubtitle}
            mb="4"
            variant="solid"
            bg="violet.400"
            borderRadius="full"
            colorScheme="violet"
            icon={<Icon as={Feather} size="6" name="tag" color="warmGray.50" />}
          />
          <IconButton
            onPress={handleOpenAlert}
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
      </Box>

      <ModalPrimitive
        onPress={handleAddAlert}
        isOpen={isAddAlertOpen}
        onClose={onCloseAddAlert}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        isLoading={loading}
        isValid={isValid}
      />

      <ActionsheetPrimitive isOpen={isSubtitleOpen} onClose={onCloseSubtitle} />
    </VStack>
  );
}
