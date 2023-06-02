import Auth from '../store/auth'
import { instance } from '../api/todolists-api'
import MockAdapter from 'axios-mock-adapter'

let mockStore = Auth

const mock = new MockAdapter(instance, { delayResponse: 100 })
const responseLogoutData = {
   resultCode: 0,
   messages: [],
   data: { id: 'test' },
}
const responseLoginData = {
   resultCode: 1,
   messages: [],
   data: { userId: 'test' },
}
const mockNetworkRequests = () => {
   mock.onDelete('auth/login').reply(200, responseLogoutData)
   mock.onPost('auth/login').reply(200, responseLoginData)
}
const unMockNetworkRequests = () => {
   mock.resetHistory()
}

describe('auth store unit ', () => {
   test('set is loggedOn', () => {
      const store = Auth
      store.setIsLoggedIn(true)
      expect(store.isLoggedIn).toBe(true)
   })
})
describe('auth store integration', () => {
   beforeEach(() => {
      mockNetworkRequests()
      mockStore = Auth
   })
   afterEach(() => {
      unMockNetworkRequests()
   })
   test('logout', async () => {
      await mockStore.logOut
      const isLoggeed = mockStore.isLoggedIn
      expect(isLoggeed).toBe(false)
   })
   test('login', async () => {
      const params = {
         email: 'string',
         password: '1234',
         rememberMe: false,
      }
      await mockStore.logIn(params)
      const isLoggeed = mockStore.isLoggedIn
      expect(isLoggeed).toBe(true)
   })
})
