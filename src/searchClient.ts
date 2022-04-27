import algoliasearch from 'algoliasearch'

export const searchClient = algoliasearch(
  process.env.ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

export const searchIndex = searchClient.initIndex('apetit')
