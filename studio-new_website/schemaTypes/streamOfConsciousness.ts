import { defineField, defineType } from 'sanity'

export const streamOfConsciousness = defineType({
    name: 'streamOfConsciousness',
    title: 'Stream of Consciousness',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
})
