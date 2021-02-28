import styled from 'styled-components/native';
import { Platform } from 'react-native';

interface TextProps {
  opacity?: string;
  fontWeight?: string;
}

export const Container = styled.View`
  flex: 1;
  padding: 30px 16px ${Platform.OS === 'android' ? 150 : 40}px;
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

export const TextTitle = styled.Text<TextProps>`
  font-size: 26px;
  color: #fff;
  ${props => (props.opacity ? `opacity: ${props.opacity};` : '')}
  ${props => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
`;

export const TextSubtitle = styled.Text<TextProps>`
  font-size: 18px;
  color: #fff;
  ${props => (props.opacity ? `opacity: ${props.opacity};` : '')}
  ${props => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
`;

export const MainTemp = styled.Text`
  font-size: 80px;
  font-weight: 600;
  color: #fff;
`;

export const ImgTemp = styled.View`
  flex: 1;
  position: relative;
  left: 8%;
`;

export const HourTemps = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 18px;
  padding-bottom: 18px;
  border-top-width: 0.5px;
  border-top-color: #fff;
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
  flex-direction: row;
`;

export const HourTemp = styled.View`
  padding-right: 12px;
  padding-left: 12px;
`;

export const HourText = styled(TextSubtitle)`
  opacity: 0.7;
`;

export const WeekTemps = styled.View`
  padding-top: 18px;
  justify-content: space-between;
  align-items: center;
`;

export const WeekDayText = styled.Text`
  font-size: 20px;
  color: #fff;
  width: 36%;
`;
