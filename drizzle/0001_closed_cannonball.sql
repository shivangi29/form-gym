CREATE TABLE `exercise_choices` (
	`user_id` text NOT NULL,
	`slot` text NOT NULL,
	`mode` text NOT NULL,
	PRIMARY KEY(`user_id`, `slot`)
);
