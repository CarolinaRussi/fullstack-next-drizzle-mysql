CREATE TABLE `licenca` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresa_id` int NOT NULL,
	`numero` varchar(100) NOT NULL,
	`orgao_ambiental` varchar(255) NOT NULL,
	`emissao` date NOT NULL,
	`validade` date NOT NULL,
	CONSTRAINT `licenca_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `empresa` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `licenca` ADD CONSTRAINT `licenca_empresa_id_empresa_id_fk` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE no action ON UPDATE no action;