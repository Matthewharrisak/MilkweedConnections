--DATABASE NAME : milkweed
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
	"phone_num" varchar(80),
	"email" varchar(120) NOT NULL,
	"ccs" boolean default false,
	"choices" boolean default false,
	"psp" boolean default false,
	"other" varchar(120),
	"openings" integer NOT NULL,
	"morning" boolean default false,
	"evening" boolean default false,
	"afternoon" boolean default false,
	"user_id" integer REFERENCES "user"
);
--

--
-- Provider profile TABLE linked based off their provider id
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
	"phone_num" varchar(120),
	"address" varchar(300),
	"county" varchar(80) NOT NULL,
	"ccs" boolean default false,
	"choices" boolean default false,
	"psp" boolean default false,
	"avatar" varchar(120),
	"guardian" varchar(120),
	"other" varchar(120),
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
-- Counties TABLE for linked based off their provider id
CREATE TABLE "counties" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(120) NOT NULL
);
--

--
--   Junction table between a provider and their counties to work int
CREATE TABLE "providers_counties" (
	"id" SERIAL PRIMARY KEY,
	"providers_id" integer REFERENCES "providers",
	"counties_id" integer REFERENCES "counties"
);
--
--
-- Service workers TABLE, representing the service worker who filed a participant
CREATE TABLE "service_workers" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(120),
	"phone" varchar(120),
	"email" varchar(120),
	"serv_county" varchar(80),
	"participants_id" integer REFERENCES "participants"
);

INSERT INTO "providers_counties" ("providers_id", "counties_id") VALUES (2, 2);


INSERT INTO "counties" ("name") VALUES ('Barron');
INSERT INTO "counties" ("name") VALUES ('Burnett');
INSERT INTO "counties" ("name") VALUES ('Buffalo');
INSERT INTO "counties" ("name") VALUES ('Chippewa');
INSERT INTO "counties" ("name") VALUES ('Clark');
INSERT INTO "counties" ("name") VALUES ('Dunn');
INSERT INTO "counties" ("name") VALUES ('Eau Claire');
INSERT INTO "counties" ("name") VALUES ('Pierce');
INSERT INTO "counties" ("name") VALUES ('Pepin');
INSERT INTO "counties" ("name") VALUES ('Polk');
INSERT INTO "counties" ("name") VALUES ('Trampealeau');
INSERT INTO "counties" ("name") VALUES ('Rusk');
INSERT INTO "counties" ("name") VALUES ('Washburn');
INSERT INTO "counties" ("name") VALUES ('St.Croix');