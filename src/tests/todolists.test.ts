import Todolists from '../store/todolists'
import { TodolistDomainType } from '../common/types/types'

describe('todolist store', () => {
   const todoList: TodolistDomainType = {
      id: 'qwerty',
      title: 'qwerty',
      addedDate: '1111',
      order: 1,
      filter: 'all',
      entityStatus: 'idle',
   }
   test('change filter', () => {
      const store = Todolists
      store.todos.unshift(todoList)
      store.changeTodolistFilter('qwerty', 'active')
      expect(store.todos[0].filter).toEqual('active')
   })
   test('change status', () => {
      const store = Todolists
      store.todos.unshift(todoList)
      store.changeTodolistEntityStatus('qwerty', 'succeeded')
      expect(store.todos[0].entityStatus).toEqual('succeeded')
   })
})
