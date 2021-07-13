const tableName = 'workspace';
const workspaces = [
  {
    description: 'By the Ocean',
  },
  {
    description: 'By the Window',
  },
  {
    description: 'On the corner',
  },
];

exports.up = (knex) => {
  return knex(tableName).insert(workspaces);
};

exports.down = async (knex) => {
  try {
    await Promise.all(
      workspaces.map(async (workspace) => {
        await knex(tableName).where('description', workspace.description).del();
      })
    );
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
