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
            name: 'mainImage',
            title: 'Main Image',
            type: 'image'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'markdown'
        }),
        defineField({
            name: 'links',
            type: 'array',
            title: "Links",
            of: [{
                type: 'object',
                fields: [
                    {
                    name: 'linkname',
                    title: 'Link Name',
                    type: 'string',
                    },
                    {
                    name: 'linkurl',
                    title: 'Link URL',
                    type: 'url',
                    }
                ]
            }]
        })
    ]
})