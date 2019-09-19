create table exercise
(
    id serial not null,
    title CHARACTER VARYING(255) not null,
    day INTEGER not null,
    img_url CHARACTER VARYING(255) not null
);

create unique index exercise_id_uindex
    on exercise (id);

alter table exercise
    add constraint exercise_pk
        primary key (id);

create table set
(
    id serial not null,
    exercise_id INTEGER not null,
    rating INTEGER not null,
    repetitions INTEGER not null,
    weight INTEGER not null,
    created_by CHARACTER VARYING(255) not null,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now()
);

create unique index set_id_uindex
    on set (id);

alter table set
    add constraint set_pk
        primary key (id);
