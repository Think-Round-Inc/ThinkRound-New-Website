import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'OrderId',
      type: 'number',
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
      //type: 'text'
      type: 'markdown' //https://www.sanity.io/plugins/sanity-plugin-markdown
    }),
  ],
})
