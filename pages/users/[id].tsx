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
import { Spinner } from '@chakra-ui/react'

import type { User } from '@/types'
import { firebaseDb } from '@/firebase'
import UserProfile from '@/components/user/Profile'
import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<User | null>(null)
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

      router.replace('/login')
    }

    const getRecipes = async () => {
      const data = await getDocs(
        query(collection(firebaseDb, 'recipes'), where('ownerId', '==', id))
      )
      const docs = data.docs
      await Promise.all(
        docs.map(async (doc) => {
          const recipeData = doc.data() as Recipe
          const photoPath = recipeData.photo || 'recipes/default.jpg'
          const recipePhoto = await downloadFile(photoPath)

          setUserRecipes((currentValues) => [
            ...currentValues,
            { ...recipeData, id: doc.id, photo: recipePhoto },
          ])
        })
      )

      setLoading(false)
    }

    getUser()
    getRecipes()
  }, [id, router])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <UserProfile user={user!} userRecipes={userRecipes} />
      )}
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
