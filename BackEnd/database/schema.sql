CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE INDEX sessions_user_id on sessions(user_id);
CREATE INDEX videos_session_id on videos(session_id);

create type post_type as enum ('text', 'link');

create table posts(
  id serial primary key,
  type post_type not null,
  title varchar(255) not null,
  body text,
  author_id int,
  subreddit_id int not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint fk_author
    foreign key(author_id)
      references users(id)
      on delete set null,
  constraint fk_subreddit
    foreign key(subreddit_id)
      references subreddits(id)
      on delete set null
);

create table post_votes(
  user_id int not null,
  post_id int not null,
  vote_value int not null check (-1 <= vote_value and vote_value <= 1),
  primary key (user_id, post_id),
  constraint fk_user
    foreign key(user_id)
      references users(id)
      on delete cascade,
  constraint fk_post
    foreign key(post_id)
      references posts(id)
      on delete cascade
);

create table comments(
  id serial primary key,
  body text,
  author_id int,
  post_id int,
  parent_comment_id int,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint fk_author
    foreign key(author_id)
      references users(id)
      on delete set null,
  constraint fk_post
    foreign key(post_id)
      references posts(id)
      on delete set null,
  constraint fk_parent_comment
    foreign key(parent_comment_id)
      references comments(id)
      on delete set null
);

create table moderators(
  user_id int not null,
  subreddit_id int not null,
  primary key (user_id, subreddit_id),
  created_at timestamptz default now(),
  constraint fk_user
    foreign key(user_id)
      references users(id)
      on delete cascade,
  constraint fk_subreddit
    foreign key(subreddit_id)
      references subreddits(id)
      on delete cascade
);

create or replace function update_updated_at_column()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$

create trigger update_users_updated_at
  before update
  on users
  for each row
    execute procedure update_updated_at_column();

create trigger update_posts_updated_at
  before update
  on posts
  for each row
    execute procedure update_updated_at_column();

    create trigger update_comments_updated_at
  before update
  on comments
  for each row
    execute procedure update_updated_at_column();