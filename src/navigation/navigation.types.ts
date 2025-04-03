import { JSX } from 'react'
import { LoaderFunction } from 'react-router'

export interface IRoute {
  path: string
  element: JSX.Element
  loader: LoaderFunction
}
