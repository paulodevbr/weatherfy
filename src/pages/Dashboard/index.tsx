import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { format, isSameDay } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import { useLocation } from '../../hooks/location';
import {
  CurrentWeatherView,
  Container,
  CurrentWeatherInfo,
  MainTemp,
  ImgTemp,
  WeekDayText,
  ActionButton,
} from './styles';
import { colors } from '../../styles/colors';
import { Row } from '../../components/Row';
import { useWeather } from '../../hooks/weather';
import getWeatherColor from '../../utils/getWeatherColor';
import getWeatherIcon from '../../utils/getWeatherIcon';
import { BrazilLocale } from '../../utils/BrazilLocale';
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';
import { ListWeatherHourly } from '../../components/ListWeatherHourly';
import TextSubtitle from '../../components/TextSubtitle';
import TextTitle from '../../components/TextTitle';
import { ListWeatherOfWeek } from '../../components/ListWeatherOfWeek';

const Dashboard: React.FC = () => {
  const { clearLocation } = useLocation();
  const { loading, current, getWeather, hourly, daily } = useWeather();
  const { navigate } = useNavigation();

  const hoursToday =
    hourly && hourly.length > 0
      ? hourly.filter(hourWeather =>
          isSameDay(new Date(hourWeather.time), new Date()),
        )
      : [];

  if (loading) {
    return (
      <LinearGradient
        colors={colors.default}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  if (!current) {
    return (
      <LinearGradient
        colors={colors.default}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TextTitle>Não foi possível buscar dados do clima</TextTitle>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient colors={getWeatherColor(current.main)} style={{ flex: 1 }}>
      <Container>
        <Row full center height="100px">
          <TextSubtitle>
            {upperCaseFirstLetter(
              format(new Date(), "eee, dd 'de' MMMM", BrazilLocale),
            )}
          </TextSubtitle>
        </Row>

        <CurrentWeatherView>
          <CurrentWeatherInfo>
            <TextTitle>{current.city}</TextTitle>
            <View>
              <MainTemp>{current.temp}</MainTemp>
              <Row>
                <Row>
                  <IconFeather name="chevron-up" color="white" size={18} />
                  <TextSubtitle>{current.tempMax}</TextSubtitle>
                </Row>
                <Row>
                  <IconFeather name="chevron-down" color="white" size={18} />
                  <TextSubtitle>{current.tempMin}</TextSubtitle>
                </Row>
              </Row>
            </View>

            <View>
              <TextTitle>{current.description}</TextTitle>
              <TextSubtitle>{`Sensação térmica ${current.feelsLike}`}</TextSubtitle>
            </View>
          </CurrentWeatherInfo>
          <ImgTemp>
            <IconIonicons
              name={getWeatherIcon(current.main)}
              size={300}
              color="white"
            />
          </ImgTemp>
        </CurrentWeatherView>
        <ListWeatherHourly weatherByHour={hoursToday} />
        <ListWeatherOfWeek
          weatherByDay={daily}
          onPressItem={item => navigate('DayOfWeek', { weatherDay: item })}
        />
        <Row full withSpaceBetween height="100px">
          <ActionButton onPress={() => clearLocation()}>
            <IconIonicons
              name="return-up-back-outline"
              size={25}
              color="white"
            />
          </ActionButton>
          <ActionButton onPress={() => getWeather()}>
            <IconIonicons name="refresh-outline" size={25} color="white" />
          </ActionButton>
        </Row>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
