import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import categories from '../temporaryData/categories.json'

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} imgUrl={category.imgUrl} title={category.title} />
      ))}
    </ScrollView>
  )
}

export default Categories