exports.up = async knex => {
  await knex.schema.createTable('recipe_users', table => {
    table.uuid('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('picture');
    table.timestamp('created_at').notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('recipe_users');
};
