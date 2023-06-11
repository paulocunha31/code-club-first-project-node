const express = require('express') // importa o express
const uuid = require('uuid')
const port = 3000
const app = express() // Para facilitar usei uma variável para usar o express
app.use(express.json())
/*
    - Query params => meusite.com/users?name=paulo&age=34 // FILTROS
    - Route params => / users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => {"name":"Paulo","age":"34"}

    - GET          => Buscar informção no back-end
    - POST         => Criar informação no back-end
    - PUT / PATCH  => Alterar/Atualizar informação no back-end
    - DELETE       => Deletar informção no back-end

    - Middleware   => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/
   
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "user not found"})

    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
        return response.json({users})
})

app.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId , ( request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

 

    const updatedUser = { id, name, age }

    
    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
  

    users.splice(index,1)
    
    return response.status(201).json()
})








app.listen(port, () =>{
    console.log(`👍 Servidor started on port ${port}`)
}) // Porta que roda a aplicação

