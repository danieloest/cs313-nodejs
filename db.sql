CREATE TABLE users (
    userID  serial primary key,
    username text,
    password text
);

CREATE TABLE todoItems (
    itemID  serial primary key,
    task    text,
    isCompleted BOOLEAN,
    userID  int references users(userID)
);

-- Add test task for user Kevin
INSERT INTO todoItems (task, isCompleted, userID) VALUES ('Do the thing', FALSE, 4);
INSERT INTO todoItems (task, isCompleted, userID) VALUES ('DELETE THIS.. part 2', FALSE, 4);
SELECT task, isCompleted, userID FROM todoItems where userID = 4;
DELETE FROM todoItems WHERE itemID = 2;