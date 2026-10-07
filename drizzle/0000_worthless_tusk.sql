CREATE TABLE `checks` (
	`user_id` text NOT NULL,
	`key` text NOT NULL,
	`done` integer NOT NULL,
	PRIMARY KEY(`user_id`, `key`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weights` (
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`weight` real NOT NULL,
	PRIMARY KEY(`user_id`, `date`)
);
