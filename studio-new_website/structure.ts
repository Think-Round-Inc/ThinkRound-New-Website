import type {StructureResolver} from 'sanity/structure'

//Put volunteerSubmission and subscribeSubmission schema types in the beginning of the Content Lake
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Volunteer Submissions')
        .schemaType('volunteerSubmission')
        .child(S.documentTypeList('volunteerSubmission')),
      S.listItem()
        .title('Subscribe Submissions')
        .schemaType('subscribeSubmission')
        .child(S.documentTypeList('subscribeSubmission')),
      ...S.documentTypeListItems().filter(
        (item) => !['volunteerSubmission', 'subscribeSubmission'].includes(item.getId() as string),
      ),
    ])
