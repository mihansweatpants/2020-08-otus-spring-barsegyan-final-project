create table app_user
(
    app_user_id uuid                not null primary key,
    email       varchar(255) unique not null,
    username    varchar(255) unique not null,
    password    text,
    is_blocked  boolean default false
);
