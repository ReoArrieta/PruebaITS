/*
 * BASE DE DATOS CREADA POR REOARRIETA :V
 * VERSION 0.1
 * COPYRIGHT 2021
 */

--Creamos la base de datos PruebaITS--
create database PruebaITS
go

--Usamos la base de datos PruebaITS--
use PruebaITS
go

--Creamos la tabla 'Users'--
create table Users
(
id int identity(1,1) not null,
name varchar(30) not null,
surname varchar(30) not null,
identification varchar(30) unique not null,
username varchar(30) unique not null,
email varchar(30) unique not null,
password varchar(64) not null,
jwt varchar(64) null,
--Establecemos la llave primaria--
constraint PK_Users primary key (id)
)
go

--Creamos la tabla 'State'--
create table State
(
id int identity(1,1) not null,
name varchar(15) not null,
--Establecemos la llave primaria--
constraint PK_State primary key (id)
)
go

--Insertamos los estados de los productos--
insert [dbo].[State] ([name]) values ('Optimo')
insert [dbo].[State] ([name]) values ('Defectuoso')
insert [dbo].[State] ([name]) values ('Manufacturado')
go

--Creamos la tabla 'Products'--
create table Products
(
id int identity(1,1) not null,
name varchar(30) not null,
quantity int not null,
image varchar(max) null,
idState int not null,
--Establecemos las llaves primaria y forane--
constraint PK_Products primary key (id),
constraint FK_Products_State foreign key (idState) references State (id) 
)
go

--Insertamos productos de prueba--
insert [dbo].[Products] ([name], [quantity], [image], [idState]) values ('Mouse Gamer', 5, 'https://http2.mlstatic.com/mouse-gamer-logitech-g203-prodigy-optico-910-004843-D_NQ_NP_715040-MLM31223234117_062019-F.jpg', 1)
insert [dbo].[Products] ([name], [quantity], [image], [idState]) values ('Teclado Gamer', 5, 'https://www.playfactory.cl/wp-content/uploads/2020/12/Redragon-Teclado-mec-nico-inal-mbrico-K530-Draconic-60-compacto-RGB-con-interruptores-marrones-e-iluminaci.jpg_q50.jpg', 2)
insert [dbo].[Products] ([name], [quantity], [image], [idState]) values ('Cascos Gamer', 5, 'https://cascosgaming.online/wp-content/uploads/2018/04/Dimensiones-ArkarTech-Headset-g2000-1.png', 1)
go

--Creamos la tabla 'Entries'--
create table Entries
(
id int identity(1,1) not null,
idProduct int not null,
quantity int not null,
idUser int not null,
date date not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Entries primary key (id),
constraint FK_Entries_Products foreign key (idProduct) references Products (id),
constraint FK_Entries_Users foreign key (idUser) references Users (id)
)
go

--Creamos la tabla 'Outputs'--
create table Outputs
(
id int identity(1,1) not null,
idProduct int not null,
quantity int not null,
idUser int not null,
date date not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Outputs primary key (id),
constraint FK_Outputs_Products foreign key (idProduct) references Products (id),
constraint FK_Outputs_Users foreign key (idUser) references Users (id)
)
go

 /*
  * VISTAS
  */


--Creamos la vista 'V_Read_Entries' para ver las entradas--
create view V_Read_Entries
as
select e.id, e.idProduct, p.name as product, e.quantity, e.idUser, u.username, e.date from Entries e
inner join Products p on e.idProduct = p.id
inner join Users u on e.idUser = u.id
go

--Creamos la vista 'V_Read_Outputs' para ver las salidas--
create view V_Read_Outputs
as
select o.id, o.idProduct, p.name as product, o.quantity, o.idUser, u.username, o.date from Outputs o
inner join Products p on o.idProduct = p.id
inner join Users u on o.idUser = u.id
go
