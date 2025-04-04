import { Image } from '../../../../Auth/auth.types.ts'

interface IImageProps {
  image: Image
}

const Img = (props: IImageProps) => {
  return (
    <img
      style={{ width: '100%', height: '100%', borderRadius: '15px' }}
      src={props.image.url}
      alt={props.image.name}
    />
  )
}

export default Img
