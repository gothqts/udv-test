import { useContext, useEffect, useRef, useState } from 'react'
import styles from './windowForm.module.css'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import EmojiIcon from '../../../../../assets/emojiIcon.svg?react'
import ZipIcon from '../../../../../assets/zipIcon.svg?react'
import FileInput from '../../../../../shared/Inputs/FileInput'
import messageContext from '../message.context.ts'
import TextArea from '../../../../../shared/TextArea/index.tsx'

const WindowForm = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const context = useContext(messageContext)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    context.setMessageValues((prev) => ({
      ...prev,
      text: prev.text + emojiData.emoji,
    }))
  }
  return (
    <div className={styles.form_content}>
      <TextArea
        value={context.values.text}
        className={styles.textarea_text}
        maxLength={500}
        rows={1}
        name='text'
        placeholder='Type your message'
        onChange={context.onChange}
      />
      <FileInput
        name='images'
        files={context.values.images}
        onChange={context.onChange}
        img={<ZipIcon />}
        accept='image/*'
        multiple={true}
      />
      <button
        type='button'
        className={styles.emoji_button}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        aria-label='Toggle emoji picker'
      >
        <EmojiIcon />
      </button>

      {showEmojiPicker && (
        <div ref={pickerRef} className={styles.emoji_picker_wrapper}>
          <EmojiPicker
            lazyLoadEmojis={true}
            onEmojiClick={handleEmojiClick}
            previewConfig={{ showPreview: false }}
            categories={[{ category: 'smileys_people', name: 'emoji' }]}
          />
        </div>
      )}
    </div>
  )
}

export default WindowForm
