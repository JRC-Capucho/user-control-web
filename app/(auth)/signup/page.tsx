import { getMetadata } from '@/lib/utils'
import type React from 'react'
import Page from '.'

export async function generateMetadata() {
  return getMetadata('Register')
}

export default function SignIn() {
  return <Page />
}
