import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == 'featured'] {
      ...,
      restaurants[] ->{
        ...,
        dishes[]->
          }
      }
    `).then(data => setFeaturedCategories(data))
  }, [])

  return (
    <SafeAreaView className='bg-white pt-5'>
      <View className='flex-row pb-3 items-center mx-4 space-x-2'> 
        <Image
          source={{
            uri:'https://cdn-icons-png.flaticon.com/512/287/287305.png'
          }}
          className='h-12 w-12 rounded-full '
        />
        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <View className='flex-row items-center'>
            <Text className='font-bold text-xl'>Current Location</Text>
            <ChevronDownIcon size={20} color='#00CCBB'/>
          </View>
        </View>
        <UserIcon color='#00CCBB' size={35}/>
      </View>
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3 items-center'>
          <MagnifyingGlassIcon color='gray' size={20}/>
          <TextInput  
            placeholder='Enter the name of the restaurant'
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon  color='#00CCBB'  />
      </View>
      <ScrollView className='bg-gray-100 mb-8'contentContainerStyle={{
        paddingBottom: 100,
      }}>
          <Categories />

          {featuredCategories.map(category => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen