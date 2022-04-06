import React from 'react'
import { useRouter } from 'next/router'
import {
  Image,
  Container,
  Center,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Box,
  AspectRatio,
  Checkbox,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'



const IndividualRecipe = ({
  recipe,
}: {
  recipe: Recipe
}) => {

    const [recipePhoto, setRecipePhoto] = useState('')
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const retrieveRecipePhoto = async () => {
        const photoPath = recipe.photo || 'recipes/default.jpg'
        const recipePhoto = await downloadFile(photoPath)
        setRecipePhoto(recipePhoto)
        setIsLoading(false)
      }
  
      setIsLoading(true)
      retrieveRecipePhoto()
    }, [])

    

  return (
    <>{!isLoading ? (
    <Container width={'100%'}>
      <Box className='text-container-align-middle'>
        <Text
          className='text-align-middle'
         
        >
          {recipe.title}
        </Text>
      </Box>
     
        <Image 
              width={'100%'}
              src={recipePhoto}
              alt='Recipe'
              objectFit='cover'
            >

        </Image>
      <Spacer p={2}/>
      <Text>
        {recipe.description}
      </Text>
      <Spacer p={2}/>
      <Text>
          <Text margin={'0.5em 0'} fontWeight={'bold'}>Recipe steps:</Text>
          <ol>
            {recipe.directions.map((direction, id) =>{
              return (
                <Box paddingBottom={'0.5em'}>
                <li key={id}>
                  {direction}
                </li>
                </Box>
              )
            })}
          </ol>
      </Text>
      <Spacer p={2}/>
      <Box>
        <Text margin={'0.5em 0'} fontWeight={'bold'}>
          Ingredients:
        </Text>
        {
          <ul>
            {recipe.ingredients.map((ingredient, id) => {
              return (
                  <Box paddingBottom={'0.5em'}>
                    <Checkbox key={id} size='md' colorScheme='green' marginRight={'1em'}>
                    {ingredient.product} {ingredient.amount}{' '}
                      {ingredient.measurement}
                    </Checkbox>
                  </Box>
              )
            })}
          </ul>
        }
      </Box>
      <Spacer p={2}/>
    </Container>) : null}
  </>
  )
}

export default IndividualRecipe