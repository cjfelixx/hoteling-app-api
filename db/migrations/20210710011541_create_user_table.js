const tableName = 'user';

exports.up = async (knex) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments('userid');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.enu('role', ['user', 'admin']).notNullable().default('user');
        table.timestamps();
      });
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists(tableName);
};
