const tableName = 'reservation';

exports.up = async (knex) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments('id');
        table.integer('email').notNullable().references('userid').inTable('email');
        table.integer('workspaceid').notNullable().references('workspaceid').inTable('workspace');
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
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
