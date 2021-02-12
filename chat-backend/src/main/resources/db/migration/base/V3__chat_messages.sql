create table chat_message
(
    chat_message_id uuid not null primary key,
    message_type    text,
    chat_id         uuid references chat (chat_id),
    sent_by         uuid references app_user (app_user_id),
    message_text    text,
    sent_at         timestamp
);

create table chat_read_mark
(
    chat_read_mark_id    uuid not null primary key,
    app_user_id          uuid references app_user (app_user_id),
    chat_id              uuid references chat (chat_id),
    last_read_message_id uuid references chat_message (chat_message_id)
);
