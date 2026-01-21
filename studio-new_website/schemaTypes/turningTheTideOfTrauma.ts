import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'turningTheTide',
    title: 'Turning The Tide of Trauma',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'mainimage',
            title: 'MainImage',
            type: 'image'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'markdown'
        }),
        defineField({
            name: "links",
            title: 'Links',
            type: 'array',
            of: [{type: 'string'}]
        })
    ]
})