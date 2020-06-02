--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products_images DROP CONSTRAINT products_images_productid_fkey;
ALTER TABLE ONLY public.products_images DROP CONSTRAINT products_images_imageid_fkey;
ALTER TABLE ONLY public.products_colors DROP CONSTRAINT products_colors_productid_fkey;
ALTER TABLE ONLY public.products_colors DROP CONSTRAINT products_colors_colorid_fkey;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_pkey;
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.images ALTER COLUMN "imageId" DROP DEFAULT;
ALTER TABLE public.colors ALTER COLUMN "colorId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public.cartitems ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public.products_productid_seq;
DROP TABLE public.products_images;
DROP TABLE public.products_colors;
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public.images_imageid_seq;
DROP TABLE public.images;
DROP SEQUENCE public.colors_colorid_seq;
DROP TABLE public.colors;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartitems_cartItemId_seq";
DROP TABLE public.cartitems;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartitems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cartitems (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    color text NOT NULL
);


--
-- Name: cartitems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartitems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartitems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartitems_cartItemId_seq" OWNED BY public.cartitems."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: colors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colors (
    "colorId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: colors_colorid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.colors_colorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: colors_colorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.colors_colorid_seq OWNED BY public.colors."colorId";


--
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    "imageId" integer NOT NULL,
    "imageType" text NOT NULL
);


--
-- Name: images_imageid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.images_imageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: images_imageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.images_imageid_seq OWNED BY public.images."imageId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    "chosenColor" text NOT NULL
);


--
-- Name: products_colors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_colors (
    "productId" integer,
    "colorId" integer
);


--
-- Name: products_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_images (
    "productId" integer,
    "imageId" integer
);


--
-- Name: products_productid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_productid_seq OWNED BY public.products."productId";


--
-- Name: cartitems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cartitems ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartitems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: colors colorId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors ALTER COLUMN "colorId" SET DEFAULT nextval('public.colors_colorid_seq'::regclass);


--
-- Name: images imageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN "imageId" SET DEFAULT nextval('public.images_imageid_seq'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public.products_productid_seq'::regclass);


--
-- Data for Name: cartitems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cartitems ("cartItemId", "cartId", "productId", price, color) FROM stdin;
328	6	2	27499	blue
5	4	7	24999	camo
6	4	5	29999	red
7	4	1	19999	green
8	4	1	19999	green
9	4	1	19999	black
10	4	2	27499	blue
11	5	2	27499	blue
12	5	2	27499	red
13	5	2	27499	red
14	5	4	19999	orange
321	6	2	27499	blue
322	6	2	27499	blue
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
2	2020-06-01 18:05:37.643137+00
3	2020-06-01 18:12:11.722259+00
4	2020-06-01 18:13:44.707414+00
5	2020-06-01 21:59:32.664989+00
6	2020-06-02 17:25:05.787507+00
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.colors ("colorId", name) FROM stdin;
1	black
2	blue
3	camo
4	grey
5	orange
6	pink
7	red
8	white
9	green
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.images ("imageId", "imageType") FROM stdin;
1	default
2	front
3	right
4	left
5	recline
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, "shortDescription", "longDescription", "chosenColor") FROM stdin;
4	The Plush	19999	Premium and luxurious, The Plush will make all your friends jealous.	The Plush is an eye catching spectacle of a chair. The ulimate gaming chair is made with a synthetic flex upholstry and features a height adjustable memory foam seat, reclining back mechanism up to 150 degrees, and ergonomic adjustable headrest and lumbar support pillows.	orange
5	The Racer	29999	Leave your rivals in the dust with The Racer. Premium leather, designer flair and a two-tone finish that belongs on the track.	Stain-resistant 2.0 PU leather can be cleaned repeatedly without surface damage by simply a cleaning cloth. Designed with a Thick Cure Foam seat that is 2 times heavier than regular foam that maintains its shape. Features a full-tilt locking mechanism that lets you customize your seat to your comfort.	red
3	The Tuxedo	24999	Flashy, bold, revolutionary. Unlike your actual suit, this chair will make a statement and give you room to breathe at the same time.	This chair will put you above the rest and give you maximum comfort and productivity. Features a reclining back mechanism, tilt & tension mechanism control, ajustable headrest and lumbar support cushions, swivel armrests.	white
1	The Standard	19999	The defining style of comfort and practicality, a fine choice for one seeking a subtle charm.	Upholstered in Softhead Leather contrasting colored mesh for an aggressive style and cool feel. Features height adjustment, seat back recline control, flip up arms and 360 degrees of swivel.	black
9	The Commander	27499	Break the mold with different color tones that will stand out. Unique, fresh, and innovative choices make this the best seat in the house.	Unparalleled design, a padded headrest to keep you gaming for hours. The five-star pedestal base with lockable wheels, adjustable armrests with four dimensions of movement, and the widened seat promotes blood flow and decreases fatigue. Get in the game, and take Command!	white
6	The Throne	29999	The crown jewel. Sharp edges, fine lines, and a royal design that will elevate you to new heights.	Adjustable headrest and lumbar support pillows provide comfort that lasts. Raise or lower your chair, tweaking the height and depth of your armrests, and reclining between 90-130 degrees. Full 360 degrees swivel rotation enable dynamic movement. Upholstered in bonded leather in bold, contrasting colors but maintains a professional look.	blue
2	The Streamer	27499	Designed for optimum performance, The Streamer is prepped for gaming marathons that will maximize your K/D ratio.	We see you, gamer, we know your needs are different than the average person. This chair is built with you in mind, comfort features includes a high back, flip up armrests, support pillows for lumbar and neck support, and a premium leather upholstry. Sit back and game in style!	blue
7	The Soldier	24999	Built to be tough. You will do anything but blend into the crowd as you earn your prestige.	The earthy tones of the camouflage brings the outdoors, indoors. Built with an ergonomic shape that curves with and protects the natural shape of the back, this chair will keep you supported even with extended use.	camo
8	The Executive	34999	Refined, classy, premium. Designed by CEOs, for CEOs.	The chair sits on a trumpet pedestal base that provides sturdy support, swivels 360 degrees to make movement easy, and features a tilt tension adjustment that controls how easily the chair rocks back. The Executive choice!	black
\.


--
-- Data for Name: products_colors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_colors ("productId", "colorId") FROM stdin;
1	1
1	9
2	2
2	7
3	8
4	5
5	7
6	2
6	4
6	7
7	3
8	1
8	2
8	4
9	6
9	8
\.


--
-- Data for Name: products_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_images ("productId", "imageId") FROM stdin;
1	1
1	2
1	3
1	4
2	1
2	2
2	3
2	4
3	1
3	2
3	3
3	5
4	1
4	2
4	3
4	5
5	1
5	2
5	3
6	1
6	2
6	3
6	4
7	1
7	2
7	3
8	1
8	2
8	3
8	4
9	1
9	2
9	3
9	5
\.


--
-- Name: cartitems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartitems_cartItemId_seq"', 328, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 6, true);


--
-- Name: colors_colorid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.colors_colorid_seq', 9, true);


--
-- Name: images_imageid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.images_imageid_seq', 5, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_productid_seq', 1, false);


--
-- Name: cartitems cartitems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_pkey PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY ("colorId");


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY ("imageId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: products_colors products_colors_colorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_colors
    ADD CONSTRAINT products_colors_colorid_fkey FOREIGN KEY ("colorId") REFERENCES public.colors("colorId");


--
-- Name: products_colors products_colors_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_colors
    ADD CONSTRAINT products_colors_productid_fkey FOREIGN KEY ("productId") REFERENCES public.products("productId");


--
-- Name: products_images products_images_imageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_imageid_fkey FOREIGN KEY ("imageId") REFERENCES public.images("imageId");


--
-- Name: products_images products_images_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_productid_fkey FOREIGN KEY ("productId") REFERENCES public.products("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

