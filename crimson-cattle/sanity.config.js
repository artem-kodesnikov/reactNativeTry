import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'crimson-cattle',

  projectId: 'o7hl3yhr',
  dataset: 'demodelivery',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
