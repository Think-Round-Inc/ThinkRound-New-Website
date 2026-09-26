import type {StructureResolver} from 'sanity/structure'

const groupedDocumentTypes = [
  'homePageBuilder',

  // About
  'boardMember',
  'aboutUs',
  'post',
  'contactUs',
  'partnerCurrent',
  'partnerPast',

  // Donate
  'donatePage',

  // Programs
  'keep',
  'streamOfConsciousness',
  'iapPage',
  'classes',
  'familyArtsProgram',
  'turningTheTide',
  'childrenMuralProgram',

  // Think Round Fine Arts
  'currentExhibition',
  'pastExhibition',
  'virtualExhibitions3D',

  // Center for the Human Family
  'paradiseProject',

  // Blogs
  'blogs',
]

export const structure: StructureResolver = (S) => {
  /**
   * Creates a clickable document-type entry such as:
   *
   * About > Our Board
   * Programs > Classes at Think Round
   */
  const documentListItem = (schemaType: string, title: string) =>
    S.listItem()
      .title(title)
      .schemaType(schemaType)
      .child(S.documentTypeList(schemaType).title(title))

  /**
   * Creates a folder-like navigation item.
   */
  const folder = (title: string, items: ReturnType<typeof documentListItem>[]) =>
    S.listItem().title(title).child(S.list().title(title).items(items))

  const folders = [
    folder('Home', [
      documentListItem('homePageBuilder', 'Homepage'),
    ]),

    folder('About', [
      documentListItem('boardMember', 'Our Board'),
    
      folder('About Us', [
        documentListItem('aboutUs', 'About Us'),
        documentListItem('partnerCurrent', 'Current Partners'),
        documentListItem('partnerPast', 'Past Partners'),
    ]),
      documentListItem('post', 'Press'),
      documentListItem('contactUs', 'Contact Us'),
    ]),

    folder('Donate', [
      documentListItem('donatePage', 'Donate Page'),
    ]),

    folder('Programs', [
      documentListItem('keep', 'KEEP (Kids Environmental Education Program)'),
      documentListItem('streamOfConsciousness', 'Stream of Consciousness'),
      documentListItem('iapPage', 'Intergenerational After School Program'),
      documentListItem('classes', 'Classes at Think Round'),
      documentListItem('familyArtsProgram', 'Family Arts Program'),
      documentListItem('turningTheTide', 'Turning the Tide of Trauma'),
      documentListItem('childrenMuralProgram', "Children's Mural Program"),
    ]),

    folder('Think Round Fine Arts', [
      documentListItem('virtualExhibitions3D', 'Virtual Art Exhibitions'),
      documentListItem('currentExhibition', 'Current & Upcoming Exhibitions'),
      documentListItem('pastExhibition', 'Past Exhibitions'),
    ]),

    folder('Center for the Human Family', [
      documentListItem('paradiseProject', 'Paradise Project'),
    ]),

    folder('Blogs', [
      documentListItem('blogs', 'Blogs'),
    ]),
  ]

  /**
   * Any future schema that has not yet been assigned to a folder remains
   * accessible through "Other Content".
   *
   * This prevents a newly created schema from disappearing from the Studio UI.
   */
  const ungroupedDocumentTypes = S.documentTypeListItems().filter(
    (item) => !groupedDocumentTypes.includes(item.getId() as string),
  )

  return S.list()
    .title('Website Content')
    .items([
      ...folders,

      ...(ungroupedDocumentTypes.length > 0
        ? [
            S.listItem()
              .title('Other Content')
              .child(
                S.list()
                  .title('Other Content')
                  .items(ungroupedDocumentTypes),
              ),
          ]
        : []),
    ])
}