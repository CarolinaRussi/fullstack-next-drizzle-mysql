CREATE TABLE `empresa` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`razao_social` varchar(255) NOT NULL,
	`cnpj` varchar(20) NOT NULL,
	`cep` varchar(20) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`estado` varchar(50) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`complemento` varchar(255) NOT NULL,
	CONSTRAINT `empresa_id` PRIMARY KEY(`id`)
);
