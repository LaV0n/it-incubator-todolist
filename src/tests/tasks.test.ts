import Tasks from '../store/tasks'

describe('task store', () => {
   test('delete todolist', () => {
      const store = Tasks
      const todolist = { qwerty: [] }
      store.tasksData = todolist
      store.deleteTodolist('qwerty')
      expect(store.tasksData).toEqual({})
   })
})
