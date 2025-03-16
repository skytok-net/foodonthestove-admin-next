SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

INSERT INTO "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") VALUES
	('859da2c6-3bed-44f7-aab9-bb6e9c072b6d', 'valid', '2025-02-27 08:27:36.581329+00', NULL, 'aead-det', 1, '\x7067736f6469756d', 'Social', '', NULL, NULL, NULL, NULL, NULL),
	('69aca938-a877-49db-81c4-b42f50472637', 'valid', '2025-03-04 03:08:51.574364+00', NULL, 'aead-det', 2, '\x7067736f6469756d', 'FoodOnTheStove_api_key_id', '', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: delivery_location; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: navigation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."navigation" ("id", "name", "key", "data", "created_at") VALUES
	('20fe5cda-fb85-4ca1-bc76-82049cc422d3', 'Top', 'top', NULL, '2025-03-11 18:34:34.266212+00'),
	('f3e37a12-6835-47f8-b52a-3f32a60a51bd', 'Admin', 'admin', NULL, '2025-03-11 18:34:54.013098+00');


--
-- Data for Name: navigation_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."navigation_items" ("id", "name", "icon_name", "path", "index", "created_at", "parent_id", "roles", "data", "tag", "navigation_id") VALUES
	('5d119827-b6b7-41e4-bd7e-7a66fdb43188', 'Home', 'home', '/', 0, '2025-03-11 18:31:43.124228+00', NULL, '{admin,user}', NULL, 'home', '20fe5cda-fb85-4ca1-bc76-82049cc422d3'),
	('1ada1ff9-cf8d-4aea-b83b-dbc5a01a962d', 'Feed', 'file-text', '/feed', 1, '2025-03-11 18:37:38.442569+00', NULL, '{admin,user,guest}', NULL, 'feed', '20fe5cda-fb85-4ca1-bc76-82049cc422d3'),
	('caf97976-0356-4ad9-8f11-f6a800bae805', 'Users', 'users', '/admin/users', 3, '2025-03-11 18:46:24.655916+00', NULL, '{admin}', NULL, 'users', 'f3e37a12-6835-47f8-b52a-3f32a60a51bd'),
	('3d97ff44-7f3d-405c-a16b-d1a9650f1760', 'Dashboard', 'layout-dashboard', '/admin/dashboard', 2, '2025-03-11 18:40:51.079498+00', NULL, '{admin}', NULL, 'dashboard', '20fe5cda-fb85-4ca1-bc76-82049cc422d3'),
	('27098e3f-18e2-4594-91f2-19765ab7c898', 'Orders', 'shopping-cart', '/admin/orders', 1, '2025-03-11 18:44:32.584499+00', NULL, '{admin}', NULL, 'orders', 'f3e37a12-6835-47f8-b52a-3f32a60a51bd'),
	('b0986072-115e-48db-8e98-4d981c4d40eb', 'Products', 'beef', '/admin/products', 2, '2025-03-11 18:45:29.83871+00', NULL, '{admin}', NULL, 'products', 'f3e37a12-6835-47f8-b52a-3f32a60a51bd'),
	('1a01e630-3f89-4dc3-b92d-596f879c9490', 'Dashboard', 'layout-dashboard', '/admin/dashboard', 0, '2025-03-11 18:42:36.652976+00', NULL, '{admin}', NULL, 'admin-dashboard', 'f3e37a12-6835-47f8-b52a-3f32a60a51bd'),
	('8b3b63fd-b36f-4714-bb2b-9edb57b867eb', 'Settings', 'settings', '/settings', 4, '2025-03-11 18:48:43.30839+00', NULL, '{admin,user}', NULL, 'settings', 'f3e37a12-6835-47f8-b52a-3f32a60a51bd');


--
-- Data for Name: notification_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."stations" ("id", "name", "number", "created_at", "address", "address1", "city", "state", "zip", "image_url", "cover_url", "latitude", "longitude", "description", "long_description", "registration_code") VALUES
	('78fa105a-3971-41ac-8fc0-87cf7e8b8a5c', 'Engine Company 13', 13, '2025-02-13 13:15:23.463131+00', '501 4TH STREET SW', NULL, 'Washington', 'DC', '20024	', 'https://ihgnfpdshxlylqiqcbav.supabase.co/storage/v1/object/public/images//13icon.jpeg', 'https://ihgnfpdshxlylqiqcbav.supabase.co/storage/v1/object/public/images//Firehouse_13_Washington,DC_L''Enfant_Plaza.jpg', NULL, NULL, NULL, NULL, 'ENGINE13');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "did", "handle", "pds_url", "email", "last_name", "first_name", "metadata", "created_at", "updated_at", "primary_station_id", "stripe_customer_id") VALUES
	('e8f25615-a420-4ea4-a0b4-934b7bddd8fb', 'did:plc:nkaysqko3h7bhazdtr4jr77v', 'gqadonis.bsky.social', 'https://bsky.social', 'travis@tribehealth.ai', 'James', 'Travis', NULL, '2025-02-02 00:30:02.065606+00', NULL, '78fa105a-3971-41ac-8fc0-87cf7e8b8a5c', NULL),
	('e9e82329-d771-48da-ba67-bea2b7cd3971', 'did:plc:ebeumqaumh3qjwdyun4xxwoj', 'foodonthestove.bsky.social', 'https://bsky.social', 'gqadonis@outlook.com', '', 'FoodOnTheStove', NULL, '2025-03-07 11:04:56.493+00', '2025-03-07 11:04:56.493+00', NULL, NULL);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: product_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_types" ("id", "name", "key", "schema", "icon_url", "cover_url", "created_at") VALUES
	('67c7f869-3186-4b3c-bc9e-7c1624c2ff05', 'Meal', 'meal', NULL, NULL, NULL, '2025-02-01 16:22:35.506681+00'),
	('3a1c6b14-a81f-4926-a1d6-5e9c5f4eb24f', 'Protein', 'protein', NULL, NULL, NULL, '2025-02-01 16:24:15.744619+00'),
	('907a753c-ef5a-439c-97ad-f20bd0475ce2', 'Centerpiece', 'centerpiece', NULL, NULL, NULL, '2025-02-01 16:24:47.318599+00'),
	('ce1cedaa-b69e-4a52-9c18-1b201dbd3d39', 'Starch', 'starch', NULL, NULL, NULL, '2025-02-01 16:25:22.892166+00'),
	('d4d64145-837c-4a32-814e-f854900f261c', 'Vegetable', 'vegetable', NULL, NULL, NULL, '2025-02-01 16:25:38.623957+00'),
	('7f66903b-319d-4628-a596-48b2b05e74e4', 'Primary Ingredient', 'primary', NULL, NULL, NULL, '2025-02-01 16:25:55.249005+00'),
	('41adb9e2-63d8-444c-9538-e139350ed9d4', 'Dessert', 'dessert', NULL, NULL, NULL, '2025-02-01 16:26:24.589563+00');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "product_type_id", "name", "short_description", "long_description", "photo_url", "data", "created_at", "updated_at", "unit_price", "unit", "instructions") VALUES
	('85614db4-5570-4dd9-98c4-c38697c9afdb', '67c7f869-3186-4b3c-bc9e-7c1624c2ff05', 'Grilled Peruvian Chicken with Spicy Cilantro Dipping Sauce, Roasted Sweet Potatoes, and Salad', 'This quick and flavorful version of Peruvian chicken utilizes pre-made marinade and spicy cilantro dipping sauce, saving you time while still delivering a delicious and fresh meal. Paired with roasted sweet potatoes and a light romaine salad, it’s a balanced and satisfying dish.', '# Meal Kit Ingredients List

- Peruvian Marinade (bottled)
- Chicken legs (drumsticks) and thighs (bone-in, skin-on)
- Sweet Potatoes
- Romaine Salad
- Cherry tomatoes 
- Red onion
- Spicy cilantro dipping sauce (bottled)



## Nutrition Facts (per serving)
- Calories: ~450-500 kcal
- Protein: ~35-40g
- Carbohydrates: ~40-45g
- Fat: ~15-18g
- Fiber: ~6-8g
- Sugar: ~8-10g

*Note: Nutritional values are approximate and can vary based on portion sizes and specific ingredients used, especially the dressing for the salad and the type of dipping sauce used.*

This dish offers a perfect balance of protein from the chicken, healthy fats from the marinade and oils, and fiber from the sweet potatoes and salad, making it both nutritious and satisfying.', 'https://ihgnfpdshxlylqiqcbav.supabase.co/storage/v1/object/public/app-images/peruvian_chicken.png', NULL, '2025-03-01 08:06:24.85224+00', NULL, 9.99, 'meal', '## Instructions

### 1. Marinate the Chicken
* Place the chicken legs and thighs in a large resealable plastic bag or shallow dish.
* Pour the pre-made Peruvian chicken marinade over the chicken, ensuring it''s well-coated. Seal the bag or cover the dish and refrigerate for at least 1 hour (up to overnight) to allow the flavors to develop.

### 2. Roast the Sweet Potatoes
* Preheat the oven to **400°F (200°C)**.
* Toss the diced sweet potatoes with **olive oil**, **salt**, **pepper**, and **cinnamon** (if using). Spread the sweet potatoes in a single layer on a baking sheet.
* Roast for **25-30 minutes**, flipping halfway through, until golden brown and tender. Remove from the oven and set aside.

### 3. Prepare the Romaine Salad
* In a large bowl, toss together **chopped romaine lettuce**, **cherry tomatoes**, and **red onion**.
* Drizzle dressing of your choice, and season with **salt** and **pepper**. Toss to combine.

### 4. Cook the Marinated Chicken
* Preheat the oven to **400°F (200°C)** if not already preheated from roasting the sweet potatoes.
* Heat a large oven-safe skillet over medium-high heat. Place the chicken thighs and legs **skin-side down** in the skillet and cook for **4-5 minutes** until the skin is crispy and golden.
* Flip the chicken over and transfer the skillet to the oven.
* Roast the chicken for **30-35 minutes**, or until the internal temperature reaches **165°F (74°C)** and the skin is crispy and browned. If you don''t have an oven-safe skillet, you can transfer the chicken to a baking dish after searing.

### 5. Assemble the Dish
* Serve the crispy Peruvian chicken alongside the roasted sweet potatoes and fresh romaine salad.
* Spoon the pre-made **spicy cilantro dipping sauce** on the side for dipping or drizzle it over the chicken.'),
	('3d2b9136-9a73-4f1f-bddf-953599d57c10', '67c7f869-3186-4b3c-bc9e-7c1624c2ff05', 'Housemade Salmon Burger with Sweet Potato Wedges and Salad', 'This recipe combines a delicious housemade salmon burger, paired with crispy sweet potato wedges and a fresh salad. The salmon burger is already prepared, saving you time while still delivering a fresh, flavorful meal.', '# Housemade Salmon Burger with Sweet Potato Wedges and Salad

This delightful meal features a handcrafted salmon burger that perfectly balances flavor and nutrition. The patty is made with premium salmon, expertly seasoned and formed to create a burger that''s both satisfying and health-conscious. 

Accompanied by crispy sweet potato wedges that offer a perfect blend of sweetness and savory notes, this meal provides a nutritious alternative to traditional fries. The wedges are seasoned with a carefully selected blend of spices that complement the rich flavor of the salmon.

The meal is completed with a vibrant, fresh salad featuring crisp romaine, juicy tomatoes, cool cucumber, and thinly sliced red onion. This refreshing side adds a perfect crunch and lightness to balance the heartier components of the dish.

A housemade remoulade sauce ties everything together, offering a creamy, tangy accompaniment that enhances the natural flavors of the salmon.

This thoughtfully composed meal delivers exceptional taste while providing excellent nutritional value - rich in protein, healthy fats, and essential vitamins and minerals.

## Ingredients

- Fresh Salmon Burger
- Burger Buns
- Sweet Potato
- Lettuce
- Tomato
- Romaine
- Cucumber
- Red Onion
- Remoulade Sauce

## Nutritional Information (per serving)

- Calories: ~550-600 kcal
- Protein: ~30-35g
- Carbohydrates: ~40-45g
- Fat: ~25-30g

*Note: Nutritional values are approximate and can vary based on portion sizes and specific ingredients used, especially the dressing for the salad and the type of bun.*', 'https://ihgnfpdshxlylqiqcbav.supabase.co/storage/v1/object/public/app-images/salmon_burger.png', NULL, '2025-03-01 08:16:19.707291+00', NULL, 8.99, 'meal', '# Instructions

## 1. Prepare the Sweet Potato Wedges
* Preheat your oven to **400°F (200°C)**.
* Cut the **sweet potatoes** into wedges, leaving the skin on for extra texture and nutrition.
* Toss the wedges in **olive oil**, **salt**, **pepper**, **paprika**, and **garlic powder** (if using).
* Spread the sweet potato wedges evenly on a baking sheet.
* Roast for **25-30 minutes**, flipping halfway through, until golden brown and tender. Remove from the oven and set aside.

## 2. Cook the Salmon Burger
* Heat a non-stick skillet or grill pan over **medium heat**.
* Add a bit of **olive oil** to the pan if necessary to prevent sticking.
* Place the **premade salmon burger** in the pan and cook for about **4-5 minutes per side**, or until heated through and golden brown on both sides. (If grilling, cook on **medium heat** for 4-5 minutes per side as well).
* Ensure the burger reaches an internal temperature of **145°F (63°C)** to ensure it''s fully cooked.

## 3. Prepare the Salad
* In a large bowl, toss together **mixed greens**, **cherry tomatoes**, **red onion**, and **cucumber**.
* Drizzle with your **dressing of choice**, and season with **salt** and **pepper** to taste. Toss well to combine.

## 4. Assemble the Dish
* Assemble the **salmon burger** with a **bun**, **lettuce**, **sliced tomato**, and any **sauce** of your choice.
* Serve alongside the **sweet potato wedges** and the **fresh salad**.

This dish offers a balanced combination of protein from the salmon burger, healthy fats from the salmon and olive oil, and fiber and micronutrients from the sweet potatoes and fresh salad, making it a nutritious and satisfying meal.');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: order_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: product_inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_inventory" ("id", "count", "is_always_available", "data", "notes", "created_at", "updated_at") VALUES
	('3d2b9136-9a73-4f1f-bddf-953599d57c10', 0, false, NULL, NULL, '2025-03-05 11:14:31.077132+00', '2025-03-05 11:14:31.077132+00'),
	('85614db4-5570-4dd9-98c4-c38697c9afdb', 0, false, NULL, NULL, '2025-03-05 11:14:44.933251+00', '2025-03-05 11:14:44.933251+00');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "name", "key", "created_at") VALUES
	('7039bc54-07df-465c-bea8-64509660c70e', 'User', 'user', '2025-02-01 16:21:28.985201+00'),
	('40bf04a3-d849-441b-9d09-521cdfadd8b5', 'Admin', 'admin', '2025-02-01 16:21:55.424411+00');


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sessions" ("did", "session_data", "updated_at") VALUES
	('did:plc:nkaysqko3h7bhazdtr4jr77v', '{"did": "did:plc:nkaysqko3h7bhazdtr4jr77v", "email": "travis@tribehealth.ai", "active": true, "handle": "gqadonis.bsky.social", "accessJwt": "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NksifQ.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsInN1YiI6ImRpZDpwbGM6bmtheXNxa28zaDdiaGF6ZHRyNGpyNzd2IiwiaWF0IjoxNzM4NTkyOTY1LCJleHAiOjE3Mzg2MDAxNjUsImF1ZCI6ImRpZDp3ZWI6aHlkbnVtLnVzLXdlc3QuaG9zdC5ic2t5Lm5ldHdvcmsifQ.Bnsnqflt5nB1F-Yaa20GB9iYyzaoIbGZKvWjdDUsEn8yyoh2Zmr8JKyK-g0wkguseL_efypJFFRSdSmrf3Wi2g", "refreshJwt": "eyJ0eXAiOiJyZWZyZXNoK2p3dCIsImFsZyI6IkVTMjU2SyJ9.eyJzY29wZSI6ImNvbS5hdHByb3RvLnJlZnJlc2giLCJzdWIiOiJkaWQ6cGxjOm5rYXlzcWtvM2g3YmhhemR0cjRqcjc3diIsImF1ZCI6ImRpZDp3ZWI6YnNreS5zb2NpYWwiLCJqdGkiOiJPajZZd3NBbjdrNks2eHduS1pxOG1DVk03eG1aWmV1eG54ajZDVzNGejhZIiwiaWF0IjoxNzM4NTkyOTY1LCJleHAiOjE3NDYzNjg5NjV9.3HpA4QcqJrxkaLG3sVyK1bmghJ7LJIyxfNVy3ZJU3j11zHiEAsLVcxD55Ycu_RUMeNTPSmnX-oQ33cIwXr_QJg", "emailConfirmed": true, "emailAuthFactor": false}', '2025-02-03 14:29:26.069+00');


--
-- Data for Name: shopping_carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."shopping_carts" ("id", "user_id", "order_id", "created_at") VALUES
	('4872166d-c5b9-46f4-844a-5c02378bb410', 'e8f25615-a420-4ea4-a0b4-934b7bddd8fb', NULL, '2025-03-13 19:25:47.052772+00');


--
-- Data for Name: shopping_cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."shopping_cart_items" ("id", "product_id", "quantity", "created_at", "unit_price", "shopping_cart_id") VALUES
	('d3c7e6fe-cd55-494e-8c8f-378d18fbed12', '3d2b9136-9a73-4f1f-bddf-953599d57c10', 1, '2025-03-14 17:53:07.558062+00', 8.99, '4872166d-c5b9-46f4-844a-5c02378bb410'),
	('3d2b9136-9a73-4f1f-bddf-953599d57c20', '3d2b9136-9a73-4f1f-bddf-953599d57c10', 1, '2025-03-14 17:58:45.22068+00', 8.99, '4872166d-c5b9-46f4-844a-5c02378bb410'),
	('843b337d-d483-4ea5-a00d-3e8ba389de2c', '85614db4-5570-4dd9-98c4-c38697c9afdb', 1, '2025-03-15 15:42:05.65655+00', 9.99, '4872166d-c5b9-46f4-844a-5c02378bb410');


--
-- Data for Name: station_delivery_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: station_delivery_location_timeslots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_roles" ("id", "user_id", "role_id", "created_at") VALUES
	('0ababad8-f170-4724-96bb-0ffefac7785a', 'e8f25615-a420-4ea4-a0b4-934b7bddd8fb', '40bf04a3-d849-441b-9d09-521cdfadd8b5', '2025-02-28 16:13:34.854533+00');


--
-- Data for Name: user_stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_stations" ("id", "user_id", "station_id", "created_at") VALUES
	('3fadad5b-0ccc-4f03-b360-30fa03f17811', 'e8f25615-a420-4ea4-a0b4-934b7bddd8fb', '78fa105a-3971-41ac-8fc0-87cf7e8b8a5c', '2025-03-01 08:22:25.739327+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('images', 'images', NULL, '2025-02-02 01:45:46.715802+00', '2025-02-02 01:45:46.715802+00', true, false, NULL, NULL, NULL),
	('app-images', 'app-images', NULL, '2025-02-27 21:13:44.10062+00', '2025-02-27 21:13:44.10062+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('2b4c0933-ed43-46c7-98ab-1b2d773b8947', 'images', 'Firehouse_13_Washington,DC_L''Enfant_Plaza.jpg', NULL, '2025-02-13 13:13:52.426976+00', '2025-02-13 13:13:52.426976+00', '2025-02-13 13:13:52.426976+00', '{"eTag": "\"4fa2bc55061f2e8f200485038d58ed8f-1\"", "size": 93438, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-13T13:13:52.000Z", "contentLength": 93438, "httpStatusCode": 200}', '40e7069c-299f-4793-83e6-001422ae1399', NULL, NULL),
	('e2981bfc-be3f-43fa-afa4-7b2b61fdab90', 'images', '13icon.jpeg', NULL, '2025-02-13 13:14:52.120775+00', '2025-02-13 13:14:52.120775+00', '2025-02-13 13:14:52.120775+00', '{"eTag": "\"d6fec5ff51c3a6c9df1c2e56571f26b0-1\"", "size": 16055, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-13T13:14:52.000Z", "contentLength": 16055, "httpStatusCode": 200}', 'ca4da276-f989-4bb4-930c-19d320508bf5', NULL, NULL),
	('330850c3-054d-4a84-91ea-e4666812f7fa', 'app-images', 'peruvian_chicken.png', NULL, '2025-03-01 08:19:17.029242+00', '2025-03-01 08:19:17.029242+00', '2025-03-01 08:19:17.029242+00', '{"eTag": "\"89dedede08aed78911d48af13a57131d-1\"", "size": 1491573, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-03-01T08:19:17.000Z", "contentLength": 1491573, "httpStatusCode": 200}', '6f704b6f-68fd-4a1d-8e53-4a3ef97b7aac', NULL, NULL),
	('44126129-f529-43c6-9692-60ab560885c6', 'app-images', 'salmon_burger.png', NULL, '2025-03-01 08:19:17.051975+00', '2025-03-01 08:19:17.051975+00', '2025-03-01 08:19:17.051975+00', '{"eTag": "\"76ed219f727871bb6470aff5d196ed1f-1\"", "size": 1488783, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-03-01T08:19:17.000Z", "contentLength": 1488783, "httpStatusCode": 200}', '1b8ce8bd-d313-444b-9f29-79b6935c2ea3', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

INSERT INTO "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") VALUES
	('eb4c0b32-17bb-4330-99a3-cefd2223b2bd', 'BlueSky', 'BlueSky Social Password', 'D6YcyTCwR48coR7k+PPOj58+h5dZoOkar5FaACiKiy3/KMqmWPuuMFU=', '859da2c6-3bed-44f7-aab9-bb6e9c072b6d', '\x44c00f0b3d246656ee17436c7d460b21', '2025-02-27 08:27:36.89525+00', '2025-02-27 08:27:36.89525+00'),
	('d2dfc4b8-641c-4acc-8371-5af6548c0380', 'FoodOnTheStove_api_key_id', '', 'k210/fXRa/SWoBrUwzWpYa6+XhdtgMYY2AACc0OaVe16cR1Z5NqnvyGErrh16MkwqO9uPLdhVYrR
zLBCDoe1MJz2ql+39N3IH475Tdmwf+0ME1ID7cFe2gjq8Q9io3v4XFwCKbrKIlFeIehXk5GmTISi
gyFrN03+SmepamoEJHUEW62qGuLm0/xb2g==', '69aca938-a877-49db-81c4-b42f50472637', '\x84fc34a2492a9da52f9a348472dc94e7', '2025-03-04 03:08:51.574364+00', '2025-03-04 03:08:51.574364+00');


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
