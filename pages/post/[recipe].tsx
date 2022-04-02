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
import UserProfile from '@/components/user/profile'
import { Recipe } from '@/types/recipe'

const Recipe: NextPage = () =>{
    const router = useRouter()
    const { id } = router.query
    return(
        <Container>

        </Container>
    )
}

export default Recipe