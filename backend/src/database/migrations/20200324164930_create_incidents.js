
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments()

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        table.string('ong_id').notNullable()

        // criando a chave estrangeira para o id
    })
};

exports.down = function(knex) {
  
};
