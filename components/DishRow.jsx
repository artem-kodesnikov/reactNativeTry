import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItem } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(state => state.basket.items.filter(item => item.id === id));

  const handleAddToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}))
  }

  const handleRemoveFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }))
  }
  return (
    <>
      <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className='bg-white border-t-2 p-4 border-gray-100'>
        <View className='flex-row'>
          <View className='flex-1'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400 mb-2'>{description}</Text>
            <Text>{price} &#8372;</Text>
          </View>
          <View>
            <Image
              source={{
                uri: urlFor(image).url()
              }}
              className='h-20 w-20'
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className='bg-white px-4 pb-2'>
          <View className='flex-row items-center space-x-2'>
            <TouchableOpacity disabled={!items.length} onPress={handleRemoveFromBasket}>
              <MinusCircleIcon 
                size={40} 
                color={items.length > 0 ? '#00CCBB' : 'gray'}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={handleAddToBasket}>
              <PlusCircleIcon size={40} color='#00CCBB' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow