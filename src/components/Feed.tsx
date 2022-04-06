import { SimpleGrid } from '@chakra-ui/react'
import { collection, query, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'

const Feed = () => {
  const columns = [1, 2, 3]
  const [isLoading, setIsLoading] = useState(true)
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(query(collection(firebaseDb, 'recipes')))
      data.forEach((doc) => {
        const recipeData = doc.data() as Recipe
        setRecipes((currentValues) => [
          ...currentValues,
          { ...recipeData, id: doc.id },
        ])
      })

      setIsLoading(false)
    }

    setIsLoading(true)
    getRecipes()
  }, [])

  return (
    <>
      {!isLoading ? (
        <SimpleGrid columns={columns} templateRows={'masonry'}>
          {recipes.map((item) => {
            return (
              <RecipeComponent key={item.id} recipe={item}></RecipeComponent>
            )
          })}
        </SimpleGrid>
      ) : null}
    </>
  )
}

export default Feed
