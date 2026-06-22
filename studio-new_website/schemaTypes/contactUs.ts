import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactUs',
  title: 'Contact Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading for the contact page (e.g., "Contact")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
      description: 'Primary contact person (e.g., "Heidi Hardin")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutCompany',
      title: 'About Company',
      type: 'text',
      description: 'Short description of ThinkRound for the contact page',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      description: 'Mailing or office address shown on the contact page',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number (e.g., "415-771-2198")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'boardSectionTitle',
      title: 'Board Section Title',
      type: 'string',
      description: 'Heading for the board members section (e.g., "Meet our Board of Directors")',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contactName',
    },
  },
})
