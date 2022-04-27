import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { Spinner } from '@chakra-ui/react'

import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import IndividualRecipe from '@/components/recipe/IndividualRecipe'

const Recipe: NextPage = () => {
  const router = useRouter()
  const { indRecipe, id } = router.query
  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)
  const isFullRecipe =
    (indRecipe as any)?.directions && (indRecipe as any)?.ownerId

  useEffect(() => {
    const getRecipe = async () => {
      if (!indRecipe || !isFullRecipe) {
        const data = await getDoc(doc(firebaseDb, 'recipes', id as string))
        const recipeData = data.data()
        if (recipeData) {
          setRecipe({ ...recipeData, id } as Recipe)
          setLoading(false)
          return
        }
      } else {
        setRecipe(JSON.parse(indRecipe!.toString()) as Recipe)
        setLoading(false)
      }
    }
    getRecipe()
  }, [id, indRecipe, router])

  return <>{loading ? <Spinner /> : <IndividualRecipe recipe={recipe!} />}</>
}

export async function getServerSideProps() {
  return {
    props: {
      protected: false,
    },
  }
}

export default Recipe
