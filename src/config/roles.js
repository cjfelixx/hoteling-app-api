const roleTypes = {
  USER: 'user',
  ADMIN: 'admin',
};

const roles = [roleTypes.USER, roleTypes.ADMIN];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roleTypes,
  roles,
  roleRights,
};
