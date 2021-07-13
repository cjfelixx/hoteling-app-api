const { tokenTypes } = require('../../src/config/tokens');

const tableName = 'tokens';

exports.up = async (knex) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments('id');
        table.string('token').notNullable();
        table.integer('userid').notNullable().references('userid').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
        table.enum('type', [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD]).notNullable();
        table.date('expires').notNullable();
        table.boolean('blacklisted').notNullable();
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
