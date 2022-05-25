import { firebaseDb } from '@/firebase'
import { User } from '@/types'
import { Recipe } from '@/types/recipe'
import { downloadFile } from '@/utils'
import { SearchOutlined } from '@ant-design/icons'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useState } from 'react'

const Search = () => {
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [users, setUsers] = useState<User[]>([])
  const onFormSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setSearchedKeyword('')
    console.log(`Form was submited with input: ${searchedKeyword}`)
    const recipesRef = collection(firebaseDb, 'recipes')
    const data = await getDocs(
      query(
        recipesRef,
        where('description', '>=', searchedKeyword),
        where('description', '<=', searchedKeyword + '\uf8ff')
      )
    )
    const docs = data.docs
    console.log(data)
    await Promise.all(
      docs.map(async (doc) => {
        const recipeData = doc.data() as Recipe
        const photoPath = recipeData.photo || 'recipes/default.jpg'
        const recipePhoto = await downloadFile(photoPath)

        setRecipes((currentValues) => [
          ...currentValues,
          { ...recipeData, id: doc.id, photo: recipePhoto },
        ])
      })
    )
    setIsLoading(false)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Flex>
        <Input
          id='search'
          placeholder='Seach for user profiles or recipes...'
          onChange={(e) => setSearchedKeyword(e.target.value)}
          value={searchedKeyword}
        />
        <IconButton
          aria-label='Upload image'
          size='md'
          icon={<SearchOutlined />}
          type='submit'
        />
      </Flex>
    </form>
  )
}

export default Search
