import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'text',
  fields: [
    defineField({
      name: 'orderId',
      title: 'OrderId',
      type: Number,
      description: 'This should be used to order the posts.'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
