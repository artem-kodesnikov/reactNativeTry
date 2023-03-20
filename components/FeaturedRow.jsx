import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity';

const FeaturedRow = ({ title, description, id }) => {
  const [restaurantCards, setRestaurantCards] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == 'featured' && _id == $id] {
      ...,
      restaurants[] ->{
        ...,
        dishes[]->
          }
      }[0]
    `, { id }
    ).then(data => setRestaurantCards(data.restaurants))
  },[])

  // console.log(restaurantCards)
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
        {restaurantCards?.map(card => (
          <RestaurantCard
            key={card._id}
            id={card._id}
            imgUrl={card.image}
            address={card.address}
            title={card.name}
            dishes={card.dishes}
            rating={card.rating}
            shortDescription={card.shord_description}
            long={card.long}
            att={card.att}
            genre={card.genre}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow