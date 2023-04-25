import { View, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { useDispatch } from 'react-redux';
import { ArrowLeftIcon, ChevronRightIcon, StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import BasketScreen from './BasketScreen'
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      att
    } } = useRoute()

  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      att
    }))
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url()
            }}
            className='w-full h-56'
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
          >
            <ArrowLeftIcon size={20} color='#00CCBB' />
          </TouchableOpacity>
          <View className='bg-white'>
            <View className='px-4 pt-4'>
              <Text className='font-bold text-3xl'>{title}</Text>
              <View className='flex-row space-x-2'>
                <View className='flex-row items-center space-x-1'>
                  <StarIcon color='green' opacity={0.5} size={22} />
                  <Text className='text-xs text-gray-500'>
                    <Text className='text-green-500'>{rating}</Text> · {genre}
                  </Text>
                </View>
                <View className='flex-row items-center space-x-1'>
                  <MapPinIcon color='gray' opacity={0.4} size={22} />
                  <Text className='text-xs text-gray-500'>
                    Nearby · {address}
                  </Text>
                </View>
              </View>
              <Text className='text-gray-500 mt-2 pb-4'>
                {shortDescription}
              </Text>
            </View>
            <TouchableOpacity className='flex-row items-center px-4 p-4 space-x-2 border-y border-gray-200'>
              <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
              <Text className='font-bold flex-1 pl-2'>
                Have a food allergy?
              </Text>
              <ChevronRightIcon color='#00CCBB' />
            </TouchableOpacity>
          </View>
          <View className='pb-32'>
            <Text className='px-4 pt-6 mb-3 font-bold text-xl'>
              Menu
            </Text>
            {dishes?.map(dish => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen