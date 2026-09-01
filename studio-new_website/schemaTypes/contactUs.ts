import {defineField, defineType} from 'sanity'

export const contactUs = defineType({
  name: 'contactUs',
  title: 'Contact Us',
  type: 'document',

  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'officeHeading',
      title: 'Office Heading',
      type: 'string',
      initialValue: 'Our Office',
    }),

    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
    }),

    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
    }),

    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'United States',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'pageTitle',
    },
  },
})