import { PropsWithChildren, useEffect, useState, useRef, useCallback, MouseEventHandler } from 'react'
import { createContainer } from './Portal/createContainer'
import Portal from './Portal/index'
import styles from './Modal.module.css'
import CloseIcon from '../../assets/CloseIcon.svg?react'

interface IModalProps {
  id: string
  onClose: (e: React.MouseEvent) => void
  title: string
}

const Modal = ({ id, onClose, children, title }: PropsWithChildren<IModalProps>) => {
  const [isMounted, setMounted] = useState(false)

  const handleClose: MouseEventHandler<SVGSVGElement> = useCallback(
    (e) => {
      onClose(e)
    },
    [onClose]
  )

  const modalWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createContainer({ id: id })
    setMounted(true)
  }, [id])

  return isMounted ? (
    <Portal id={id}>
      <div className={styles.container} ref={modalWrapperRef}>
        <div className={styles.content}>
          <div className={styles.modal_header}>
            <h1 className={styles.title}>{title}</h1>
            <CloseIcon type='button' onClick={handleClose} className={styles.close_icon} />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  ) : null
}

export default Modal
