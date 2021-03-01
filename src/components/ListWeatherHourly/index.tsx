import React from 'react';
import { FlatList } from 'react-native';
import { HourTemp } from './styles';
import TextSubtitle from '../TextSubtitle';
import TextTitle from '../TextTitle';
import { Weather } from '../../hooks/weather';

interface Props {
  weatherByHour: Weather[];
}

export const ListWeatherHourly: React.FC<Props> = ({ weatherByHour }) => (
  <>
    {weatherByHour && weatherByHour.length > 0 && (
      <FlatList
        data={weatherByHour}
        horizontal
        keyExtractor={item => item.time.toString()}
        renderItem={({ item }) => (
          <HourTemp key={item.time.toString()}>
            <TextSubtitle opacity="0.8">
              {`${new Date(item.time).getHours()}:00`}
            </TextSubtitle>
            <TextTitle fontWeight="bold">{item.temp}</TextTitle>
          </HourTemp>
        )}
        style={{
          flex: 1,
          minHeight: '12%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 20,
        }}
      />
    )}
  </>
);
