import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { WeatherDaily } from '../../hooks/weather';
import { Row } from '../Row';
import { WeekDayText } from '../../pages/Dashboard/styles';
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';
import { BrazilLocale } from '../../utils/BrazilLocale';
import getWeatherIcon from '../../utils/getWeatherIcon';
import TextSubtitle from '../TextSubtitle';

interface Props {
  weatherByDay: WeatherDaily[];
  onPressItem(item: WeatherDaily): void;
}

export const ListWeatherOfWeek: React.FC<Props> = ({
  weatherByDay,
  onPressItem,
}) => (
  <FlatList
    data={weatherByDay}
    keyExtractor={item => item.time.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <Row key={item.time.toString()} full withSpaceBetween>
          <WeekDayText>
            {upperCaseFirstLetter(
              format(new Date(item.time), 'eee', BrazilLocale),
            )}
          </WeekDayText>
          <IconIonicons
            name={getWeatherIcon(item.main)}
            size={24}
            color="white"
          />
          <Row width="20%" height="40px" withSpaceBetween>
            <TextSubtitle fontWeight="bold">{item.tempMax}</TextSubtitle>
            <TextSubtitle opacity="0.8">{item.tempMin}</TextSubtitle>
          </Row>
        </Row>
      </TouchableOpacity>
    )}
    style={{
      marginTop: 16,
      minHeight: '24%',
    }}
  />
);
