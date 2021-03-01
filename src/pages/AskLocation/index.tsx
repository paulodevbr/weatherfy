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

import LinearGradient from 'react-native-linear-gradient';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Description,
  SubmitButton,
  SubmitView,
  Title,
} from './styles';
import { useLocation } from '../../hooks/location';
import { colors } from '../../styles/colors';

const AskLocation: React.FC = () => {
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
        <LinearGradient colors={colors.default} style={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Precisamos da sua localização</Title>
              <Description>
                Precisamos da sua localização para buscar os dados de clima
              </Description>
            </View>
            <SubmitView>
              <SubmitButton onPress={() => handleGetLocation()}>
                <Icon name="map-pin" size={20} />
                Buscar localização
              </SubmitButton>
            </SubmitView>
          </Container>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default AskLocation;
