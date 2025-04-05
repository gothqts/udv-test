import { ChangeEvent, ReactNode } from 'react'
import { fileToBase64 } from '../../../utils/formatToBase64.ts'
import { Image } from '../../../screens/Auth/auth.types.ts'
import styles from './fileInput.module.css'

interface IProps {
  name: string
  onChange: (value: Image | Image[], name: string) => void
  file?: Image
  files?: Image[]
  multiple?: boolean
  img: ReactNode
  accept: string
}

const FileInput = (props: IProps) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    if (props.multiple) {
      const files = Array.from(e.target.files)
      const convertedFiles = await Promise.all(
        files.map(async (file) => ({
          url: await fileToBase64(file),
          name: file.name,
          type: file.type,
        }))
      )
      props.onChange(convertedFiles, props.name)
    } else {
      const file = e.target.files[0]
      const base64 = await fileToBase64(file)
      props.onChange(
        {
          url: base64,
          name: file.name,
          type: file.type,
        },
        props.name
      )
    }
  }

  return (
    <div className={styles.input_wrapper}>
      {props.files?.length > 0 ? (
        <span>Files uploaded: {props.files?.length}</span>
      ) : null}
      <label htmlFor='file' className={styles.btn}>
        {props.img}
      </label>

      <input
        multiple={props.multiple}
        name={props.name}
        onChange={handleChange}
        id='file'
        type='file'
        accept={props.accept}
        hidden
      />
      {props.file && <span className='text-400'>{props.file?.name}</span>}
    </div>
  )
}

export default FileInput
