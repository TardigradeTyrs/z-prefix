/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("users").del();
  await knex("item").del();
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE item RESTART IDENTITY CASCADE");
  await knex("users").insert([
    {
      First_Name: "Chuck",
      Last_Name: "Lidell",
      Username: "CLidell",
      hashed: "hefsdfes"
    },
  ]);
  await knex("item").insert([
    {
      UserId: 1,
      Item_Name: "Frosted Flakes",
      Description: "Sugary Corn Flakes",
      Quantity: 20,
    },
  ]);
};
