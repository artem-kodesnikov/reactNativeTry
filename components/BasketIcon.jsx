import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectBasketTotal } from '../features/basketSlice';

const BasketIcon = () => {
  const items = useSelector(state => state.basket.items);
  const basketTotal = useSelector(selectBasketTotal)
  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className='mx-5 bg-[#00CCBB] rounded-lg p-4 flex-row items-center space-x-1'
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] px-2 py-1 rounded'>
          {items.length}
        </Text>
        <Text className='flex-1 text-white font-extrabold text-center text-lg'>
          View Basket
        </Text>
        <Text className='text-lg text-white font-extrabold'>
          {basketTotal}   &#8372;
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon