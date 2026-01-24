import { defineField, defineType } from 'sanity'

export const streamOfConsciousness = defineType({
    name: 'streamOfConsciousness',
    title: 'Stream of Consciousness',
    type: 'document',
    fields: [
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                        {
                            name: 'widthPercentage',
                            title: 'Width Percentage',
                            type: 'number',
                            description: 'Width as a percentage (e.g., 80 for 80%)',
                            validation: (Rule) => Rule.min(1).max(100),
                            initialValue: 100,
                        },
                    ],
                    preview: {
                        select: {
                            media: 'image',
                            width: 'widthPercentage',
                        },
                        prepare({ media, width }) {
                            return {
                                title: `Image - ${width || 100}% width`,
                                media,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'pdf',
            title: 'PDF Document',
            type: 'file',
            description: 'PDF file for "See all Panels" button',
            options: {
                accept: '.pdf',
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube video URL',
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['http', 'https'],
                }),
        }),
        defineField({
            name: 'videoText',
            title: 'Video Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph1Title',
            title: 'Paragraph 1 Title',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph1Text',
            title: 'Paragraph 1 Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph2Title',
            title: 'Paragraph 2 Title',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph2Text',
            title: 'Paragraph 2 Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph3Title',
            title: 'Paragraph 3 Title',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'paragraph3Text',
            title: 'Paragraph 3 Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'bottomImages',
            title: 'Bottom Images',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                        {
                            name: 'widthPercentage',
                            title: 'Width Percentage',
                            type: 'number',
                            description: 'Width as a percentage (e.g., 80 for 80%)',
                            validation: (Rule) => Rule.min(1).max(100),
                            initialValue: 100,
                        },
                    ],
                    preview: {
                        select: {
                            media: 'image',
                            width: 'widthPercentage',
                        },
                        prepare({ media, width }) {
                            return {
                                title: `Image - ${width || 100}% width`,
                                media,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'paragraph4Text',
            title: 'Paragraph 4 Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Stream of Consciousness',
            }
        },
    },
})
