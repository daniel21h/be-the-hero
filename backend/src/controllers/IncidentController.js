const connection = require('../database/connection')

module.exports = {

    //Realizando listagem de ID's
    async index(request, response) {

        //Trabalhando na paginaçao dos casos


        //Conectando com a tabela incidents
        const incidents = await connection('incidents')
            .limit(5) //limitando o retorno em apenas 5 incidentes
            .offset((page - 1) * 5) //Pulando 5 registros por p'agina
            .select('*')

        return response.json(incidents)
    },    

    //Criando um incidente
    async create(request, response) {

        //Desestruturando os dados necessarios para cadastro.
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
    },

    async delete(request, response) {

        //Pegando o id que vem dentro da requisiçao
        const { id } = request.params

        //Pegando id da ong logada para verificar se o incidente realmente 
        // foi criado pela mesma, para nao ocorrer dela deletar o incidente de outra ong
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })
            //401 = Nao autorizado
        }

        //Dando tudo certo/se passou eu vou deletar do DB
        await connection('incidents').where('id', id).delete()

        //Resposta de que deu certo, mas sem conteudo para retornar
        return response.status(204).send()
    }
}