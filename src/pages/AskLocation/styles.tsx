import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin: 36px 0 0;
`;

export const Description = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const SubmitView = styled.View`
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  background-color: #fff;
`;
