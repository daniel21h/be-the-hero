const express = require('express')
const crypto = require('crypto')
const connection = require('./database/connection')

const routes = express.Router()

routes.post('/ongs', async (request, response) => {

    const { name, email, whatsapp, city, uf } = request.body

    //Criando o ID da ONG
    const id = crypto.randomBytes(4).toString('HEX')

    //Conectando no DB e criando ONG junto a connection
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id })
})

module.exports = routes