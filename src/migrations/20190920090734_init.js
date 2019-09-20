exports.up = function(knex) {
    return knex.schema
        .createTable('exercise', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.integer('day').notNullable();
            table.string('img_url', 255).notNullable();
        })
        .createTable('set', function (table) {
            table.increments('id');
            table.integer('exercise_id').notNullable();
            table.integer('repetitions').notNullable();
            table.integer('weight').notNullable();
            table.integer('rating').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('created_by').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('exercise')
        .dropTable('set');
};
