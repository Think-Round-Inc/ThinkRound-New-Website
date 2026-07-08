import {defineField, defineType} from 'sanity'

export const subscribeSubmission = defineType({
  name: 'subscribeSubmission',
  title: 'Subscribe Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      type: 'string',
      validation: (rule) => rule.required().error('First name is required'),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      validation: (rule) => rule.required().error('Last name is required'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required().error('Email is required'),
    }),
    defineField({
      name: 'subject',
      type: 'string',
      validation: (rule) => rule.required().error('Subject is required'),
    }),
    defineField({
      name: 'message',
      type: 'text',
      validation: (rule) => rule.required().error('Message is required'),
    }),
  ],
})
