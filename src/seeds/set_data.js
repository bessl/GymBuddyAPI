
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('set').del()
    .then(function () {
      // Inserts seed entries
      return knex('set').insert([
        {exercise_id: 1, repetitions: 10, weight: 30, rating: 1, created_by: "me"},
      ]);
    });
};
