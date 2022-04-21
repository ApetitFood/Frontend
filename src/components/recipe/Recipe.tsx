import { Text, Box, AspectRatio, Image } from '@chakra-ui/react'

import { Recipe } from '@/types/recipe'

const Recipe = ({
  recipe: { title, ingredients, photo },
}: {
  recipe: Recipe
}) => (
  <Box
    height={'fit-content'}
    margin={'10px'}
    border='solid 1px rgba(0,0,0, .25)'
  >
    <Box className='text-container-align-middle'>
      <Text
        className='text-align-middle'
        borderBottom={'solid 1px rgba(0,0,0, .25);'}
      >
        {title}
      </Text>
    </Box>

    <AspectRatio ratio={4 / 3} maxH={400}>
      <Image src={photo} alt='Recipe' boxSize='100px' objectFit='cover'></Image>
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
      <Box>
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
      </Box>
    </div>
  </Box>
)

export default Recipe
