import { SimpleGrid, Spinner } from '@chakra-ui/react'
import { collection, query, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { limit, orderBy, startAfter } from 'firebase/firestore'

import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'
import { downloadFile } from '@/utils'

const Feed = () => {
  const columns = [1, 2, 3]
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
    console.log('being called')
    setIsFetching(true)
    const fetchQuery = recipes.length
      ? query(
          collection(firebaseDb, 'recipes'),
          orderBy('createdAt', 'desc'),
          startAfter(lastKey),
          limit(6)
        )
      : query(
          collection(firebaseDb, 'recipes'),
          orderBy('createdAt', 'desc'),
          limit(6)
        )

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
            {recipes.map((item) => (
              <RecipeComponent key={item.id} recipe={item}></RecipeComponent>
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
