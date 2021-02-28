import React from 'react';
import { Button, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useLocation } from '../../hooks/location';
import {
  CurrentWeatherView,
  Container,
  CurrentWeatherInfo,
  MainTemp,
  ImgTemp,
  TextTitle,
  TextSubtitle,
  HourTemps,
  WeekTemps,
  WeekDayText,
} from './styles';
import { colors } from '../../styles/colors';
import { Row } from '../../components/Row';

const Dashboard: React.FC = () => {
  const { clearLocation } = useLocation();
  return (
    <LinearGradient colors={colors.rainy} style={{ flex: 1 }}>
      <Container>
        <Button title="Sair" onPress={() => clearLocation()} />
        <CurrentWeatherView>
          <CurrentWeatherInfo>
            <TextTitle>Goiânia</TextTitle>
            <View>
              <MainTemp>22°</MainTemp>
              <Row>
                <Row>
                  <IconFeather name="chevron-up" color="white" size={18} />
                  <TextSubtitle>25°</TextSubtitle>
                </Row>
                <Row>
                  <IconFeather name="chevron-down" color="white" size={18} />
                  <TextSubtitle>20°</TextSubtitle>
                </Row>
              </Row>
            </View>

            <View>
              <TextTitle>Ensolarado</TextTitle>
              <TextSubtitle>Sensação térmica 38°</TextSubtitle>
            </View>
          </CurrentWeatherInfo>
          <ImgTemp>
            <IconIonicons name="rainy-outline" size={300} color="white" />
          </ImgTemp>
        </CurrentWeatherView>
        <HourTemps>
          <View>
            <TextSubtitle opacity="0.8">Agora</TextSubtitle>
            <TextTitle fontWeight="bold">35°</TextTitle>
          </View>
          <View>
            <TextSubtitle opacity="0.8">15:00</TextSubtitle>
            <TextTitle fontWeight="bold">35°</TextTitle>
          </View>
          <View>
            <TextSubtitle opacity="0.8">16:00</TextSubtitle>
            <TextTitle fontWeight="bold">30°</TextTitle>
          </View>
          <View>
            <TextSubtitle opacity="0.8">17:00</TextSubtitle>
            <TextTitle fontWeight="bold">27°</TextTitle>
          </View>
          <View>
            <TextSubtitle opacity="0.8">18:00</TextSubtitle>
            <TextTitle fontWeight="bold">28°</TextTitle>
          </View>
        </HourTemps>
        <WeekTemps>
          <Row full withSpaceBetween>
            <WeekDayText>Segunda-feira</WeekDayText>
            <IconIonicons name="sunny-outline" size={24} color="white" />
            <Row width="15%" height="40px" withSpaceBetween>
              <TextSubtitle fontWeight="bold">31</TextSubtitle>
              <TextSubtitle opacity="0.8">13</TextSubtitle>
            </Row>
          </Row>
          <Row full withSpaceBetween>
            <WeekDayText>Terça-feira</WeekDayText>
            <IconIonicons name="rainy-outline" size={24} color="white" />
            <Row width="15%" height="40px" withSpaceBetween>
              <TextSubtitle fontWeight="bold">31</TextSubtitle>
              <TextSubtitle opacity="0.8">13</TextSubtitle>
            </Row>
          </Row>
          <Row full withSpaceBetween>
            <WeekDayText>Quarta-feira</WeekDayText>
            <IconIonicons name="thunderstorm-outline" size={24} color="white" />
            <Row width="15%" height="40px" withSpaceBetween>
              <TextSubtitle fontWeight="bold">31</TextSubtitle>
              <TextSubtitle opacity="0.8">13</TextSubtitle>
            </Row>
          </Row>
          <Row full withSpaceBetween>
            <WeekDayText>Quinta-feira</WeekDayText>
            <IconIonicons name="snow-outline" size={24} color="white" />
            <Row width="15%" height="40px" withSpaceBetween>
              <TextSubtitle fontWeight="bold">31</TextSubtitle>
              <TextSubtitle opacity="0.8">13</TextSubtitle>
            </Row>
          </Row>
          <Row full withSpaceBetween>
            <WeekDayText>Sexta-feira</WeekDayText>
            <IconIonicons name="partly-sunny-outline" size={24} color="white" />
            <Row width="15%" height="40px" withSpaceBetween>
              <TextSubtitle fontWeight="bold">31</TextSubtitle>
              <TextSubtitle opacity="0.8">13</TextSubtitle>
            </Row>
          </Row>
        </WeekTemps>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
