
create type direction AS ENUM ('N', 'S', 'W', 'E');

create table daily_traffic (
  time        TIMESTAMPTZ       NOT NULL,
  leg text not null,
  direction direction not null ,
  street2 text not null,
  cars int not null,
  location GEOGRAPHY(Point) not null
)

SELECT create_hypertable('daily_traffic', 'time');


