CREATE TABLE `exercise_substitutions` (
	`user_id` text NOT NULL,
	`slot` text NOT NULL,
	`exercise_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `slot`)
);
