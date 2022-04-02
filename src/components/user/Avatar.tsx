import { createRef, useEffect, useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { VStack, Image, IconButton, Input } from '@chakra-ui/react'

import { downloadFile, uploadFile } from '@/utils'
import { User } from '@/types'
import { doc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '@/firebase'

const Avatar = ({ user }: { user: User }) => {
  const [avatar, setAvatar] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const fileRef = createRef<HTMLInputElement>()
  const userRef = doc(firebaseDb, 'users', user.id)

  useEffect(() => {
    const retrieveUserAvatar = async () => {
      const avatarPath = user.avatar || 'avatars/default.jpg'
      const avatar = await downloadFile(avatarPath)
      setAvatar(avatar)
      setIsLoading(false)
    }

    setIsLoading(true)
    retrieveUserAvatar()
  }, [user])

  return (
    <>
      {!isLoading ? (
        <VStack
          w='full'
          h='full'
          pt={10}
          pb={5}
          alignItems='center'
          justify='center'
        >
          <Image
            src={avatar}
            alt='Avatar'
            borderRadius='full'
            boxSize='150px'
            objectFit='cover'
          />
          Choose Avatar
          <Input
            name='avatar'
            accept='image/*'
            hidden
            ref={fileRef}
            type='file'
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                uploadFile({
                  path: `avatars/${user.id}`,
                  file: e.target.files[0],
                })
                updateDoc(userRef, {
                  avatar: `avatars/${user.id}`,
                })
              }
            }}
          />
          <IconButton
            aria-label='Upload avatar'
            size='lg'
            icon={<CloudUploadOutlined />}
            w='full'
            onClick={() => fileRef.current?.click()}
          ></IconButton>
        </VStack>
      ) : null}
    </>
  )
}

export default Avatar
