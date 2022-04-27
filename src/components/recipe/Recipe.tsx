import { Text, Box, AspectRatio, Image } from '@chakra-ui/react'
import { Recipe } from '@/types/recipe'
import Link from 'next/link'

const Recipe = ({ recipe }: { recipe: Recipe }) => {
  const pathName: string = `recipes/${recipe.id}`
  const isFullRecipe = recipe.directions && recipe.id && recipe.ownerId
  return (
    <Box
      height={'fit-content'}
      margin={'10px'}
      border='solid 1px rgba(0,0,0, .25)'
    >
      <Link
        href={{
          pathname: pathName,
          query: { indRecipe: isFullRecipe ? JSON.stringify(recipe) : '' },
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
          <AspectRatio ratio={4 / 3} maxH={400}>
            <Image
              src={recipe.photo}
              alt='Recipe'
              boxSize='100px'
              objectFit='cover'
            ></Image>
          </AspectRatio>
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
                    {ingredient.product} {ingredient.amount}{' '}
                    {ingredient.measurement}
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
