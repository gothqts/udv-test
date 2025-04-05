import React, { useState } from 'react'
import { IChatRoom, Image, IMessage, IUserProfile } from '../../../../Auth/auth.types.ts'
import { updateChatsMessages } from '../../../../../services/chatActions/chatActions.ts'
import { useAtomValue } from 'jotai'
import { authAtom } from '../../../../Auth/auth.atom.ts'
import { useAtom, useSetAtom } from 'jotai/index'
import { chatsAtom, pickedChatAtom } from '../../../Chats.atom.ts'

const generateEmptyMessage = (): IMessage => ({
  id: null,
  senderEmail: '',
  images: [],
  text: '',
})

export const useMessageCtrl = () => {
  const [messageValues, setMessageValues] = useState<IMessage>(generateEmptyMessage())
  const auth = useAtomValue<IUserProfile>(authAtom)
  const [currentChat, setCurrentChat] = useAtom<IChatRoom | null>(pickedChatAtom)
  const setAllChats = useSetAtom(chatsAtom)

  const handleChange = (value: string | Image[] | Image, name: string) => {
    setMessageValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!messageValues.text.trim() && messageValues?.images?.length === 0) return
    const newMessage: IMessage = {
      id: Date.now(),
      senderEmail: auth.email,
      text: messageValues.text,
      images: messageValues.images,
    }

    if (currentChat) {
      const chatsStore = updateChatsMessages(currentChat.id, newMessage)
      if (chatsStore) {
        setCurrentChat(chatsStore.updatedChat)
        setAllChats(chatsStore.updatedChats)
        setMessageValues(generateEmptyMessage())
      }
    }
  }

  return {
    handleChange,
    messageValues,
    setMessageValues,
    handleSubmit,
  }
}
