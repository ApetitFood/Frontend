import { IconButton, Link, useBreakpointValue } from '@chakra-ui/react'
import {
  AccountBookFilled,
  CompassOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { JSXElementConstructor, ReactElement } from 'react'

export const Menu = ({ showMenu }: { showMenu: boolean }) => {
  return (
    <span>
      {showMenu ? (
        <>
          <ButtonLink link='/explore' name={<CompassOutlined />} />
          <ButtonLink link='/' name={<HeartOutlined />} />
          <ButtonLink link='/' name={<AccountBookFilled />} />
        </>
      ) : null}
    </span>
  )
}
export const ButtonLink = ({
  link,
  name,
}: {
  link: string | undefined
  name: ReactElement<any, string | JSXElementConstructor<any>>
}) => {
  const iconSize = useBreakpointValue({ base: '24px', lg: '28px' })
  return (
    <Link href={link}>
      <IconButton
        aria-label=''
        icon={name}
        variant='unstyled'
        fontSize={iconSize}
      ></IconButton>
    </Link>
  )
}
