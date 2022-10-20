import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Box, Center, Spinner, useDisclose, VStack } from 'native-base';
import { mapStyles } from '../styles/maps';
import { api } from '../services/api';
import { socket } from '../services/io';
import { getIcon } from '../utils/getIcon';
import { ModalPrimitive } from '../components/ModalPrimitive';
import { ActionsheetPrimitive } from '../components/ActionsheetPrimitive';
import { Card } from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { CircleButton } from '../components/CircleButton';

export interface IAlert {
  id: string;
  category: string;
  description: string;
  lat: number;
  long: number;
  status: boolean;
  createdAt: Date;
}

export function Home() {
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [markers, setMarkers] = useState<IAlert[]>([]);
  const { isOpen, onToggle } = useDisclose();
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject
  );
  const [currentInfo, setCurrentInfo] = useState<IAlert>({} as IAlert);
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
  const {
    isOpen: isInfoOpen,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDisclose();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
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
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
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

  function handleOpenInfo(info: IAlert) {
    console.log('info', info);
    onOpenInfo();
    setCurrentInfo(info);
  }

  async function handleRemoveAlert(data: IAlert) {
    setLoading(true);

    try {
      await api.patch(`/alerts/${data.id}`, {
        status: false,
      });

      socket.emit('newAlert', {});
      onCloseInfo();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function handleNavigateToChat(data: IAlert) {
    console.log('data', data);
    onCloseInfo();
    navigation.navigate('Chat', { data });
  }

  return (
    <VStack
      flex="1"
      bg="trueGray.900"
      safeArea={Platform.OS === 'android' ? true : undefined}
    >
      {location?.coords?.latitude ? (
        <MapView
          showsUserLocation={true}
          zoomControlEnabled={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyles}
          style={{ height: '100%', width: '100%' }}
          showsMyLocationButton
          initialRegion={{
            latitude: location?.coords?.latitude || 0,
            longitude: location?.coords?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers?.map(marker => {
            if (marker.status === true) {
              return (
                <Marker
                  onPress={() => handleOpenInfo(marker)}
                  key={marker.id}
                  coordinate={{
                    latitude: marker.lat,
                    longitude: marker.long,
                  }}
                >
                  {getIcon({ category: marker.category })}
                </Marker>
              );
            }
          })}
        </MapView>
      ) : (
        <Center flex="1">
          <Spinner color="violet.600" />
        </Center>
      )}

      <Box position="absolute" right="3.5" bottom="120px" zIndex="999">
        <CircleButton
          isOpen={isOpen}
          onToggle={onToggle}
          onPressAddAlert={handleOpenAlert}
          onPressSubtitle={handleOpenSubtitle}
        />
      </Box>

      <Card
        loading={loading}
        onPress={handleRemoveAlert}
        isOpen={isInfoOpen}
        onClose={onCloseInfo}
        data={currentInfo}
        onPressChat={handleNavigateToChat}
      />

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
