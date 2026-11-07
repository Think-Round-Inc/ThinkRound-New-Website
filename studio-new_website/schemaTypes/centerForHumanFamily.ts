import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'centerForTheHumanFamily',
  title: 'Center for the Human Family',
  type: 'document',
  fields: [
    /*Main Title (e.g "The Center For The Human Family" */
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    /*Partners Content Area*/
    defineField({
      name: 'partnersHeading',
      title: 'Partners — Heading',
      type: 'string',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          name: 'partner',
          title: 'Partner',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
            }),
            defineField({
              name: 'hyperlink',
              title: 'Website Link',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'hyperlink', media: 'logo'},
          },
        },
      ],
    }),

    /*Story Content Area*/
    defineField({
      name: 'storyHeading',
      title: 'Story — Heading',
      type: 'string',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story — Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'storyImage',
      title: 'Story — Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),

    /*Video Content Area*/
    defineField({
      name: 'videoHeading',
      title: 'Learning Video — Heading',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Learning Video — URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),

    /*"What is the Center" Content Area*/
    defineField({
      name: 'aboutHeading',
      title: 'What Is the Center — Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody',
      title: 'What Is the Center — Body',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'Include the introduction, inspiration quote, attribution, and remaining paragraphs.',
    }),
    defineField({
      name: 'aboutImage',
      title: 'What Is the Center — Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery — Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
        },
      ],
    }),

     /*"The Floors" Content Area*/
    defineField({
      name: 'floorsHeading',
      title: 'Floors — Heading',
      type: 'string',
    }),
    defineField({
      name: 'floors',
      title: 'Floors',
      type: 'array',
      of: [
        {
          name: 'floor',
          title: 'Floor',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
    /*Artists Content Area */
    defineField({
      name: 'artistsHeading',
      title: 'Artists — Heading',
      type: 'string',
    }),
    defineField({
      name: 'artistsBody',
      title: 'Artists — Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'artistsImage',
      title: 'Artists — Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),

    /*"What We Do" Content area*/
    defineField({
      name: 'activitiesHeading',
      title: 'What We Do — Heading',
      type: 'string',
    }),
    defineField({
      name: 'activities',
      title: 'What We Do — Cards',
      type: 'array',
      of: [
        {
          name: 'activity',
          title: 'Activity',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),

    /*"The Paradise Project" Content Area */
    defineField({
      name: 'paradiseHeading',
      title: 'Paradise Project — Heading',
      type: 'string',
    }),
    defineField({
      name: 'paradiseBody',
      title: 'Paradise Project — Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'paradiseImage',
      title: 'Paradise Project — Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),
    defineField({
      name: 'paradiseSections',
      title: 'Paradise Project — Sections',
      type: 'array',
      of: [
        {
          name: 'paradiseSection',
          title: 'Paradise Project Section',
          type: 'object',
          fields: [
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({name: 'statement', title: 'Statement', type: 'text'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
            }),
            defineField({name: 'caption', title: 'Caption', type: 'text'}),
          ],
          preview: {
            select: {
              title: 'statement',
              body: 'body.0.children.0.text',
              subtitle: 'caption',
              media: 'image',
            },
            prepare({title, body, subtitle, media}) {
              return {
                title: title || body || 'Paradise Project Section',
                subtitle,
                media,
              }
            },
          },
        },
      ],
    }),
    /*Closing Content */
    defineField({
      name: 'closingText',
      title: 'Closing — Invitation',
      type: 'text',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Closing — Contact Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socialText',
      title: 'Closing — Social Introduction',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Closing — Social Links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
    /*"Support Us" Content Area*/
    defineField({
      name: 'supportHeading',
      title: 'Support — Heading',
      type: 'string',
    }),
    defineField({
      name: 'supportBody',
      title: 'Support — Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'supportImage',
      title: 'Support — Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),
    defineField({
      name: 'buttonText',
      title: 'Support — Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Support — Button Link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https'], allowRelative: true}),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'storyImage'},
  },
})
