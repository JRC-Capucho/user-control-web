import InitialPage from '@/components/initial/initial-page'
import { getMetadata } from '@/lib/utils'

export async function generateMetadata() {
  return getMetadata('User Control')
}

export default function Home() {
  return <InitialPage />
}
