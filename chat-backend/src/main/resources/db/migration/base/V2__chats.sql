create table chat
(
    chat_id          uuid not null primary key,
    name             text
);

create table app_user_chat
(
    chat_id     uuid references chat,
    app_user_id uuid references app_user
);