import styled from 'styled-components/native';
import { Platform } from 'react-native';
import TextSubtitle from '../TextSubtitle';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 0 : 16}px 16px
    ${Platform.OS === 'android' ? 150 : 40}px;
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
