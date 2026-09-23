import {defineArrayMember, defineField, defineType} from 'sanity'

/*
|--------------------------------------------------------------------------
| Reusable Portable Text editor
|--------------------------------------------------------------------------
|
| Every field that uses richTextField() will have its own editor box.
| Editors can choose headings, font sizes, font families, colors,
| bold, italic, underline, links, lists, and more.
|
*/

const richTextOf = [
  defineArrayMember({
    type: 'block',

    styles: [
      {title: 'Paragraph', value: 'normal'},
      {title: 'Large paragraph', value: 'large'},
      {title: 'Small paragraph', value: 'small'},
      {title: 'Display title', value: 'display'},
      {title: 'Heading 1', value: 'h1'},
      {title: 'Heading 2', value: 'h2'},
      {title: 'Heading 3', value: 'h3'},
      {title: 'Heading 4', value: 'h4'},
      {title: 'Centered paragraph', value: 'center'},
      {title: 'Centered heading', value: 'headingCenter'},
      {title: 'Quote', value: 'blockquote'},
    ],

    lists: [
      {title: 'Bullets', value: 'bullet'},
      {title: 'Numbers', value: 'number'},
    ],

    marks: {
      decorators: [
        {title: 'Bold', value: 'strong'},
        {title: 'Italic', value: 'em'},
        {title: 'Underline', value: 'underline'},
        {title: 'Strike', value: 'strike-through'},
        {title: 'Code', value: 'code'},
      ],

      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',

          fields: [
            defineField({
              name: 'href',
              type: 'url',
              title: 'URL',

              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),

            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in new tab',
              initialValue: true,
            }),
          ],
        },

        {
          name: 'textColor',
          type: 'object',
          title: 'Text color',

          fields: [
            defineField({
              name: 'hex',
              type: 'string',
              title: 'Hex color',
              description: 'Example: #363636 or #7c3aed',

              validation: (Rule) =>
                Rule.regex(
                  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
                  {
                    name: 'hex color',
                  },
                ),
            }),
          ],
        },

        {
          name: 'fontSize',
          type: 'object',
          title: 'Font size',

          fields: [
            defineField({
              name: 'size',
              type: 'string',
              title: 'Size',

              options: {
                list: [
                  {title: '12 px', value: '12px'},
                  {title: '14 px', value: '14px'},
                  {title: '16 px', value: '16px'},
                  {title: '18 px', value: '18px'},
                  {title: '20 px', value: '20px'},
                  {title: '24 px', value: '24px'},
                  {title: '30 px', value: '30px'},
                  {title: '36 px', value: '36px'},
                  {title: '48 px', value: '48px'},
                  {title: '64 px', value: '64px'},
                  {title: '80 px', value: '80px'},
                ],
              },
            }),
          ],
        },

        {
          name: 'fontFamily',
          type: 'object',
          title: 'Font family',

          fields: [
            defineField({
              name: 'family',
              type: 'string',
              title: 'Font',

              options: {
                list: [
                  {
                    title: 'League Spartan',
                    value: 'league-spartan',
                  },
                  {
                    title: 'Instrument Sans',
                    value: 'instrument-sans',
                  },
                  {
                    title: 'Arial',
                    value: 'Arial, sans-serif',
                  },
                  {
                    title: 'Georgia',
                    value: 'Georgia, serif',
                  },
                  {
                    title: 'Times New Roman',
                    value: 'Times New Roman, serif',
                  },
                ],
              },
            }),
          ],
        },
      ],
    },
  }),
]

/*
|--------------------------------------------------------------------------
| Rich text field helper
|--------------------------------------------------------------------------
*/

const richTextField = (
  name: string,
  title: string,
  description?: string,
) =>
  defineField({
    name,
    title,
    type: 'array',
    of: richTextOf,
    description,
  })

/*
|--------------------------------------------------------------------------
| Image field helper
|--------------------------------------------------------------------------
*/

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',

    options: {
      hotspot: true,
    },

    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
      }),

      richTextField(
        'caption',
        'Caption',
        'Optional formatted caption displayed below the image.',
      ),
    ],
  })

/*
|--------------------------------------------------------------------------
| Gallery helper
|--------------------------------------------------------------------------
*/

const galleryField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',

    of: [
      defineArrayMember({
        type: 'image',

        options: {
          hotspot: true,
        },

        fields: [
          defineField({
            name: 'alt',
            title: 'Alternative text',
            type: 'string',
          }),

          richTextField(
            'caption',
            'Caption',
            'Optional formatted caption displayed below this image.',
          ),
        ],
      }),
    ],

    options: {
      layout: 'grid',
    },
  })

/*
|--------------------------------------------------------------------------
| CMP document
|--------------------------------------------------------------------------
*/

export const childrenMuralProgram = defineType({
  name: 'childrenMuralProgram',
  title: "Children's Mural Program",
  type: 'document',

  groups: [
    {
      name: 'hero',
      title: 'Hero and booklet',
    },
    {
      name: 'history',
      title: 'History and HPS',
    },
    {
      name: 'news',
      title: 'Students, news and Heidi',
    },
    {
      name: 'outcomes',
      title: 'Program outcomes',
    },
    {
      name: 'galleries',
      title: 'Final gallery',
    },
  ],

  fields: [
    /*
    |--------------------------------------------------------------------------
    | Hero and booklet
    |--------------------------------------------------------------------------
    */

    richTextField(
      'pageTitle',
      'Page title',
      'The small title displayed above the main CMP heading.',
    ),

    richTextField(
      'mainHeading',
      'Main heading',
      'The large “The CMP” heading.',
    ),

    imageField(
      'heroImage',
      'Hero image',
    ),

    richTextField(
      'bookletIntroduction',
      'Booklet introduction',
    ),

    richTextField(
      'bookletButtonText',
      'Booklet button text',
      'Example: Download The CMP Booklet Here →',
    ),

    defineField({
      name: 'bookletUrl',
      title: 'Booklet URL',
      type: 'url',
    }),

    /*
    |--------------------------------------------------------------------------
    | History section
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'historySection',
      title: "Children's Mural Program & Hunters Point Shipyard",
      type: 'object',
      group: 'history',

      fields: [
        richTextField(
          'heading',
          'Section heading',
        ),

        richTextField(
          'content',
          'Section content',
        ),

        richTextField(
          'videoDescription',
          'Video description',
        ),

        defineField({
          name: 'videoUrl',
          title: 'YouTube video URL',
          type: 'url',
        }),

        richTextField(
          'galleryIntroduction',
          'Gallery introduction',
        ),

        galleryField(
          'gallery',
          'History gallery',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Student section
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'studentSection',
      title: 'CMP students section',
      type: 'object',
      group: 'news',

      fields: [
        imageField(
          'image',
          'Student image',
        ),

        richTextField(
          'content',
          'Student section content',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Shipyard news
    |--------------------------------------------------------------------------
    */

    richTextField(
      'shipyardNews',
      'Hunters Point Shipyard news',
    ),

    /*
    |--------------------------------------------------------------------------
    | Heidi video
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'heidiSection',
      title: "Heidi's video section",
      type: 'object',
      group: 'news',

      fields: [
        richTextField(
          'description',
          'Description',
        ),

        defineField({
          name: 'videoUrl',
          title: 'YouTube video URL',
          type: 'url',
        }),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Outcomes heading
    |--------------------------------------------------------------------------
    */

    richTextField(
      'outcomesHeading',
      'Outcomes heading',
    ),

    defineField({
      name: 'outcomesVideoUrl',
      title: 'Outcomes Video URL',
      type: 'url',
    }),

    /*
    |--------------------------------------------------------------------------
    | Murals
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'muralsSection',
      title: 'Murals',
      type: 'object',
      group: 'outcomes',

      fields: [
        richTextField(
          'heading',
          'Heading',
        ),

        richTextField(
          'content',
          'Content',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Stream of Consciousness
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'streamSection',
      title: 'Stream of Consciousness',
      type: 'object',
      group: 'outcomes',

      fields: [
        richTextField(
          'heading',
          'Heading',
        ),

        richTextField(
          'content',
          'Content',
        ),

        galleryField(
          'images',
          'STREAM images',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Final celebrations
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'finalCelebrations',
      title: 'Final Celebrations',
      type: 'object',
      group: 'outcomes',

      fields: [
        richTextField(
          'heading',
          'Heading',
        ),

        richTextField(
          'content',
          'Content',
        ),

        imageField(
          'image',
          'Celebration image',
        ),

        richTextField(
          'imageCaption',
          'Image caption',
        ),  

        richTextField(
          'caption',
          'Paragraph',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Essay anthologies
    |--------------------------------------------------------------------------
    */

    defineField({
      name: 'essayAnthologies',
      title: 'Essay Anthologies',
      type: 'object',
      group: 'outcomes',

      fields: [
        richTextField(
          'heading',
          'Heading',
        ),

        imageField(
          'image',
          'Essay anthology image',
        ),


        richTextField(
          'galleryHeading',
          'Gallery heading',
        ),

        galleryField(
          'awardsGallery',
          'Student essays, awards and commendations',
        ),
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Final gallery
    |--------------------------------------------------------------------------
    */

    richTextField(
      'finalGalleryDescription',
      'Final gallery description',
    ),

    galleryField(
      'finalGallery',
      'Final celebrations and murals gallery',
    ),
  ],

  preview: {
    prepare() {
      return {
        title: "Children's Mural Program",
      }
    },
  },
})

export default childrenMuralProgram