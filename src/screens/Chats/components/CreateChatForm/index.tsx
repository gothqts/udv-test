import styles from './CreateChatForm.module.css'
import Input from '../../../../shared/Inputs/TextInput'
import { FormEvent, useContext } from 'react'
import createChatContext from '../../createChat.context.ts'
import { useAtom, useAtomValue } from 'jotai'
import { IChatRoom } from '../../../Auth/auth.types.ts'
import { chatsAtom } from '../../Chats.atom.ts'
import { createChat } from '../../../../services/chatActions/chatActions.ts'
import { authAtom } from '../../../Auth/auth.atom.ts'

interface IChatFormProps {
  onClose: () => void
}

const CreateChatForm = (props: IChatFormProps) => {
  const context = useContext(createChatContext)
  const [chats, setChats] = useAtom<IChatRoom[]>(chatsAtom)
  const auth = useAtomValue(authAtom)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newChat: IChatRoom = {
      name: context.values.name,
      id: Date.now() + Math.floor(Math.random() * 1000),
      messages: context.values.messages,
      members: [...context.values.members, auth.email],
    }
    if (!context.values.name || newChat.members.length === 1) {
      alert('Имя чата отсутсвует или вы не добавили участников')
      return
    }
    if (createChat(newChat)) {
      setChats([...chats, newChat])
      props.onClose()
    } else {
      alert('Чат с таким именем уже существует')
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.input_wrapper}>
        <Input className={styles.text_input} placeholder='enter the chat name' name='name' value={context.values.name} onChange={context.onChange} />
      </div>
      <button className={styles.btn} type='submit'>
        create chat
      </button>
    </form>
  )
}

export default CreateChatForm
