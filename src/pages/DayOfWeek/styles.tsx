import styled from 'styled-components/native';
import { Platform } from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import TextSubtitle from '../../components/TextSubtitle';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 0 : 16}px 16px
    ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const CurrentWeatherView = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const CurrentWeatherInfo = styled.View`
  flex: 1;
  min-width: 40px;
  min-height: 300px;
  align-items: flex-start;
  justify-content: space-between;
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
  padding: 16px 12px 12px 12px;
  justify-content: center;
  align-items: center;
`;

export const HourText = styled(TextSubtitle)`
  opacity: 0.7;
`;

export const ActionButton: React.FC = ({ children, ...props }) => (
  <Button
    {...props}
    style={{
      height: 50,
      width: 50,
      borderRadius: 50 / 2,
      backgroundColor: 'rgba(255,255,255,0.3)',
    }}
  >
    {children}
  </Button>
);
