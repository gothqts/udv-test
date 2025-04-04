import { getCurrentChat } from '../services/chatActions/chatActions.ts'
import { IChatRoom } from '../screens/Auth/auth.types.ts'

export const pickedChatLoader = async (): Promise<IChatRoom | null> => {
  return getCurrentChat()
}
