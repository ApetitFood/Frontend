import { Text, Box, AspectRatio, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'

const Recipe = ({
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
            {/* <Text>
                    {json.Description}
                </Text>
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

export default Recipe
