import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'partnerCurrent',
    title: 'Current Partners',
    type: 'document',
    fields: [
        defineField({
            name: 'orderId',
            title: 'OrderId',
            type: 'number',
            description: 'This should be used to order the partners.'
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image'
        }),
        defineField({
            name: 'hyperlink',
            title: 'Hyperlink',
            type: 'url'
        })
    ]
})