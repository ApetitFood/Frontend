import { SimpleGrid, Spinner } from '@chakra-ui/react'
import { collection, query, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'
import { limit, orderBy, startAfter } from 'firebase/firestore'

const Feed = () => {
  const columns = [1, 2, 3]
  const [isLoading, setIsLoading] = useState(true)
  const [lastKey, setLastKey] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isRenderingComponents, setIsRenderingComponents] = useState(false)

  const getRecipes = async () => {
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

    data.forEach((doc) => {
      const recipeData = doc.data() as Recipe
      setRecipes((currentValues) => [
        ...currentValues,
        { ...recipeData, id: doc.id },
      ])
    })
    const docs = data.docs

    setHasMore(docs.length >= 6)
    setLastKey(docs.at(docs.length - 1)?.data().createdAt)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getRecipes()
  }, [])

  return (
    <div>
      {!isLoading ? (
        <InfiniteScroll
          dataLength={recipes.length}
          next={getRecipes}
          hasMore={hasMore}
          loader={isLoading ? <Spinner /> : null}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <SimpleGrid columns={columns} templateRows={'masonry'}>
            {recipes.map((item) => {
              return (
                <RecipeComponent key={item.id} recipe={item}></RecipeComponent>
              )
            })}
          </SimpleGrid>
        </InfiniteScroll>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Feed
