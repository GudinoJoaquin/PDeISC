import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Config } from '../enum/config';

export default function ClassDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/profesor/class/getByID/${id}`
        );

        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Clase con ID: {data?.titulo}</Text>
    </View>
  );
}
