CREATE TABLE `wellness` (
	`user_id` text NOT NULL,
	`key` text NOT NULL,
	`data` text NOT NULL,
	PRIMARY KEY(`user_id`, `key`)
);
