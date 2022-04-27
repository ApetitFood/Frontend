import { InstantSearch, SearchBox } from 'react-instantsearch-dom'
import { searchClient } from '@/searchClient'

import CustomHits from './CustomHits'

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='apetit'>
      <SearchBox />
      <CustomHits />
    </InstantSearch>
  )
}

export default Search
