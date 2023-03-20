import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const CategoryCard = ({ imgUrl, title }) => {

  return (
    <TouchableOpacity className='mr-2 relative bg-gray-300'>
      <Image
        source={{
          uri: urlFor(imgUrl).width(200).url()
        }}
        className='h-20 w-20 rounded'
      />
      <Text className='absolute bottom-1 left-1 font-bold text-white'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard