import {Grid, Text, AspectRatio, SimpleGrid, GridItem, Box, useBreakpointValue, Image, StatHelpText } from '@chakra-ui/react'
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
  } from '@firebase/firestore'
import RecipesMock from '../mocks/recipes'
import { firebaseDb } from '@/firebase'
import { Recipe, RecipeIngredient } from '@/types/recipe'
import { useEffect, useState } from 'react'


function FeedBox(data : Recipe){
    
    //const macro = JSON.parse(JSON.stringify(json.Macronutrients))
    //const steps = JSON.parse(JSON.stringify(json.description))
    return(
        <Box height={'fit-content'} margin={'10px'} border="solid 1px rgba(0,0,0, .25)">
            <Text className='text-container-align-middle'>
                <Text className='text-align-middle' borderBottom={"solid 1px rgba(0,0,0, .25);"}>
                    {data.title}
                </Text>
            </Text>
            
            {/* <AspectRatio ratio={3 / 3}>
                <Image
                    
                    src={''+ data.Image}>

                </Image>
            </AspectRatio> */}
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
                    <Text margin={'0.5em 0'}  fontWeight={'bold'}>Macronutrients:</Text>
                    { <ul>
                        {data.ingredients.map((ingredient) => {return <li>{ingredient.product} {ingredient.amount} {ingredient.measurement}</li>})}
                    </ul>}
                    
                </Text>
            </div>
            
        </Box>

    );
}

function Feed(){
    const columns = [1, 2, 3]
    const [feedRecipes, setFeedRecipes] = useState<Recipe[]>([])
    useEffect(() => {    
    const getRecipes = async () => {
        const data = await getDocs(query(
          collection(firebaseDb, 'recipes')
        ))
        data.forEach((doc) => {
            const recipeData = doc.data() as Recipe
          setFeedRecipes((currentValues) => [
            ...currentValues,
            { ...recipeData, id: doc.id },
          ])
        })
    }
    getRecipes()
},[])


    return (
        <div>
            <SimpleGrid  columns={columns} templateRows={'masonry'}>
                {feedRecipes.map((item) =>  { return <FeedBox {...item as Recipe}></FeedBox>})}
            </SimpleGrid >
        </div>
             
    );
}

export default Feed;