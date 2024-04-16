/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("UserId").primary();
    table.string("First_Name");
    table.string("Last_Name");
    table.string("Username");
    table.string("hashed");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropForeign('hash_id')
  .dropTableIfExists("users");
};
