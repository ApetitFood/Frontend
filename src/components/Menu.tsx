import {
  useMediaQuery,
  IconButton,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  AccountBookFilled,
  HeartOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { JSXElementConstructor, ReactElement } from 'react'

export function Mobile(props: { header: boolean }) {
  const [isMobile] = useMediaQuery('(min-width: 768px)')
  return (
    <span>
      {(props.header ? isMobile : !isMobile) ? (
        <>
          <ButtonLink link='/' name={<SearchOutlined />} />
          <ButtonLink link='/' name={<HeartOutlined />} />
          <ButtonLink link='/' name={<AccountBookFilled />} />
        </>
      ) : (
        <span style={{ display: 'none' }}></span>
      )}
    </span>
  )
}
export function ButtonLink(props: {
  link: string | undefined
  name: ReactElement<any, string | JSXElementConstructor<any>>
}) {
  const iconSize = useBreakpointValue({ base: '24px', lg: '28px' })
  return (
    <Link href={props.link}>
      <IconButton
        aria-label=''
        icon={props.name}
        variant='unstyled'
        fontSize={iconSize}
      ></IconButton>
    </Link>
  )
}
