const connection = require('../database/connection')

module.exports = {

    //Criando um incidente
    async create(request, response) {

        //Desestruturando os dados necessarios para cadastro
        const { title, description, value } = request.body

        // O header(onde vai a autenticaçao) guarda o contexto da requisicao, 
        // onde geralmente
        // vem dados da autenticacao do usuario, localizacao, idioma e etc.
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    }

        
}