import init from '../../store/init'
import { ResponseType } from '../types/types'

export const handleServerAppError = <D>(data: ResponseType<D>) => {
   if (data.messages.length) {
      init.setAppError(data.messages[0])
   } else {
      init.setAppError('Some error occurred')
   }
   init.setAppStatus('failed')
}

export const handleServerNetworkError = (error: { message: string }) => {
   init.setAppError(error.message ? error.message : 'Some error occurred')
   init.setAppStatus('failed')
}
