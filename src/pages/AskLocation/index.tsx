import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import { Container, SubmitView, Title } from './styles';
import Button from '../../components/Button';
import { useLocation } from '../../hooks/location';

const AskLocation: React.FC = () => {
  const navigation = useNavigation();
  const { getCurrentLocation } = useLocation();

  const handleGetLocation = useCallback(async (): Promise<void> => {
    try {
      await getCurrentLocation();
    } catch (err) {
      Alert.alert(
        'Erro ao buscar localização',
        'Ocorreu um erro ao buscar localização, tente novamente',
      );
    }
  }, [getCurrentLocation]);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Precisamos da sua localização</Title>
          </View>
          <SubmitView>
            <Button onPress={() => handleGetLocation()}>
              <Icon name="map-pin" size={20} />
              Buscar localização
            </Button>
          </SubmitView>
        </Container>
      </ScrollView>
    </>
  );
};

export default AskLocation;
