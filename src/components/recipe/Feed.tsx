import { SimpleGrid, Spinner } from '@chakra-ui/react'
import { getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'
import { buildGetRecipesQuery, downloadFile } from '@/utils'

const Feed = () => {
  const columns = [1, 1, 2, 2, 3, 3]
  const [isLoading, setIsLoading] = useState(true)
  const [lastKey, setLastKey] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const handleNext = () => {
    if (isFetching) return

    getRecipes()
  }

  const getRecipes = async () => {
    setIsFetching(true)
    const fetchQuery = buildGetRecipesQuery({
      lastKey,
      isInitialFetch: !recipes.length,
    })

    const data = await getDocs(fetchQuery)
    const docs = data.docs
    await Promise.all(
      docs.map(async (doc) => {
        const recipeData = doc.data() as Recipe
        const photoPath = recipeData.photo || 'recipes/default.jpg'
        const recipePhoto = await downloadFile(photoPath)

        setRecipes((currentValues) => [
          ...currentValues,
          { ...recipeData, id: doc.id, photo: recipePhoto },
        ])
      })
    )

    setHasMore(docs.length >= 6)
    setLastKey(docs.at(docs.length - 1)?.data().createdAt)
    setIsLoading(false)
    setIsFetching(false)
  }

  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <div>
      {!isLoading ? (
        <InfiniteScroll
          dataLength={recipes.length}
          next={handleNext}
          hasMore={hasMore}
          loader={hasMore ? <Spinner /> : null}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen all of the recipes</b>
            </p>
          }
        >
          <SimpleGrid columns={columns} templateRows={'masonry'}>
            {recipes.map((recipe) => (
              <RecipeComponent
                key={recipe.id}
                recipe={recipe}
              ></RecipeComponent>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Feed
