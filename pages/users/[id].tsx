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
} from '@firebase/firestore'
import { Spinner, Container } from '@chakra-ui/react'

import type { User } from '@/types'
import { firebaseDb } from '@/firebase'
import UserProfile from '@/components/user/Profile'
import { Recipe } from '@/types/recipe'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<User>()
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(doc(firebaseDb, 'users', id as string))
      const userData = data.data()
      if (userData) {
        setUser({ ...userData, id } as User)
        return
      }

      router.push('/login')
    }

    const getRecipes = async () => {
      const data = await getDocs(
        query(collection(firebaseDb, 'recipes'), where('ownerId', '==', id))
      )
      data.forEach((doc) => {
        const recipeData = doc.data() as Recipe
        setUserRecipes((currentValues) => [
          ...currentValues,
          { ...recipeData, id: doc.id },
        ])
      })

      setLoading(false)
    }

    getUser()
    getRecipes()
  }, [id, router])

  return (
    <Container maxW='container.xl' pt={10} centerContent>
      {loading ? <Spinner /> : <UserProfile user={user!} />}
    </Container>
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
