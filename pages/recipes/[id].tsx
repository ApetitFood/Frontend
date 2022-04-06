import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  FieldPath,
} from '@firebase/firestore'
import { Spinner, Container } from '@chakra-ui/react'

//import type { User } from '@/types'
import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import IndividualRecipe from '@/components/recipe/IndividualRecipe'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
//  const [user, setUser] = useState<User>()
  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const getUser = async () => {
    //   const data = await getDoc(doc(firebaseDb, 'users', id as string))
    //   const userData = data.data()
    //   if (userData) {
    //     setUser({ ...userData, id } as User)
    //     return
    //   }

    //   router.push('/login')
    // }

    const getRecipes = async () => {
      const data = await getDocs(
        query(collection(firebaseDb, 'recipes'), where('__name__', '==', id))
      )
      data.forEach((doc) => {
        const recipeData = doc.data() as Recipe
        if (recipeData) {
            setRecipe({ ...recipeData, id } as Recipe)
            return
       }
       router.push('/')
      })
      console.log(recipe)
      setLoading(false)
    }

    //getUser()
    getRecipes()
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
