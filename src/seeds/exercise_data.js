exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('exercise').del()
        .then(function () {
            // Inserts seed entries
            return knex('exercise').insert([
                {id: 1, title: "Lower back bench", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Flower-back-bench.jpg?alt=media"},
                {id: 2, title: "Pulley", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Fpulley.jpg?alt=media"},
                {id: 3, title: "Lower back", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FlowerBack.jpg?alt=media"},
                {id: 4, title: "Lat", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Flat.jpg?alt=media"},
                {id: 5, title: "Arm extension", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FarmExtension.jpg?alt=media"},
                {id: 6, title: "Total abdominal", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FtotalAbdominal.jpg?alt=media&token=2b0bd781-82a5-43dc-93aa-1efaa8059a5a"},
                {id: 7, title: "Leg extension", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FlegExtension.jpg?alt=media"},
                {id: 8, title: "Abductor", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Fabductor.jpg?alt=media"},
                {id: 9, title: "Arm curl", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Farmcurl.jpg?alt=media"},
                {id: 10, title: "Rotation calf", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FrotationCalf.jpg?alt=media"},
                {id: 11, title: "Pull up machine", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FpullUpMachine.jpg?alt=media"},
                {id: 12, title: "Leg press", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Flegpress.jpg?alt=media"},
                {id: 13, title: "Shoulder press", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Fshoulderpress.jpeg?alt=media"},
                {id: 14, title: "Cable jungle", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FcableJungle.jpg?alt=media"},
                {id: 15, title: "Chest press", day: "1", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FchestPress.jpeg?alt=media"},
                {id: 16, title: "Leg curl", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FlegCurl.jpg?alt=media"},
                {id: 17, title: "Adductor", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2Fadductor.jpg?alt=media"},
                {id: 18, title: "Low row", day: "2", img_url: "https://firebasestorage.googleapis.com/v0/b/gymbuddy-be23.appspot.com/o/img%2FlowRow.jpg?alt=media"}
            ]);
        });
};
