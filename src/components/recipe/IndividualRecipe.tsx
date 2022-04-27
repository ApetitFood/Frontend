import React from 'react'
import {
  Image,
  Container,
  Text,
  Box,
  Checkbox,
  Spacer,
  Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'

const IndividualRecipe = ({ recipe }: { recipe: Recipe }) => {
  const [recipePhoto, setRecipePhoto] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('trigerred')
    const retrieveRecipePhoto = async () => {
      const photoPath = recipe.photo || 'recipes/default.jpg'
      const recipePhoto = await downloadFile(photoPath)
      setRecipePhoto(recipePhoto)
      setIsLoading(false)
    }

    retrieveRecipePhoto()
  }, [recipe])

  return (
    <>
      {!isLoading ? (
        <Container width={'100%'}>
          <Box pb={4} className='text-container-align-middle'>
            <Heading className='text-align-middle'>{recipe.title}</Heading>
          </Box>

          <Image
            width={'100%'}
            src={recipePhoto}
            alt='Recipe'
            objectFit='cover'
          ></Image>
          <Text py={5}>{recipe.description}</Text>
          <Box pb={2}>
            <Text pb={2} fontWeight={'bold'}>
              You will need the following ingredients:
            </Text>
            {
              <ul>
                {recipe.ingredients.map(
                  ({ product, amount, measurement }, id) => {
                    return (
                      <Box key={id} pb={2}>
                        <Checkbox
                          size='md'
                          colorScheme='green'
                          marginRight={'1em'}
                        >
                          {product} {amount} {measurement}
                        </Checkbox>
                      </Box>
                    )
                  }
                )}
              </ul>
            }
          </Box>
          <Box>
            <Text margin={'0.5em 0'} fontWeight={'bold'}>
              Follow these steps to make the recipe:
            </Text>
            <ol>
              {recipe.directions.map((direction, id) => {
                return (
                  <Box key={id} pb={3} pl={4}>
                    <li>{direction}</li>
                  </Box>
                )
              })}
            </ol>
          </Box>
        </Container>
      ) : null}
    </>
  )
}

export default IndividualRecipe
