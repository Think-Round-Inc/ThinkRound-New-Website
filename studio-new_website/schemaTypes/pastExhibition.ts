import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pastExhibition',
  title: 'Past Exhibition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Exhibition name, e.g. "Pieced Together"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'URL-friendly identifier, auto-generated from title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryLocation',
      title: 'Gallery Location (optional)',
      type: 'string',
      description: 'e.g. "ThinkRound Gallery, 2140 Bush Street, SF"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Main image shown on the listing page grid card. Images are automatically optimized and served in AVIF/WebP format to supported browsers.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (optional)',
          description: 'Important for SEO and accessibility.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artworkGallery',
      title: 'Artwork Gallery',
      type: 'array',
      description: 'Artwork images displayed in the exhibition. Images are automatically optimized and served in AVIF/WebP format to supported browsers.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Artwork Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'e.g. "Artist Name - Title, Year, Medium"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text (optional)',
              type: 'string',
              description: 'Describes the image for screen readers. If empty, caption is used.',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'receptionInfo',
      title: 'Reception and Other Time-Sensitive Information (optional)',
      type: 'text',
      rows: 4,
      description:
        'Include opening reception date/time, artist talk time, gallery hours, etc.',
    }),
    defineField({
      name: 'links',
      title: 'Related Links (optional)',
      type: 'array',
      description: 'Add links to opening reception video, artist interviews, or other related content.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              description: 'e.g. "Watch the Opening Reception", "Watch the Artist Interviews"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name (required)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'bio',
              title: 'Bio (optional)',
              type: 'text',
              rows: 3,
            },
            {
              name: 'photo',
              title: 'Photo (optional)',
              type: 'image',
              options: {hotspot: true},
              description: 'Images are automatically optimized and served in AVIF/WebP format to supported browsers.',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'photo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1 Heading', value: 'h1'},
            {title: 'H2 Heading', value: 'h2'},
            {title: 'H3 Heading', value: 'h3'},
            {title: 'H4 Heading', value: 'h4'},
            {title: 'H5 Heading', value: 'h5'},
            {title: 'H6 Heading', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order (optional)',
      type: 'number',
      description: 'Lower numbers appear first. If not set, sorted by startDate descending.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDate',
      media: 'coverImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).getFullYear().toString() : '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
})
