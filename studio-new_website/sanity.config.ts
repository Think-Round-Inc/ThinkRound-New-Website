import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {markdownSchema} from 'sanity-plugin-markdown'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'new_website',

  projectId: 's3cfqcyr',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
})
