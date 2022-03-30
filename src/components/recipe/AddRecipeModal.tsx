import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

import AddRecipeForm from './AddRecipeForm'

const AddRecipeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Create new recipe</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post new recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} px={10}>
            <AddRecipeForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddRecipeModal
