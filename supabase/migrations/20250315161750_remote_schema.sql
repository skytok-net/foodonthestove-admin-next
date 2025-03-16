alter table "public"."shopping_cart_items" drop constraint "shopping_cart_item_user_id_fkey";

create table "public"."delivery_location" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "address" text not null,
    "address1" text,
    "city" text not null,
    "state" text not null,
    "zip" text not null,
    "latitude" double precision,
    "longitude" double precision,
    "start_open_time" time with time zone,
    "end_open_time" time with time zone
);


create table "public"."navigation" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "key" text not null,
    "data" jsonb,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."navigation_items" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "icon_name" text,
    "path" text not null,
    "index" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "parent_id" uuid,
    "roles" text[],
    "data" jsonb,
    "tag" text not null,
    "navigation_id" uuid not null
);


alter table "public"."navigation_items" enable row level security;

create table "public"."product_inventory" (
    "id" uuid not null,
    "count" bigint not null default '0'::bigint,
    "is_always_available" boolean not null default false,
    "data" jsonb,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."station_delivery_location_timeslots" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "station_delivery_location_id" uuid not null,
    "begin_at" timestamp with time zone not null,
    "end_at" timestamp with time zone
);


create table "public"."station_delivery_locations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "station_id" uuid not null,
    "delivery_location_id" uuid not null
);


alter table "public"."orders" add column "delivery_lat" double precision;

alter table "public"."orders" add column "delivery_long" double precision;

alter table "public"."orders" add column "delivery_state" text;

alter table "public"."orders" add column "subtotal" numeric;

alter table "public"."orders" add column "tax" numeric;

alter table "public"."orders" add column "total" numeric;

alter table "public"."shopping_cart_items" drop column "user_id";

alter table "public"."shopping_cart_items" alter column "quantity" set data type integer using "quantity"::integer;

alter table "public"."users" add column "stripe_customer_id" text;

CREATE UNIQUE INDEX delivery_location_name_key ON public.delivery_location USING btree (name);

CREATE UNIQUE INDEX delivery_location_pkey ON public.delivery_location USING btree (id);

CREATE UNIQUE INDEX navigation_items_pkey ON public.navigation_items USING btree (id);

CREATE UNIQUE INDEX navigation_items_tag_key ON public.navigation_items USING btree (tag);

CREATE UNIQUE INDEX navigation_key_key ON public.navigation USING btree (key);

CREATE UNIQUE INDEX navigation_name_key ON public.navigation USING btree (name);

CREATE UNIQUE INDEX navigation_pkey ON public.navigation USING btree (id);

CREATE UNIQUE INDEX product_inventory_pkey ON public.product_inventory USING btree (id);

CREATE UNIQUE INDEX station_delivery_location_timeslots_pkey ON public.station_delivery_location_timeslots USING btree (id);

CREATE UNIQUE INDEX station_delivery_locations_pkey ON public.station_delivery_locations USING btree (id);

alter table "public"."delivery_location" add constraint "delivery_location_pkey" PRIMARY KEY using index "delivery_location_pkey";

alter table "public"."navigation" add constraint "navigation_pkey" PRIMARY KEY using index "navigation_pkey";

alter table "public"."navigation_items" add constraint "navigation_items_pkey" PRIMARY KEY using index "navigation_items_pkey";

alter table "public"."product_inventory" add constraint "product_inventory_pkey" PRIMARY KEY using index "product_inventory_pkey";

alter table "public"."station_delivery_location_timeslots" add constraint "station_delivery_location_timeslots_pkey" PRIMARY KEY using index "station_delivery_location_timeslots_pkey";

alter table "public"."station_delivery_locations" add constraint "station_delivery_locations_pkey" PRIMARY KEY using index "station_delivery_locations_pkey";

alter table "public"."delivery_location" add constraint "delivery_location_name_key" UNIQUE using index "delivery_location_name_key";

alter table "public"."navigation" add constraint "navigation_key_key" UNIQUE using index "navigation_key_key";

alter table "public"."navigation" add constraint "navigation_name_key" UNIQUE using index "navigation_name_key";

alter table "public"."navigation_items" add constraint "navigation_items_navigation_id_fkey" FOREIGN KEY (navigation_id) REFERENCES navigation(id) ON DELETE CASCADE not valid;

alter table "public"."navigation_items" validate constraint "navigation_items_navigation_id_fkey";

alter table "public"."navigation_items" add constraint "navigation_items_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES navigation_items(id) ON DELETE CASCADE not valid;

alter table "public"."navigation_items" validate constraint "navigation_items_parent_id_fkey";

alter table "public"."navigation_items" add constraint "navigation_items_tag_key" UNIQUE using index "navigation_items_tag_key";

alter table "public"."product_inventory" add constraint "product_inventory_id_fkey" FOREIGN KEY (id) REFERENCES products(id) ON DELETE CASCADE not valid;

alter table "public"."product_inventory" validate constraint "product_inventory_id_fkey";

alter table "public"."station_delivery_location_timeslots" add constraint "station_delivery_location_tim_station_delivery_location_id_fkey" FOREIGN KEY (station_delivery_location_id) REFERENCES station_delivery_locations(id) ON DELETE CASCADE not valid;

alter table "public"."station_delivery_location_timeslots" validate constraint "station_delivery_location_tim_station_delivery_location_id_fkey";

alter table "public"."station_delivery_locations" add constraint "station_delivery_locations_delivery_location_id_fkey" FOREIGN KEY (delivery_location_id) REFERENCES delivery_location(id) ON DELETE CASCADE not valid;

alter table "public"."station_delivery_locations" validate constraint "station_delivery_locations_delivery_location_id_fkey";

alter table "public"."station_delivery_locations" add constraint "station_delivery_locations_station_id_fkey" FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE not valid;

alter table "public"."station_delivery_locations" validate constraint "station_delivery_locations_station_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insertorupdatedeliverylocations()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

grant delete on table "public"."delivery_location" to "anon";

grant insert on table "public"."delivery_location" to "anon";

grant references on table "public"."delivery_location" to "anon";

grant select on table "public"."delivery_location" to "anon";

grant trigger on table "public"."delivery_location" to "anon";

grant truncate on table "public"."delivery_location" to "anon";

grant update on table "public"."delivery_location" to "anon";

grant delete on table "public"."delivery_location" to "authenticated";

grant insert on table "public"."delivery_location" to "authenticated";

grant references on table "public"."delivery_location" to "authenticated";

grant select on table "public"."delivery_location" to "authenticated";

grant trigger on table "public"."delivery_location" to "authenticated";

grant truncate on table "public"."delivery_location" to "authenticated";

grant update on table "public"."delivery_location" to "authenticated";

grant delete on table "public"."delivery_location" to "service_role";

grant insert on table "public"."delivery_location" to "service_role";

grant references on table "public"."delivery_location" to "service_role";

grant select on table "public"."delivery_location" to "service_role";

grant trigger on table "public"."delivery_location" to "service_role";

grant truncate on table "public"."delivery_location" to "service_role";

grant update on table "public"."delivery_location" to "service_role";

grant delete on table "public"."navigation" to "anon";

grant insert on table "public"."navigation" to "anon";

grant references on table "public"."navigation" to "anon";

grant select on table "public"."navigation" to "anon";

grant trigger on table "public"."navigation" to "anon";

grant truncate on table "public"."navigation" to "anon";

grant update on table "public"."navigation" to "anon";

grant delete on table "public"."navigation" to "authenticated";

grant insert on table "public"."navigation" to "authenticated";

grant references on table "public"."navigation" to "authenticated";

grant select on table "public"."navigation" to "authenticated";

grant trigger on table "public"."navigation" to "authenticated";

grant truncate on table "public"."navigation" to "authenticated";

grant update on table "public"."navigation" to "authenticated";

grant delete on table "public"."navigation" to "service_role";

grant insert on table "public"."navigation" to "service_role";

grant references on table "public"."navigation" to "service_role";

grant select on table "public"."navigation" to "service_role";

grant trigger on table "public"."navigation" to "service_role";

grant truncate on table "public"."navigation" to "service_role";

grant update on table "public"."navigation" to "service_role";

grant delete on table "public"."navigation_items" to "anon";

grant insert on table "public"."navigation_items" to "anon";

grant references on table "public"."navigation_items" to "anon";

grant select on table "public"."navigation_items" to "anon";

grant trigger on table "public"."navigation_items" to "anon";

grant truncate on table "public"."navigation_items" to "anon";

grant update on table "public"."navigation_items" to "anon";

grant delete on table "public"."navigation_items" to "authenticated";

grant insert on table "public"."navigation_items" to "authenticated";

grant references on table "public"."navigation_items" to "authenticated";

grant select on table "public"."navigation_items" to "authenticated";

grant trigger on table "public"."navigation_items" to "authenticated";

grant truncate on table "public"."navigation_items" to "authenticated";

grant update on table "public"."navigation_items" to "authenticated";

grant delete on table "public"."navigation_items" to "service_role";

grant insert on table "public"."navigation_items" to "service_role";

grant references on table "public"."navigation_items" to "service_role";

grant select on table "public"."navigation_items" to "service_role";

grant trigger on table "public"."navigation_items" to "service_role";

grant truncate on table "public"."navigation_items" to "service_role";

grant update on table "public"."navigation_items" to "service_role";

grant delete on table "public"."product_inventory" to "anon";

grant insert on table "public"."product_inventory" to "anon";

grant references on table "public"."product_inventory" to "anon";

grant select on table "public"."product_inventory" to "anon";

grant trigger on table "public"."product_inventory" to "anon";

grant truncate on table "public"."product_inventory" to "anon";

grant update on table "public"."product_inventory" to "anon";

grant delete on table "public"."product_inventory" to "authenticated";

grant insert on table "public"."product_inventory" to "authenticated";

grant references on table "public"."product_inventory" to "authenticated";

grant select on table "public"."product_inventory" to "authenticated";

grant trigger on table "public"."product_inventory" to "authenticated";

grant truncate on table "public"."product_inventory" to "authenticated";

grant update on table "public"."product_inventory" to "authenticated";

grant delete on table "public"."product_inventory" to "service_role";

grant insert on table "public"."product_inventory" to "service_role";

grant references on table "public"."product_inventory" to "service_role";

grant select on table "public"."product_inventory" to "service_role";

grant trigger on table "public"."product_inventory" to "service_role";

grant truncate on table "public"."product_inventory" to "service_role";

grant update on table "public"."product_inventory" to "service_role";

grant delete on table "public"."station_delivery_location_timeslots" to "anon";

grant insert on table "public"."station_delivery_location_timeslots" to "anon";

grant references on table "public"."station_delivery_location_timeslots" to "anon";

grant select on table "public"."station_delivery_location_timeslots" to "anon";

grant trigger on table "public"."station_delivery_location_timeslots" to "anon";

grant truncate on table "public"."station_delivery_location_timeslots" to "anon";

grant update on table "public"."station_delivery_location_timeslots" to "anon";

grant delete on table "public"."station_delivery_location_timeslots" to "authenticated";

grant insert on table "public"."station_delivery_location_timeslots" to "authenticated";

grant references on table "public"."station_delivery_location_timeslots" to "authenticated";

grant select on table "public"."station_delivery_location_timeslots" to "authenticated";

grant trigger on table "public"."station_delivery_location_timeslots" to "authenticated";

grant truncate on table "public"."station_delivery_location_timeslots" to "authenticated";

grant update on table "public"."station_delivery_location_timeslots" to "authenticated";

grant delete on table "public"."station_delivery_location_timeslots" to "service_role";

grant insert on table "public"."station_delivery_location_timeslots" to "service_role";

grant references on table "public"."station_delivery_location_timeslots" to "service_role";

grant select on table "public"."station_delivery_location_timeslots" to "service_role";

grant trigger on table "public"."station_delivery_location_timeslots" to "service_role";

grant truncate on table "public"."station_delivery_location_timeslots" to "service_role";

grant update on table "public"."station_delivery_location_timeslots" to "service_role";

grant delete on table "public"."station_delivery_locations" to "anon";

grant insert on table "public"."station_delivery_locations" to "anon";

grant references on table "public"."station_delivery_locations" to "anon";

grant select on table "public"."station_delivery_locations" to "anon";

grant trigger on table "public"."station_delivery_locations" to "anon";

grant truncate on table "public"."station_delivery_locations" to "anon";

grant update on table "public"."station_delivery_locations" to "anon";

grant delete on table "public"."station_delivery_locations" to "authenticated";

grant insert on table "public"."station_delivery_locations" to "authenticated";

grant references on table "public"."station_delivery_locations" to "authenticated";

grant select on table "public"."station_delivery_locations" to "authenticated";

grant trigger on table "public"."station_delivery_locations" to "authenticated";

grant truncate on table "public"."station_delivery_locations" to "authenticated";

grant update on table "public"."station_delivery_locations" to "authenticated";

grant delete on table "public"."station_delivery_locations" to "service_role";

grant insert on table "public"."station_delivery_locations" to "service_role";

grant references on table "public"."station_delivery_locations" to "service_role";

grant select on table "public"."station_delivery_locations" to "service_role";

grant trigger on table "public"."station_delivery_locations" to "service_role";

grant truncate on table "public"."station_delivery_locations" to "service_role";

grant update on table "public"."station_delivery_locations" to "service_role";

create policy "Enable read access for all users"
on "public"."navigation"
as permissive
for all
to public
using (true);


create policy "Enable read access for all users"
on "public"."navigation_items"
as permissive
for all
to public
using (true);


CREATE TRIGGER after_station_insert AFTER INSERT ON public.stations FOR EACH ROW EXECUTE FUNCTION insertorupdatedeliverylocations();


