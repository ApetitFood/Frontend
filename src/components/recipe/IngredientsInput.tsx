import { MeasurementsEnum, RecipeIngredient } from '@/types/recipe'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Box, GridItem, IconButton, SimpleGrid } from '@chakra-ui/react'
import { FieldArray, useField } from 'formik'

import TextField from '@/components/form/TextField'
import CustomNumberField from '@/components/form/NumberField'
import SelectField from '@/components/form/SelectField'

const IngredientsInput = ({ label, isRequired, ...props }: any) => {
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
                columns={6}
                columnGap={1}
                rowGap={2}
                w='full'
                key={index}
                alignItems='center'
              >
                <GridItem colSpan={3}>
                  <TextField
                    name={`ingredients[${index}].product`}
                    placeholder='Please enter product'
                  ></TextField>
                </GridItem>
                <GridItem colSpan={2} display='flex' justifyContent='end'>
                  <CustomNumberField
                    name={`ingredients[${index}].amount`}
                  ></CustomNumberField>
                  <SelectField
                    name={`ingredients[${index}].measurement`}
                    values={Object.values(MeasurementsEnum)}
                  />
                </GridItem>
                <GridItem colSpan={1} display='flex' justifyContent='end'>
                  <IconButton
                    aria-label='Remove ingredient'
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
                aria-label='Add ingredient'
                variant='outline'
                colorScheme='green'
                border='none'
                icon={<PlusCircleOutlined />}
                onClick={() =>
                  push({
                    product: '',
                    amount: 100,
                    measurement: MeasurementsEnum.G,
                  })
                }
              />
            </Box>
          </SimpleGrid>
        )}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default IngredientsInput
