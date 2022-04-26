import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  doc,
  getDoc,
} from '@firebase/firestore'
import { Spinner } from '@chakra-ui/react'

import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import IndividualRecipe from '@/components/recipe/IndividualRecipe'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRecipe = async () => {
      const data = await getDoc(doc(firebaseDb, 'recipes', id as string)) 
      const recipeData = data.data()
         if (recipeData) {
           setRecipe({ ...recipeData, id } as Recipe)
           setLoading(false)
           return
         }
    }
    getRecipe()
  }, [id, router])

  return (
    <>

      {loading ? <Spinner /> : <IndividualRecipe recipe={recipe!} />}
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default User
