import {createServer, Factory, Model, Response, ActiveModelSerializer} from 'miragejs'
import faker from 'faker'

type User = {
    name: string
    email: string
    created_at: string
}

export function makeServer(){
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer// permitir fazer cadastro de user e relacionamentos
        },
        models: {
            user: Model.extend<Partial<User>>({})
        },

        //dados em massa 
        factories: {
            user: Factory.extend({
                name(index :number){
                    return `User ${index + 1}`
                },
                email(){
                    return faker.internet.email().toLowerCase()
                },
                createAt(){
                    return faker.date.recent(10)
                },
            })
        },

        seeds(server){
            server.createList('user', 200)
        },

        routes(){
            this.namespace ='api'
            this.timing = 750 //para o load
            this.get('/users', function (schema, request) {
                //paginação
                const { page = 1, per_page= 10} = request.queryParams

                const total = schema.all('user').length //200

                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user')).users.slice(pageStart,pageEnd)
               
                //envia dados do header 
                return new Response (
                    200,
                    {'x-total-count': String(total)},
                    {users }//listagem de usuários
                )
            })
            this.get('/users/:id')
            this.post('/users')

            this.namespace = ''
            this.passthrough()
        }
    })
    return server
}