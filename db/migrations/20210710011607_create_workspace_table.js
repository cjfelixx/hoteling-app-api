const tableName = 'workspace';

exports.up = async (knex) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments('workspaceid');
        table.string('description');
        table.boolean('is_active').notNullable().default(true);
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
