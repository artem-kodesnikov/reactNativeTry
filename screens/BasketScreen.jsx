import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { removeFromBasket, selectBasketTotal } from '../features/basketSlice';


const BasketScreen = () => {
  const navigate = useNavigation();
  const restaurant = useSelector(state => state.restaurant.restaurant)
  const items = useSelector(state => state.basket.items);
  const total = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, {});

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigate.goBack} className='absolute top-3 right-5'>
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/287/287305.png'
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full '
          />
          <Text className='flex-1'>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white px-4 py-2'>
              <Text>{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url()
                }}
                className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>{items[0]?.price} &#8372;</Text>
              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className='text-[#00CCBB] text-xs'
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>{total} &#8372;</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery fee</Text>
            <Text className='text-gray-400'>40 &#8372;</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className=''>Order total</Text>
            <Text className='font-extrabold'>{total + 40} &#8372;</Text>
          </View>
          <TouchableOpacity className='bg-[#00CCBB] rounded-lg p-4'>
            <Text className='text-center text-white text-lg font-bold'>Place order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen