create table if not exists feedback_tag
(
    id int generated by default as identity,
    feedback_id int not null,
    tag_id int not null,

    primary key(id),

    constraint fk_feedback_tag_feedback_id
        foreign key(feedback_id)
        references feedback(id),

    constraint fk_feedback_tag_tag_id
        foreign key(tag_id)
        references tag(id)
);
