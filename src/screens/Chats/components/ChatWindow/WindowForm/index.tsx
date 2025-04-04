import { ChangeEvent,  useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { chatsAtom, pickedChatAtom } from '../../../Chats.atom.ts'
import { authAtom } from '../../../../Auth/auth.atom.ts'
import { IChatRoom, Image, IMessage, IUserProfile } from '../../../../Auth/auth.types.ts'
import React from 'react'
import styles from './WindowForm.module.css'
import useAutosizeTextArea from '../../../hooks/useAutoRisize.ts'
import SendIcon from '../../../../../assets/sendIcon.svg?react'
import { updateChatsMessages } from '../../../../../services/chatActions/chatActions.ts'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import EmojiIcon from '../../../../../assets/emojiIcon.svg?react'
import ZipIcon from '../../../../../assets/zipIcon.svg?react'
import { fileToBase64 } from '../../../../../utils/formatToBase64.ts'


interface IWindowFormProps {
  chatId: number | null
}

const WindowForm = ({ chatId }: IWindowFormProps) => {
  const [message, setMessage] = useState<string>('')
  const setAllChats = useSetAtom(chatsAtom)
  const auth = useAtomValue<IUserProfile>(authAtom)
  const [currentChat, setCurrentChat] = useAtom<IChatRoom | null>(pickedChatAtom)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<Image[]>([])


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  useAutosizeTextArea(textareaRef.current, message)


  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji)
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev)
  }
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      if (images.length + newFiles.length > 3) {
        alert('Максимальное количество файлов - 5')
        return
      }


      const convertedFiles = await Promise.all(
        newFiles.map(async file => ({
          name: file.name,
          url: await fileToBase64(file),
          type: file.type
        }))
      )

      setImages(prev => [...prev, ...convertedFiles])
      e.target.value = ''
    }
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ((!message.trim() && images.length === 0) || !chatId) return
    const newMessage: IMessage = {
      id: Date.now(),
      senderEmail: auth.email,
      text: message,
      images: images,
    }

    if (currentChat) {
      const chatsStore = updateChatsMessages(currentChat.id, newMessage)
      if (chatsStore) {
        setCurrentChat(chatsStore.updatedChat)
        setAllChats(chatsStore.updatedChats)
      }
    }
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.textarea_container}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button
          type='button'
          className={styles.file_button}
          onClick={() => fileInputRef.current?.click()}
          aria-label='Upload files'
        >
          <ZipIcon/>
        </button>
        <textarea
          id='textArea'
          className={styles.textarea_text}
          value={message}
          ref={textareaRef}
          rows={1}
          maxLength={500}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          placeholder='Type your message...'
        />

        <button
          type='button'
          className={styles.emoji_button}
          onClick={toggleEmojiPicker}
          aria-label='Toggle emoji picker'
        >
          <EmojiIcon />
        </button>

        {showEmojiPicker && (
          <div ref={pickerRef} className={styles.emoji_picker_wrapper}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </div>
      <button className={styles.btn} type='submit'>
        <SendIcon />
      </button>
    </form>
  )
}

export default WindowForm
