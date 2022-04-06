import {
  Text,
  SimpleGrid,
  Box,
  AspectRatio,
  Image,
  Spinner,
} from '@chakra-ui/react'
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { firebaseDb } from '@/firebase'
import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'

const FeedBox = ({
  recipe: { title, ingredients, photo },
}: {
  recipe: Recipe
}) => {
  const [recipePhoto, setRecipePhoto] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const retrieveRecipePhoto = async () => {
      const photoPath = photo || 'recipes/default.jpg'
      const recipePhoto = await downloadFile(photoPath)
      setRecipePhoto(recipePhoto)
      setIsLoading(false)
    }

    setIsLoading(true)
    retrieveRecipePhoto()
  }, [photo])
  return (
    <>
      {!isLoading ? (
        <Box
          height={'fit-content'}
          margin={'10px'}
          border='solid 1px rgba(0,0,0, .25)'
        >
          <Text className='text-container-align-middle'>
            <Text
              className='text-align-middle'
              borderBottom={'solid 1px rgba(0,0,0, .25);'}
            >
              {title}
            </Text>
          </Text>

          <AspectRatio ratio={4 / 3} maxH={400}>
            <Image
              src={recipePhoto}
              alt='Recipe'
              boxSize='100px'
              objectFit='cover'
            ></Image>
          </AspectRatio>
          <div className='feed-text-container'>
            {/* 
                <Text>
                    <Text margin={'0.5em 0'} fontWeight={'bold'}>Recipe steps:</Text>
                    <ol>
                        {steps.map((steps) => {
                            return <li>{steps}</li>
                        })}
                    </ol>
                </Text> */}
            <Text>
              <Text margin={'0.5em 0'} fontWeight={'bold'}>
                Macronutrients:
              </Text>
              {
                <ul>
                  {ingredients.map((ingredient, id) => {
                    return (
                      <li key={id}>
                        {ingredient.product} {ingredient.amount}{' '}
                        {ingredient.measurement}
                      </li>
                    )
                  })}
                </ul>
              }
            </Text>
          </div>
        </Box>
      ) : null}
    </>
  )
}

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
              return <FeedBox key={item.id} recipe={item}></FeedBox>
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
