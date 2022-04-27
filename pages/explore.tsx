import Search from '@/components/search/Search'
import type { NextPage } from 'next'

const Explore: NextPage = () => {
  return <Search />
}

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Explore
