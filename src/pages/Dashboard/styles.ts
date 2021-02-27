import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const CurrentWeatherView = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const CurrentWeatherInfo = styled.View`
  flex: 1;
  min-width: 40px;
  min-height: 340px;
  align-items: flex-start;
  justify-content: space-between;
`;

export const TextTitle = styled.Text`
  font-size: 26px;
  color: #fff;
`;

export const TextSubtitle = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const MainTemp = styled.Text`
  font-size: 80px;
  font-weight: 600;
  color: #fff;
`;

export const ImgTemp = styled.View`
  flex: 1;
  position: relative;
  left: -20%;
`;

export const WeekTemps = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 18px;
  padding-bottom: 18px;
  border-top-width: 0.5px;
  border-top-color: #fff;
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
  flex-direction: row;
`;
