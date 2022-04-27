import { connectStateResults } from 'react-instantsearch-dom'

import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'

export const Hits = ({ searchState, searchResults }: any) => {
  const validQuery = searchState?.query?.length >= 3
  console.log(searchResults?.hits)
  return (
    <>
      {searchResults?.hits?.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits?.length > 0 && validQuery && (
        <ol>
          {searchResults?.hits.map((recipe: Recipe) => (
            <RecipeComponent key={recipe.id} recipe={recipe}></RecipeComponent>
          ))}
        </ol>
      )}
    </>
  )
}

export default connectStateResults(Hits)
