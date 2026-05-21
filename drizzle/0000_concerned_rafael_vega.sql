CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(300),
	`message` text NOT NULL,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `processSteps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number` varchar(8) NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `processSteps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`category` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text,
	`href` text,
	`tagsJson` json,
	`spanClass` varchar(200) NOT NULL DEFAULT 'md:col-span-1 md:row-span-1',
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number` varchar(8) NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandName` varchar(120) NOT NULL DEFAULT 'SHAH RUBAYET',
	`ownerName` varchar(120) NOT NULL DEFAULT 'Shah Rubayet Ahmed',
	`location` varchar(120) NOT NULL DEFAULT 'Dhaka, BD — UTC+6',
	`heroEyebrow` varchar(200) NOT NULL DEFAULT 'Hey, I''m Shah Rubayet',
	`heroHeadline` text NOT NULL,
	`heroDescription` text NOT NULL,
	`heroPortraitUrl` text,
	`heroAvailabilityLabel` varchar(80) NOT NULL DEFAULT 'Available',
	`heroAvailabilityValue` varchar(200) NOT NULL DEFAULT 'For Q1 ''26 projects',
	`heroLocationLabel` varchar(80) NOT NULL DEFAULT 'Based in',
	`heroLocationValue` varchar(200) NOT NULL DEFAULT 'Dhaka, BD — UTC+6',
	`cvUrl` text,
	`heroFeatures` json,
	`aboutEyebrow` varchar(80) NOT NULL DEFAULT '(About)',
	`aboutHeadline` text NOT NULL,
	`aboutBody` text NOT NULL,
	`aboutStats` json,
	`servicesHeadline` text,
	`servicesIntro` text,
	`workHeadline` text,
	`processHeadline` text,
	`processIntro` text,
	`testimonialsHeadline` text,
	`skillsHeadline` text,
	`toolsHeadline` text,
	`toolsIntro` text,
	`contactHeadline` text,
	`contactBody` text,
	`contactEmail` varchar(320) NOT NULL DEFAULT 'shahrubayet@gmail.com',
	`contactPhone` varchar(40),
	`contactLinkedinLabel` varchar(200),
	`contactLinkedinUrl` text,
	`footerCopyright` varchar(200) NOT NULL DEFAULT '© 2026 — Dhaka',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `siteSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`value` int NOT NULL DEFAULT 80,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `socialLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`url` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `socialLinks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`role` varchar(200) NOT NULL,
	`quote` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tools_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
