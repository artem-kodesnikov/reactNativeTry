import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'o7hl3yhr',
  dataset: 'demodelivery',
  useCdn: true,
  apiVersion: '2023-03-20'
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;