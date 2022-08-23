import { RouterContext } from 'next/dist/shared/lib/router-context'
import { theme } from '../src/styles/theme'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import * as nextImage from 'next/image'

// This is needed to use next/image
/* eslint-disable */
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />
})

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  chakra: {
    theme,
  },
}
