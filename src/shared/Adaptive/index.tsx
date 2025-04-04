import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { AdaptiveContextProps, ScreenSize } from './adaptive.types.ts'

export const AdaptiveContext = createContext<AdaptiveContextProps | null>(null)

const AdaptiveProvider = (props: PropsWithChildren) => {
  const [nameSize, setNameSize] = useState<string>('large')
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    extraLarge: false,
    large: true,
    medium: false,
  })

  const handleResize = useCallback(() => {
    const width = window.innerWidth
    const sizes = {
      extraLarge: width >= 1400,
      large: width >= 992 && width < 1400,
      medium: width < 992,
    }
    setScreenSize(sizes)
    setNameSize(
      Object.keys(sizes).find((key) => sizes[key as keyof ScreenSize]) || 'large'
    )
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <AdaptiveContext.Provider value={{ screenSize, setScreenSize, nameSize }}>
      {props.children}
    </AdaptiveContext.Provider>
  )
}

export default AdaptiveProvider
