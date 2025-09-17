import { buildApp } from '../server'

describe('Todos endpoints', () => {
  it('GET /todos deve retornar a lista inicial', async () => {
    const app = await buildApp()

    const res = await app.inject({ method: 'GET', url: '/todos' })
    expect(res.statusCode).toBe(200)
    const payload = res.json() as Array<{
      id: number
      title: string
      completed: boolean
    }>
    expect(payload).toHaveLength(2)
    expect(payload[0]).toMatchObject({
      id: 1,
      title: 'Aprender Fastify',
      completed: false,
    })

    await app.close()
  })

  it('POST /todos deve criar uma nova tarefa e permitir consulta posterior', async () => {
    const app = await buildApp()

    const createRes = await app.inject({
      method: 'POST',
      url: '/todos',
      payload: { title: 'Escrever testes adicionais' },
    })
    expect(createRes.statusCode).toBe(201)
    const created = createRes.json() as {
      id: number
      title: string
      completed: boolean
    }
    expect(created).toMatchObject({
      title: 'Escrever testes adicionais',
      completed: false,
    })

    const getRes = await app.inject({
      method: 'GET',
      url: `/todos/${created.id}`,
    })
    expect(getRes.statusCode).toBe(200)
    const fetched = getRes.json() as {
      id: number
      title: string
      completed: boolean
    }
    expect(fetched).toMatchObject({
      id: created.id,
      title: created.title,
      completed: false,
    })

    await app.close()
  })

  it('PATCH /todos/:id deve atualizar o status e título', async () => {
    const app = await buildApp()

    const createRes = await app.inject({
      method: 'POST',
      url: '/todos',
      payload: { title: 'Atualizar status' },
    })
    const created = createRes.json() as { id: number }

    const patchRes = await app.inject({
      method: 'PATCH',
      url: `/todos/${created.id}`,
      payload: { completed: true, title: 'Atualizado!' },
    })
    expect(patchRes.statusCode).toBe(200)
    const patched = patchRes.json() as {
      id: number
      title: string
      completed: boolean
    }
    expect(patched).toMatchObject({
      id: created.id,
      title: 'Atualizado!',
      completed: true,
    })

    await app.close()
  })

  it('DELETE /todos/:id deve remover a tarefa', async () => {
    const app = await buildApp()

    const createRes = await app.inject({
      method: 'POST',
      url: '/todos',
      payload: { title: 'Será removida' },
    })
    const created = createRes.json() as { id: number }

    const deleteRes = await app.inject({
      method: 'DELETE',
      url: `/todos/${created.id}`,
    })
    expect(deleteRes.statusCode).toBe(200)

    const getRes = await app.inject({
      method: 'GET',
      url: `/todos/${created.id}`,
    })
    expect(getRes.statusCode).toBe(404)

    await app.close()
  })

  it('POST /todos deve falhar sem título', async () => {
    const app = await buildApp()
    const res = await app.inject({ method: 'POST', url: '/todos', payload: {} })
    expect(res.statusCode).toBe(400)
    await app.close()
  })

  it('não deve ultrapassar o limite configurado de itens em memória', async () => {
    const previousLimit = process.env.TODO_MAX_ITEMS
    process.env.TODO_MAX_ITEMS = '3'

    const app = await buildApp()
    try {
      const titles = [
        'Primeira extra',
        'Segunda extra',
        'Terceira extra',
        'Quarta extra',
      ]
      for (const title of titles) {
        const res = await app.inject({
          method: 'POST',
          url: '/todos',
          payload: { title },
        })
        expect(res.statusCode).toBe(201)
      }

      const listRes = await app.inject({ method: 'GET', url: '/todos' })
      expect(listRes.statusCode).toBe(200)
      const payload = listRes.json() as Array<{ title: string }>
      expect(payload).toHaveLength(3)
      expect(payload.some(todo => todo.title === 'Aprender Fastify')).toBe(
        false
      )
      expect(payload.some(todo => todo.title === 'Configurar CI/CD')).toBe(
        false
      )
      expect(payload[payload.length - 1].title).toBe('Quarta extra')
    } finally {
      await app.close()

      if (previousLimit === undefined) {
        delete process.env.TODO_MAX_ITEMS
      } else {
        process.env.TODO_MAX_ITEMS = previousLimit
      }
    }
  })
})
