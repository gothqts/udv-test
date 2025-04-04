export interface ScreenSize {
  extraLarge: boolean
  large: boolean
  medium: boolean
}

export interface AdaptiveContextProps {
  screenSize: ScreenSize
  setScreenSize: (size: ScreenSize) => void
  nameSize: string
}
