import { Flex,Spacer , Box } from '@chakra-ui/react'
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import {Mobile, ButtonLink} from './Menu';


function Header(){
    const userId = 125;
    return (
        <div>
            <Flex>
                <Box>
                <ButtonLink link="/" name={<HomeOutlined/>}/>
                </Box>
                <Spacer/>
                <Box> 
                    <Mobile header={true} />
                    <ButtonLink link={'/users/'+userId} name={<UserOutlined/>}/>
                 </Box>
            </Flex>
        </div>
             
    );
}

export default Header;