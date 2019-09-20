module.exports = {
  dev: {
    client: 'pg',
    connection: {
      host: 'postgres',
      database: 'gymbuddy',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: 'postgres',
      database: 'gymbuddy_test',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
