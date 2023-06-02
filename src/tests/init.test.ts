import Init from '../store/init'

describe('init store', () => {
   test('set app error', () => {
      const store = Init
      store.setAppError('some error')
      expect(store.error).not.toBeNull()
      expect(store.error).toEqual('some error')
   })
   test('set app status', () => {
      const store = Init
      store.setAppStatus('succeeded')
      expect(store.status).toEqual('succeeded')
   })
})
