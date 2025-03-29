import { useState } from 'react'
import { IChatRoom } from '../../../Auth/auth.types.ts'
import { createChat } from '../../../../services/CrudChats'
import { chatsAtom } from '../../Chats.atom.ts'
import { useAtom } from 'jotai'
import styles from './chatForm.module.css'
interface IChatFormProps {
  onClose: () => void
}

const CreateChatForm = (props: IChatFormProps) => {
  const [chats, setChats] = useAtom<IChatRoom[]>(chatsAtom)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newChat: IChatRoom = {
      name: name,
      id: Date.now() + Math.floor(Math.random() * 1000),
      messages: [],
      members: [],
    }
    if (name){
      createChat(newChat)
      setChats([...chats, newChat])
      props.onClose()
    }
    else{
      alert('Имя чата не должно быть пустым')
    }

  }
  const [name, setName] = useState<string>('')

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className='input-wrapper'>
        <input
          className='text-input'
          placeholder='enter the chat name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className={styles.btn} type='submit'>create chat</button>
    </form>
  )
}

export default CreateChatForm
