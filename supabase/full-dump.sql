

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS '@graphql({"inflect_names": true})';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";






CREATE TYPE "public"."order_status" AS ENUM (
    'placed',
    'in_progress',
    'made',
    'out_for_delivery',
    'delivered',
    'canceled',
    'error'
);


ALTER TYPE "public"."order_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insertorupdatedeliverylocations"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_delivery_location_id uuid;
    existing_delivery_location_id uuid;
BEGIN
    -- Check if a delivery location already exists for this station
    SELECT delivery_location_id INTO existing_delivery_location_id
    FROM public.station_delivery_locations
    WHERE station_id = NEW.id
    LIMIT 1;

    IF existing_delivery_location_id IS NULL THEN
        -- Create a new delivery location
        INSERT INTO public.delivery_location (name, address, city, state, zip)
        VALUES ('Delivery Location for Station ' || NEW.id, 'Address for Station ' || NEW.id, 'City', 'State', 'Zip')
        RETURNING id INTO new_delivery_location_id;

        -- Create a new station delivery location record
        INSERT INTO public.station_delivery_locations (station_id, delivery_location_id)
        VALUES (NEW.id, new_delivery_location_id);
    END IF;

    RETURN NULL; -- Triggers that do not modify the row must return NULL
END;
$$;


ALTER FUNCTION "public"."insertorupdatedeliverylocations"() OWNER TO "postgres";


CREATE FOREIGN DATA WRAPPER "foodonthestove" HANDLER "extensions"."stripe_fdw_handler" VALIDATOR "extensions"."stripe_fdw_validator";




CREATE SERVER "foodonthestove_server" FOREIGN DATA WRAPPER "foodonthestove" OPTIONS (
    "api_key_id" '69aca938-a877-49db-81c4-b42f50472637',
    "api_url" 'https://api.stripe.com/v1'
);


ALTER SERVER "foodonthestove_server" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."delivery_location" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "address" "text" NOT NULL,
    "address1" "text",
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "zip" "text" NOT NULL,
    "latitude" double precision,
    "longitude" double precision,
    "start_open_time" time with time zone,
    "end_open_time" time with time zone
);


ALTER TABLE "public"."delivery_location" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."navigation" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "data" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."navigation" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."navigation_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "icon_name" "text",
    "path" "text" NOT NULL,
    "index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent_id" "uuid",
    "roles" "text"[],
    "data" "jsonb",
    "tag" "text" NOT NULL,
    "navigation_id" "uuid" NOT NULL
);


ALTER TABLE "public"."navigation_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notification_types" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "schema" "jsonb",
    "icon_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."notification_types" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "notification_type_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "subtitle" "text" NOT NULL,
    "icon_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "is_read" boolean DEFAULT false NOT NULL,
    "message_markdown" "text",
    "data" "jsonb"
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "order_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "unit_price" double precision NOT NULL,
    "quantity" integer NOT NULL,
    "notes" "text"
);


ALTER TABLE "public"."order_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "cc_last4" "text" NOT NULL,
    "cc_card" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "succeeded" boolean DEFAULT true NOT NULL,
    "amount" double precision NOT NULL,
    "error" "text",
    "data" "jsonb",
    "payer_transaction_id" "text"
);


ALTER TABLE "public"."order_transactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "scheduled_delivery_at" timestamp with time zone,
    "order_status" "public"."order_status" DEFAULT 'placed'::"public"."order_status" NOT NULL,
    "delivery_address" "text",
    "delivery_city" "text",
    "delivery_zip" "text",
    "delivery_location_name" "text",
    "delivery_address1" "text",
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "notes" "text",
    "delivery_lat" double precision,
    "delivery_long" double precision,
    "subtotal" numeric,
    "tax" numeric,
    "total" numeric,
    "delivery_state" "text"
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "metadata" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."permissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_inventory" (
    "id" "uuid" NOT NULL,
    "count" bigint DEFAULT '0'::bigint NOT NULL,
    "is_always_available" boolean DEFAULT false NOT NULL,
    "data" "jsonb",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."product_inventory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_types" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "schema" "jsonb",
    "icon_url" "text",
    "cover_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_types" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_type_id" "uuid",
    "name" "text" NOT NULL,
    "short_description" "text",
    "long_description" "text",
    "photo_url" "text",
    "data" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "unit_price" real NOT NULL,
    "unit" "text",
    "instructions" "text"
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role_permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role_id" "uuid" NOT NULL,
    "permission_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "enabled" boolean DEFAULT true NOT NULL,
    "metadata" "jsonb"
);


ALTER TABLE "public"."role_permissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "did" "text" NOT NULL,
    "session_data" "jsonb" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shopping_cart_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "unit_price" double precision NOT NULL,
    "shopping_cart_id" "uuid" NOT NULL
);


ALTER TABLE "public"."shopping_cart_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shopping_carts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "order_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."shopping_carts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."station_delivery_location_timeslots" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "station_delivery_location_id" "uuid" NOT NULL,
    "begin_at" timestamp with time zone NOT NULL,
    "end_at" timestamp with time zone
);


ALTER TABLE "public"."station_delivery_location_timeslots" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."station_delivery_locations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "station_id" "uuid" NOT NULL,
    "delivery_location_id" "uuid" NOT NULL
);


ALTER TABLE "public"."station_delivery_locations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "number" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "address" "text" NOT NULL,
    "address1" "text",
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "zip" "text" NOT NULL,
    "image_url" "text",
    "cover_url" "text",
    "latitude" double precision,
    "longitude" double precision,
    "description" "text",
    "long_description" "text",
    "registration_code" "text" NOT NULL
);


ALTER TABLE "public"."stations" OWNER TO "postgres";


CREATE FOREIGN TABLE "public"."transactions_balances" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "fee" bigint,
    "net" bigint,
    "status" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "foodonthestove_server"
OPTIONS (
    "object" 'balance_transactions',
    "schema" 'public'
);


ALTER FOREIGN TABLE "public"."transactions_balances" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "permission_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "enabled" boolean DEFAULT true NOT NULL,
    "metadata" "jsonb"
);


ALTER TABLE "public"."user_permissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_roles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_stations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "station_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_stations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "did" "text" NOT NULL,
    "handle" "text" NOT NULL,
    "pds_url" "text" NOT NULL,
    "email" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "first_name" "text" NOT NULL,
    "metadata" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "primary_station_id" "uuid",
    "stripe_customer_id" "text"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."delivery_location"
    ADD CONSTRAINT "delivery_location_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."delivery_location"
    ADD CONSTRAINT "delivery_location_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_tag_key" UNIQUE ("tag");



ALTER TABLE ONLY "public"."navigation"
    ADD CONSTRAINT "navigation_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."navigation"
    ADD CONSTRAINT "navigation_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."navigation"
    ADD CONSTRAINT "navigation_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notification_types"
    ADD CONSTRAINT "notification_types_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."notification_types"
    ADD CONSTRAINT "notification_types_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."notification_types"
    ADD CONSTRAINT "notification_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_transactions"
    ADD CONSTRAINT "order_transaction_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_inventory"
    ADD CONSTRAINT "product_inventory_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_types"
    ADD CONSTRAINT "product_types_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."product_types"
    ADD CONSTRAINT "product_types_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."product_types"
    ADD CONSTRAINT "product_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("did");



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_item_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."station_delivery_location_timeslots"
    ADD CONSTRAINT "station_delivery_location_timeslots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."station_delivery_locations"
    ADD CONSTRAINT "station_delivery_locations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stations"
    ADD CONSTRAINT "stations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_permissions"
    ADD CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_stations"
    ADD CONSTRAINT "user_stations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_did_key" UNIQUE ("did");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_handle_key" UNIQUE ("handle");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "after_station_insert" AFTER INSERT ON "public"."stations" FOR EACH ROW EXECUTE FUNCTION "public"."insertorupdatedeliverylocations"();



ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_navigation_id_fkey" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_notification_type_id_fkey" FOREIGN KEY ("notification_type_id") REFERENCES "public"."notification_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_transactions"
    ADD CONSTRAINT "order_transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_inventory"
    ADD CONSTRAINT "product_inventory_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "public"."product_types"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_shopping_cart_id_fkey" FOREIGN KEY ("shopping_cart_id") REFERENCES "public"."shopping_carts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."station_delivery_location_timeslots"
    ADD CONSTRAINT "station_delivery_location_tim_station_delivery_location_id_fkey" FOREIGN KEY ("station_delivery_location_id") REFERENCES "public"."station_delivery_locations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."station_delivery_locations"
    ADD CONSTRAINT "station_delivery_locations_delivery_location_id_fkey" FOREIGN KEY ("delivery_location_id") REFERENCES "public"."delivery_location"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."station_delivery_locations"
    ADD CONSTRAINT "station_delivery_locations_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_permissions"
    ADD CONSTRAINT "user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_permissions"
    ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_stations"
    ADD CONSTRAINT "user_stations_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_stations"
    ADD CONSTRAINT "user_stations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_primary_station_id_fkey" FOREIGN KEY ("primary_station_id") REFERENCES "public"."stations"("id") ON DELETE CASCADE;



CREATE POLICY "Enable read access for all users" ON "public"."navigation" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."navigation_items" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."order_items" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."orders" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."product_types" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."products" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."roles" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."shopping_cart_items" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."shopping_carts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT USING (true);



ALTER TABLE "public"."navigation_items" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."delivery_location";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."navigation";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."navigation_items";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."notification_types";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."notifications";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."order_items";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."order_transactions";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."orders";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."permissions";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."product_inventory";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."product_types";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."products";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."role_permissions";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."roles";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."shopping_cart_items";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."shopping_carts";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."station_delivery_location_timeslots";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."station_delivery_locations";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."stations";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."user_permissions";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."user_roles";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."user_stations";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."users";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";































































































































































































































































































































































































































































































































































































































































GRANT ALL ON FUNCTION "public"."insertorupdatedeliverylocations"() TO "anon";
GRANT ALL ON FUNCTION "public"."insertorupdatedeliverylocations"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insertorupdatedeliverylocations"() TO "service_role";

































GRANT ALL ON TABLE "public"."delivery_location" TO "anon";
GRANT ALL ON TABLE "public"."delivery_location" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_location" TO "service_role";



GRANT ALL ON TABLE "public"."navigation" TO "anon";
GRANT ALL ON TABLE "public"."navigation" TO "authenticated";
GRANT ALL ON TABLE "public"."navigation" TO "service_role";



GRANT ALL ON TABLE "public"."navigation_items" TO "anon";
GRANT ALL ON TABLE "public"."navigation_items" TO "authenticated";
GRANT ALL ON TABLE "public"."navigation_items" TO "service_role";



GRANT ALL ON TABLE "public"."notification_types" TO "anon";
GRANT ALL ON TABLE "public"."notification_types" TO "authenticated";
GRANT ALL ON TABLE "public"."notification_types" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."order_items" TO "anon";
GRANT ALL ON TABLE "public"."order_items" TO "authenticated";
GRANT ALL ON TABLE "public"."order_items" TO "service_role";



GRANT ALL ON TABLE "public"."order_transactions" TO "anon";
GRANT ALL ON TABLE "public"."order_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."order_transactions" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON TABLE "public"."permissions" TO "anon";
GRANT ALL ON TABLE "public"."permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."permissions" TO "service_role";



GRANT ALL ON TABLE "public"."product_inventory" TO "anon";
GRANT ALL ON TABLE "public"."product_inventory" TO "authenticated";
GRANT ALL ON TABLE "public"."product_inventory" TO "service_role";



GRANT ALL ON TABLE "public"."product_types" TO "anon";
GRANT ALL ON TABLE "public"."product_types" TO "authenticated";
GRANT ALL ON TABLE "public"."product_types" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."role_permissions" TO "anon";
GRANT ALL ON TABLE "public"."role_permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permissions" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";



GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_cart_items" TO "anon";
GRANT ALL ON TABLE "public"."shopping_cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_cart_items" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_carts" TO "anon";
GRANT ALL ON TABLE "public"."shopping_carts" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_carts" TO "service_role";



GRANT ALL ON TABLE "public"."station_delivery_location_timeslots" TO "anon";
GRANT ALL ON TABLE "public"."station_delivery_location_timeslots" TO "authenticated";
GRANT ALL ON TABLE "public"."station_delivery_location_timeslots" TO "service_role";



GRANT ALL ON TABLE "public"."station_delivery_locations" TO "anon";
GRANT ALL ON TABLE "public"."station_delivery_locations" TO "authenticated";
GRANT ALL ON TABLE "public"."station_delivery_locations" TO "service_role";



GRANT ALL ON TABLE "public"."stations" TO "anon";
GRANT ALL ON TABLE "public"."stations" TO "authenticated";
GRANT ALL ON TABLE "public"."stations" TO "service_role";



GRANT ALL ON TABLE "public"."transactions_balances" TO "anon";
GRANT ALL ON TABLE "public"."transactions_balances" TO "authenticated";
GRANT ALL ON TABLE "public"."transactions_balances" TO "service_role";



GRANT ALL ON TABLE "public"."user_permissions" TO "anon";
GRANT ALL ON TABLE "public"."user_permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."user_permissions" TO "service_role";



GRANT ALL ON TABLE "public"."user_roles" TO "anon";
GRANT ALL ON TABLE "public"."user_roles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_roles" TO "service_role";



GRANT ALL ON TABLE "public"."user_stations" TO "anon";
GRANT ALL ON TABLE "public"."user_stations" TO "authenticated";
GRANT ALL ON TABLE "public"."user_stations" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
