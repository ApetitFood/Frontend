import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'

import { firebaseDb } from '@/firebase'

type GetRecipesQueryParams = {
  isInitialFetch: boolean
  lastKey?: string
}

export const buildGetRecipesQuery = ({
  isInitialFetch,
  lastKey,
}: GetRecipesQueryParams) => {
  return !isInitialFetch
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
}
