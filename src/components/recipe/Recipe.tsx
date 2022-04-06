import { Text, Box, AspectRatio, Image, Link } from '@chakra-ui/react'

import { Recipe } from '@/types/recipe'
//import Link from 'next/link'

const Recipe = ({
  recipe: { title, ingredients, photo, id },
}: {
  recipe: Recipe
}) => (
  <Box
    height={'fit-content'}
    margin={'10px'}
    border='solid 1px rgba(0,0,0, .25)'
  >
  <Link href={`recipes/${id}`}>
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
    </Link>
    <div className='feed-text-container'>
      
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
