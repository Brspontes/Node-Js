drop table if exists tb_herois

create table tb_herois (
    id int generated always as identity primary key not null,
    nome text not null,
    poder text not null
)

inser into tb_herois (nome, poder) values ('flash', 'speed'), ('aquaman', 'falar com os peixes'), ('batman', 'pagode$')

select * from tb_herois
select * from tb_herois where id = ??

update tb_herois set nome = 'goku', poder = 'kamehameha' where id = 1

delete from tb_herois where id = 2