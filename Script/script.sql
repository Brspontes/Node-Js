create database portalnoticias;

use portalnoticias;

create table noticias(
	idNoticia int not null primary key auto_increment,
    titulo varchar(100),
    noticia text,
    datacriacao timestamp default current_timestamp);
    
    insert into noticias(titulo, noticia) values ('Titulo 1','conteudo 1');
    
    select * from noticias