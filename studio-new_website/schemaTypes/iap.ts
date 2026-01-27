import {defineField, defineType} from 'sanity'

export const iapPage = defineType({
  name: 'iapPage',
  title: 'Intergenerational Afterschool Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Intergenerational Afterschool Program',
    }),
    defineField({
      name: 'heroImage1',
      title: 'Hero Image 1',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage2',
      title: 'Hero Image 2',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage3',
      title: 'Hero Image 3',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage4',
      title: 'Hero Image 4',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Page Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          name: 'studentProjectImage',
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
      name: 'studentProjectsBody',
      title: 'Student Projects Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProjectImage',
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
              media: 'image.asset',
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
      name: 'studentProject1',
      title: 'Student Project 1',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProject1Image',
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
              media: 'image.asset',
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
      name: 'studentProject2',
      title: 'Student Project 2',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProject2Image',
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
              media: 'image.asset',
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
      name: 'studentProject3',
      title: 'Student Project 3',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProject3Image',
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
              media: 'image.asset',
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
      name: 'studentProject4',
      title: 'Student Project 4',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProject4Image',
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
              media: 'image.asset',
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
      name: 'studentProject5',
      title: 'Student Project 5',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
        {
          name: 'studentProject5Image',
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
              media: 'image.asset',
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
  ],
})

export default iapPage
