import { RecipeIngredient } from '@/types/recipe'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Box, GridItem, IconButton, SimpleGrid } from '@chakra-ui/react'
import { FieldArray, useField } from 'formik'

import TextAreaField from '@/components/form/TextAreaField'

const DirectionInput = ({ label, isRequired, ...props }: any) => {
  const [field, meta] = useField(props)
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={isRequired}
    >
      <FormLabel>{label}</FormLabel>
      <FieldArray
        {...field}
        {...props}
        render={({ push, remove }) => (
          <SimpleGrid>
            {field.value.map((_: RecipeIngredient, index: number) => (
              <SimpleGrid
                columns={14}
                columnGap={1}
                rowGap={2}
                w='full'
                key={index}
                alignItems='center'
              >
                <GridItem colSpan={1}>{index + 1} .</GridItem>
                <GridItem colSpan={12}>
                  <TextAreaField
                    name={`directions[${index}]`}
                    placeholder='Please enter product'
                  ></TextAreaField>
                </GridItem>
                <GridItem colSpan={1} display='flex' justifyContent='end'>
                  <IconButton
                    aria-label='Remove step'
                    variant='outline'
                    colorScheme='red'
                    border='none'
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(index)}
                  />
                </GridItem>
              </SimpleGrid>
            ))}
            <Box display='flex' justifyContent='end'>
              <IconButton
                aria-label='Add step'
                variant='outline'
                colorScheme='green'
                border='none'
                icon={<PlusCircleOutlined />}
                onClick={() => push('')}
              />
            </Box>
          </SimpleGrid>
        )}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default DirectionInput
