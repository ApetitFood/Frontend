import {Grid, Text, AspectRatio, SimpleGrid, GridItem, Box, useBreakpointValue, Image } from '@chakra-ui/react'
import RecipesMock from '../mocks/recipes'

function FeedBox({json}){
    const macro = JSON.parse(JSON.stringify(json.Macronutrients))
    const steps = JSON.parse(JSON.stringify(json.RecipeSteps))
    return(
        <Box height={'fit-content'} margin={'10px'} border="solid 1px rgba(0,0,0, .25)">
            <Text className='text-container-align-middle'>
                <Text className='text-align-middle' borderBottom={"solid 1px rgba(0,0,0, .25);"}>
                    {json.Name}
                </Text>
            </Text>
            
            <AspectRatio ratio={3 / 3}>
                <Image
                    
                    src={''+ json.Image}>

                </Image>
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
                    <Text margin={'0.5em 0'}  fontWeight={'bold'}>Macronutrients:</Text>
                    <ul>
                        {macro.map((macro) => {
                            return <li>{macro}</li>
                        })}
                    </ul>
                    
                </Text>
            </div>
            
        </Box>

    );
}

function Feed(){
    const columns = [1, 2, 3]
    return (
        <div>
            <SimpleGrid  columns={columns} templateRows={'masonry'}>
            {RecipesMock.map((RecipesMock) => {
                            return <FeedBox json={RecipesMock}></FeedBox>
                        })}

            </SimpleGrid >
        </div>
             
    );
}

export default Feed;