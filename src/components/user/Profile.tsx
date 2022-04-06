import React from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Center,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'

import { User } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { Recipe } from '@/types/recipe'
import RecipeComponent from '@/components/recipe/Recipe'

import Avatar from './Avatar'

const UserProfile = ({
  user,
  userRecipes,
}: {
  user: User
  userRecipes: Recipe[]
}) => {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async (event: any) => {
    event.preventDefault()
    await logout()

    router.push('/login')
  }

  return (
    <Container mt={4}>
      <Center>
        <VStack>
          <Heading>{`${user.firstName} ${user.lastName}`}</Heading>
          <Text>{`Mode: ${user.mode}`}</Text>
          <Avatar user={user} />
          <Button variant='alarm' width='full' onClick={handleLogout}>
            Log out
          </Button>
        </VStack>
      </Center>
      <Divider p={10} />
      <SimpleGrid columns={[1, 2, 3]} templateRows={'masonry'}>
        {userRecipes.map((recipe) => {
          return (
            <RecipeComponent key={recipe.id} recipe={recipe}></RecipeComponent>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

export default UserProfile
