const tableName = 'reservation';

exports.up = async (knex) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments('reservationid');
        table.integer('userid').references('userid').inTable('user').onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        table
          .integer('workspaceid')
          .references('workspaceid')
          .inTable('workspace')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
          .notNullable();
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
