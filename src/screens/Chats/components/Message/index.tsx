import { IMessage } from '../../../Auth/auth.types.ts'
import styles from './Message.module.css'
import cn from '../../../../utils/cn.ts'
import { getColorByEmail } from '../../../../utils/getColorByEmail.ts'
import Img from './Img'
import { useContext } from 'react'
import { AdaptiveContext } from '../../../../shared/Adaptive'

interface IMessageProps {
  message: IMessage
  className?: string
}

const Message = (props: IMessageProps) => {
  const adaptive = useContext(AdaptiveContext)
  const emailColor = getColorByEmail(props.message.senderEmail)
  return (
    <div className={cn(styles.message, props.className)} data-size={adaptive?.nameSize}>
      <div className={styles.email} style={{ color: emailColor }}>
        {props.message.senderEmail}
      </div>
      {props.message.images && (
        <div className={styles.images_wrapper}>
          {props.message.images.map((image, index) => (
            <Img image={image} key={index} />
          ))}
        </div>
      )}
      <div className={styles.data}>{props.message.text}</div>
    </div>
  )
}

export default Message
