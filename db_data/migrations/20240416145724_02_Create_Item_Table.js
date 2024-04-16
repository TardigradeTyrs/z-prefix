/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("item", (table) => {
    table.increments("Id").primary();
    table.integer("UserId").unsigned();
    table.foreign("UserId").references("users.UserId");
    table.string("Item_Name")
    table.string("Description")
    table.integer("Quantity")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropForeign('UserId')
  .dropTableIfExists("help_desk_users");
};
