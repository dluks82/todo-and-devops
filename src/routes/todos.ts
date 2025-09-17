import { FastifyPluginCallback } from 'fastify'

type Todo = { id: number; title: string; completed: boolean }
type GenericError = { message: string }
type TodoIdParams = { id: string }
type CreateTodoBody = { title: string }
type UpdateTodoBody = Partial<Pick<Todo, 'title' | 'completed'>>

export type TodosPluginOptions = {
  maxItems?: number
}

export const DEFAULT_TODO_LIMIT = 100

const todoSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    completed: { type: 'boolean' },
  },
  required: ['id', 'title', 'completed'],
  additionalProperties: false,
} as const

const todoListSchema = {
  type: 'array',
  items: todoSchema,
} as const

const createTodoBodySchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
  },
  required: ['title'],
  additionalProperties: false,
} as const

const updateTodoBodySchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    completed: { type: 'boolean' },
  },
  additionalProperties: false,
  minProperties: 1,
} as const

const todoIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
  required: ['id'],
  additionalProperties: false,
} as const

const genericMessageSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
  additionalProperties: false,
} as const

const getConfiguredLimit = (value: number | undefined): number => {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    !Number.isInteger(value) ||
    value <= 0
  ) {
    return DEFAULT_TODO_LIMIT
  }
  return value
}

export const todosPlugin: FastifyPluginCallback<TodosPluginOptions> = (
  app,
  opts,
  done
) => {
  const limit = getConfiguredLimit(opts.maxItems)

  const todos: Todo[] = [
    { id: 1, title: 'Aprender Fastify', completed: false },
    { id: 2, title: 'Configurar CI/CD', completed: true },
  ]
  let nextTodoId = todos.length + 1

  const trimTodosToLimit = (): void => {
    while (todos.length > limit) {
      todos.shift()
    }
  }

  trimTodosToLimit()

  app.get<{ Reply: Todo[] }>(
    '/todos',
    {
      schema: {
        tags: ['Todos'],
        summary: 'Lista todas as tarefas de exemplo',
        response: {
          200: {
            description: 'Lista de tarefas',
            ...todoListSchema,
          },
        },
      },
    },
    () => todos
  )

  app.get<{ Params: TodoIdParams; Reply: Todo | GenericError }>(
    '/todos/:id',
    {
      schema: {
        tags: ['Todos'],
        summary: 'Busca uma tarefa pelo identificador',
        params: todoIdParamSchema,
        response: {
          200: {
            description: 'Tarefa encontrada',
            ...todoSchema,
          },
          404: {
            description: 'Tarefa não encontrada',
            ...genericMessageSchema,
          },
        },
      },
    },
    (request, reply) => {
      const id = Number(request.params.id)
      const todo = todos.find(item => item.id === id)
      if (!todo) {
        reply.status(404)
        return { message: 'Tarefa não encontrada' }
      }
      return todo
    }
  )

  app.post<{ Body: CreateTodoBody; Reply: Todo }>(
    '/todos',
    {
      schema: {
        tags: ['Todos'],
        summary: 'Cria uma nova tarefa',
        body: createTodoBodySchema,
        response: {
          201: {
            description: 'Tarefa criada',
            ...todoSchema,
          },
        },
      },
    },
    (request, reply) => {
      const todo: Todo = {
        id: nextTodoId,
        title: request.body.title,
        completed: false,
      }
      nextTodoId += 1
      todos.push(todo)
      trimTodosToLimit()
      reply.status(201)
      return todo
    }
  )

  app.patch<{
    Params: TodoIdParams
    Body: UpdateTodoBody
    Reply: Todo | GenericError
  }>(
    '/todos/:id',
    {
      schema: {
        tags: ['Todos'],
        summary: 'Atualiza parcialmente uma tarefa',
        params: todoIdParamSchema,
        body: updateTodoBodySchema,
        response: {
          200: {
            description: 'Tarefa atualizada',
            ...todoSchema,
          },
          404: {
            description: 'Tarefa não encontrada',
            ...genericMessageSchema,
          },
        },
      },
    },
    (request, reply) => {
      const id = Number(request.params.id)
      const todo = todos.find(item => item.id === id)
      if (!todo) {
        reply.status(404)
        return { message: 'Tarefa não encontrada' }
      }

      if (typeof request.body.title === 'string') {
        todo.title = request.body.title
      }
      if (typeof request.body.completed === 'boolean') {
        todo.completed = request.body.completed
      }

      return todo
    }
  )

  app.delete<{
    Params: TodoIdParams
    Reply: { message: string } | GenericError
  }>(
    '/todos/:id',
    {
      schema: {
        tags: ['Todos'],
        summary: 'Remove uma tarefa',
        params: todoIdParamSchema,
        response: {
          200: {
            description: 'Confirmação da remoção',
            ...genericMessageSchema,
          },
          404: {
            description: 'Tarefa não encontrada',
            ...genericMessageSchema,
          },
        },
      },
    },
    (request, reply) => {
      const id = Number(request.params.id)
      const index = todos.findIndex(item => item.id === id)
      if (index === -1) {
        reply.status(404)
        return { message: 'Tarefa não encontrada' }
      }

      todos.splice(index, 1)
      return { message: 'Tarefa removida com sucesso' }
    }
  )

  done()
}
