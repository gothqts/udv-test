import { IMessage } from '../../../Auth/auth.types.ts'
import styles from './MessageList.module.css'
import Message from '../Message'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../Auth/auth.atom.ts'
import { useEffect, useRef } from 'react'
import cn from '../../../../utils/cn.ts'

interface IMessageListProps {
  messages: IMessage[]
}

const MessageList = (props: IMessageListProps) => {
  const authState = useAtomValue(authAtom)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const style = (message: IMessage) => {
    return message.senderEmail === authState.email
      ? styles.own_message
      : styles.other_message
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [props.messages])

  return (
    <div className={styles.messages_container}>
      {props.messages.map((message) => (
        <div key={message.id} className={cn(style(message), styles.message_wrapper)}>
          <Message message={message} className={style(message)} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
