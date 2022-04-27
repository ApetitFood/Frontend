import React, { ChangeEvent, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import {
  Button,
  SimpleGrid,
  GridItem,
  Alert,
  AlertIcon,
  VStack,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'

import TextField from '@/components/form/TextField'
import TextAreaField from '@/components/form/TextAreaField'
import { MeasurementsEnum } from '@/types/recipe'
import { firebaseDb } from '@/firebase'
import { useAuth } from '@/context/AuthContext'
import PhotoField from '@/components/form/PhotoInput'
import { uploadFile } from '@/utils'

import IngredientsInput from './IngredientsInput'
import DirectionInput from './DirectionInput'
import { searchIndex } from '@/searchClient'

const AddRecipeForm = () => {
  const { onClose } = useDisclosure()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipePhoto, setRecipePhoto] = useState('')

  const { currentUser } = useAuth()

  const onRecipePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile({
        path: `recipes/${e.target.files[0].name}`,
        file: e.target.files[0],
      })
      setRecipePhoto(`recipes/${e.target.files[0].name}`)
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        ingredients: [
          { product: '', amount: 100, measurement: MeasurementsEnum.G },
        ],
        directions: [''],
      }}
      validationSchema={yup.object({
        title: yup.string().trim().required('Title is required'),
        ingredients: yup
          .array()
          .of(
            yup.object({
              product: yup.string(),
              amount: yup.number(),
              measurement: yup.string(),
            })
          )
          .required('Recipe must contain products')
          .min(2, 'Recipe must consist of at least 2 products'),
        directions: yup
          .array(yup.string())
          .required('Recipe must contain directions')
          .min(2, 'Recipe must contain at least 2 steps'),
        description: yup.string().trim(),
      })}
      onSubmit={async ({ title, description, ingredients, directions }) => {
        try {
          setError('')
          setLoading(true)

          const recipe = {
            title,
            description,
            ingredients,
            directions,
            ownerId: currentUser!.uid,
            photo: recipePhoto,
            createdAt: Timestamp.now(),
          }
          const response = await addDoc(
            collection(firebaseDb, 'recipes'),
            recipe
          )
          // await searchIndex.saveObject({ ...recipe, objectID: response.id })
        } catch (error) {
          console.warn(error)
          setError('Failed to post a new recipe. Please try again later')
        }

        setLoading(false)
        onClose()
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
            <GridItem colSpan={2}>
              <TextField
                name='title'
                label='Title'
                placeholder='Please enter title'
                isRequired={true}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <TextAreaField
                name='description'
                label='Description'
                placeholder='Please enter description'
              />
            </GridItem>
            <GridItem colSpan={2}>
              <IngredientsInput
                name='ingredients'
                label='Ingredients'
                isRequired={true}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <DirectionInput
                name='directions'
                label='Directions'
                isRequired={true}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <VStack>
                <Heading size={'md'}>Upload photo</Heading>
                <PhotoField name={'photo'} onChange={onRecipePhotoUpload} />
              </VStack>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                isLoading={loading}
                variant='primary'
                width='full'
                mt={4}
                type='submit'
              >
                Create
              </Button>
            </GridItem>
            {error && (
              <Alert status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )}
          </SimpleGrid>
        </form>
      )}
    </Formik>
  )
}

export default AddRecipeForm
