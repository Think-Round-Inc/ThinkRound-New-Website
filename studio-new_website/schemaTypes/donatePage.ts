import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  fields: [
    defineField({
      name: 'Image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
    }),
    defineField({
      name: 'ButtonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
    }),
    defineField({
      name: 'supportingContent',
      title: 'Supporting content',
      type: 'text',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name from your icon set (e.g., "facebook", "twitter").',
            }),
          ],
        }),
      ],
    }),
  ],
});
