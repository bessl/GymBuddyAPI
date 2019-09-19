create table exercise
(
    id serial not null,
    title CHARACTER VARYING(255) not null,
    day INTEGER not null,
    imgUrl CHARACTER VARYING(255) not null
);

create unique index exercise_id_uindex
    on exercise (id);

alter table exercise
    add constraint exercise_pk
        primary key (id);

create table set
(
    id serial not null,
    exerciseId INTEGER not null,
    rating INTEGER not null,
    repetitions INTEGER not null,
    weight INTEGER not null,
    createadBy CHARACTER VARYING(255) not null,
    createdAt TIMESTAMP with time zone NOT NULL DEFAULT now()
);

create unique index set_id_uindex
    on set (id);

alter table set
    add constraint set_pk
        primary key (id);
