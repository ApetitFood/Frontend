import { Text, Box, AspectRatio, Image, IconButton } from '@chakra-ui/react'
import { Recipe } from '@/types/recipe'
import Link from 'next/link'
import { HeartOutlined } from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection } from 'firebase/firestore'
import { firebaseDb } from '@/firebase'

const Recipe = ({ recipe }: { recipe: Recipe }) => {
  const pathName: string = `recipes/${recipe.id}`
  const { currentUser } = useAuth()
  const likeRecipe = async (e: any) => {
    e.preventDefault()
    await addDoc(collection(firebaseDb, 'likes'), {
      recipeId: recipe.id,
      userId: currentUser?.uid,
    })
  }
  return (
    <Box
      height={'fit-content'}
      margin={'10px'}
      border='solid 1px rgba(0,0,0, .25)'
    >
      <Link
        href={{
          pathname: pathName,
          query: { indRecipe: JSON.stringify(recipe) },
        }}
        passHref
        as={pathName}
      >
        <Box>
          <Box className='text-container-align-middle'>
            <Text
              className='text-align-middle'
              borderBottom={'solid 1px rgba(0,0,0, .25);'}
            >
              {recipe.title}
            </Text>
          </Box>
          <Box position='relative'>
            <AspectRatio ratio={4 / 3} maxH={400}>
              <Image
                src={recipe.photo}
                alt='Recipe'
                boxSize='100px'
                objectFit='cover'
              ></Image>
            </AspectRatio>
            <IconButton
              aria-label='LikeRecipe'
              variant='solid'
              colorScheme='red'
              border='none'
              size='lg'
              icon={<HeartOutlined />}
              onClick={likeRecipe}
              pos='absolute'
              top={220}
              left={310}
              _focus={{ color: 'red', backgroundColor: 'green' }}
              _pressed={{ color: 'red', backgroundColor: 'green' }}
              _visited={{ color: 'red', backgroundColor: 'green' }}
            />
          </Box>
        </Box>
      </Link>
      <div className='feed-text-container'>
        <Box>
          <Text margin={'0.5em 0'} fontWeight={'bold'}>
            Ingredients:
          </Text>
          {
            <ul>
              {recipe.ingredients.map((ingredient, id) => {
                return (
                  <li key={id}>
                    {typeof ingredient === 'string'
                      ? ingredient
                      : `${ingredient.product} ${ingredient.amount} ${ingredient.measurement}`}
                  </li>
                )
              })}
            </ul>
          }
        </Box>
      </div>
    </Box>
  )
}

export default Recipe
