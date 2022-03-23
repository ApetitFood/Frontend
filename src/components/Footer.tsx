import { Flex , Box, useBreakpointValue } from '@chakra-ui/react'
import {Mobile} from './Menu';

function Footer(){
    const Height = useBreakpointValue({base: '40px', md: '0px' })
    return (
        
        <div>
            <Flex height={Height}  justifyContent={'space-around'}> 
                <Box position={'fixed'} bottom={'0px'}> 
                    <Mobile header={false} />
                 </Box>
            </Flex>
        </div>
             
    );
}

export default Footer;