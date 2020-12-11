
<<<<<<< HEAD
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
=======
--- TABLES ---
-- User TABLE
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(80) NOT NULL,
	"password" varchar(80) NOT NULL, 
	"admin" boolean default FALSE
);
--

--
-- Providers TABLE for information on a user based off their user id.
CREATE TABLE "providers" (
	"id" SERIAL PRIMARY KEY,
	"acitve" boolean default false,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"phone_num" integer,
	"email" varchar(120) NOT NULL,
	"county" varchar(120) NOT NULL,
	"programs" varchar(255),
	"openings" integer NOT NULL,
	"schedule" varchar(120),
	"user_id" integer REFERENCES "user"
);
--

--
-- Provider profile TABLE for linked based off their provider id
CREATE TABLE "provider_profile" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"description" varchar(300) NOT NULL,
	"help_info" varchar(120) NOT NULL,
	"mission" varchar(1000),
	"bio" varchar(2500) NOT NULL,
	"image" varchar(255),
	"providers_id" integer REFERENCES "providers"
);
--

--
-- Participants TABLE for information on a given participant
CREATE TABLE "participants" (
	"id" SERIAL PRIMARY KEY,
	"status" varchar(50) NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"dob" date,
	"phone_num" integer,
	"address" varchar(300),
	"county" varchar(80) NOT NULL,
	"service" varchar(120) NOT NULL,
	"gender" varchar(80),
	"limitations" varchar(500),
	"notes" varchar(1000)
);
--

--
-- JUNCTION TABLE between providers and participants
CREATE TABLE "prov_part" (
	"id" SERIAL PRIMARY KEY,
	"providers_id" integer REFERENCES "providers",
	"participants_id" integer REFERENCES "participants"
);

--

--
-- Service workers TABLE, representing the service worker who filed a participant
CREATE TABLE "service_workers" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(120),
	"phone" integer,
	"email" varchar(120),
	"county" varchar(80),
	"participants_id" integer REFERENCES "participants"
);


>>>>>>> 1f2986f2b65f4d935ef62ed88d32db1398e80843
