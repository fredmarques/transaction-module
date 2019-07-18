module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('clients', [{
      name: 'John',
      surname: 'Doe',
      cpf: '424242',
      created_at: '2004-10-19 10:23:54+02',
      updated_at: '2004-10-19 10:23:54+02',
      deleted_at: null,
    }, {
      name: 'Joseph',
      surname: 'Nobody',
      cpf: '12345678911',
      created_at: '2004-10-19 10:23:54+02',
      updated_at: '2004-10-19 10:23:54+02',
      deleted_at: null,
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('clients', null, {}),
};
