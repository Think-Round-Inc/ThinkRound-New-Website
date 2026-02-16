import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'richTextBlock',
  title: 'Rich Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      initialValue: [
        {
          _type: 'block',
          style: 'normal',
          children: [{_type: 'span', text: ''}],
        },
      ],
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal (Default 24pt)', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'textColor',
                type: 'object',
                title: 'Text Color',
                fields: [
                  defineField({
                    name: 'value',
                    title: 'Hex Color',
                    type: 'string',
                    description: 'Use hex format, e.g. #1e3a8a',
                    validation: (rule) =>
                      rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                        name: 'hex color',
                      }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Rich Text Block'}
    },
  },
})
