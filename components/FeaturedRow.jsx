import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestauranCard from './RestaurantCard'

const FeaturedRow = ({ title, description, id }) => {
  return (
    <View>
      <View className='pt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-xl'>{title}</Text>
        <ArrowRightIcon color='#00CCBB'/>
      </View>
      <Text  className='text-xs text-gray-500 px-4'>{description}</Text>
      <ScrollView 
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        <RestauranCard 
          id={1}
          imgUrl='https://ris.od.ua/wp-content/uploads/filadelfiya-s-ugrem_1-500x500.jpg'
          title='Restaurant Card'
          rating={4.5}
          genre='Japanese'
          address='123 main st '
          shortDescription='This is a description'
          dishes={[]}
          long={20}
          att={0}
        />
        <RestauranCard 
          id={1}
          imgUrl='https://ris.od.ua/wp-content/uploads/filadelfiya-s-ugrem_1-500x500.jpg'
          title='Restaurant Card'
          rating={4.5}
          genre='Japanese'
          address='123 main st '
          shortDescription='This is a description'
          dishes={[]}
          long={20}
          att={0}
        />
        <RestauranCard 
          id={1}
          imgUrl='https://ris.od.ua/wp-content/uploads/filadelfiya-s-ugrem_1-500x500.jpg'
          title='Restaurant Card'
          rating={4.5}
          genre='Japanese'
          address='123 main st '
          shortDescription='This is a description'
          dishes={[]}
          long={20}
          att={0}
        />
      </ScrollView>
    </View>
  )
}

export default FeaturedRow