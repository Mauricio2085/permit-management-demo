--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: checklist_items_catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checklist_items_catalog (
    id integer NOT NULL,
    verification character varying(500),
    aspect text
);


--
-- Name: checklist_items_catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklist_items_catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklist_items_catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklist_items_catalog_id_seq OWNED BY public.checklist_items_catalog.id;


--
-- Name: checklist_responses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checklist_responses (
    id integer NOT NULL,
    permit_id integer,
    item_id integer,
    response character varying(10),
    observations text
);


--
-- Name: checklist_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklist_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklist_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklist_responses_id_seq OWNED BY public.checklist_responses.id;


--
-- Name: critical_tasks_catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.critical_tasks_catalog (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


--
-- Name: critical_tasks_catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.critical_tasks_catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: critical_tasks_catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.critical_tasks_catalog_id_seq OWNED BY public.critical_tasks_catalog.id;


--
-- Name: critical_tasks_permit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.critical_tasks_permit (
    id integer NOT NULL,
    permit_id integer,
    task_id integer,
    applies boolean DEFAULT false
);


--
-- Name: critical_tasks_permit_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.critical_tasks_permit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: critical_tasks_permit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.critical_tasks_permit_id_seq OWNED BY public.critical_tasks_permit.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    tax_id character varying(30),
    phone numeric(20,0),
    email character varying(150) NOT NULL,
    address text
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: customers_permit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers_permit (
    id integer NOT NULL,
    permit_id integer,
    customer_id integer
);


--
-- Name: customers_permit_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_permit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_permit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_permit_id_seq OWNED BY public.customers_permit.id;


--
-- Name: documents_permit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents_permit (
    id integer NOT NULL,
    permit_id integer,
    document_id integer,
    response character varying(10)
);


--
-- Name: documents_permit_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.documents_permit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: documents_permit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.documents_permit_id_seq OWNED BY public.documents_permit.id;


--
-- Name: permit_equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permit_equipment (
    id integer NOT NULL,
    permit_id integer,
    equipment_id integer,
    applies boolean DEFAULT false
);


--
-- Name: permit_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permit_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: permit_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permit_equipment_id_seq OWNED BY public.permit_equipment.id;


--
-- Name: permit_signatures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permit_signatures (
    id integer NOT NULL,
    permit_id integer,
    name character varying(100),
    identification character varying(30),
    role character varying(50),
    signature character varying(500),
    signed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: permit_signatures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permit_signatures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: permit_signatures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permit_signatures_id_seq OWNED BY public.permit_signatures.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: safety_equipment_catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.safety_equipment_catalog (
    id integer NOT NULL,
    name character varying(100),
    type character varying(50)
);


--
-- Name: safety_equipment_catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.safety_equipment_catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: safety_equipment_catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.safety_equipment_catalog_id_seq OWNED BY public.safety_equipment_catalog.id;


--
-- Name: supporting_documents_catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supporting_documents_catalog (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


--
-- Name: supporting_documents_catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.supporting_documents_catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: supporting_documents_catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.supporting_documents_catalog_id_seq OWNED BY public.supporting_documents_catalog.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL,
    role_id integer NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: work_at_heights_permits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.work_at_heights_permits (
    id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone,
    description text,
    max_height numeric(5,2),
    max_load numeric(6,2),
    status character varying(20) DEFAULT 'pending'::character varying,
    created_by character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    sequence integer NOT NULL
);


--
-- Name: work_at_heights_permits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.work_at_heights_permits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: work_at_heights_permits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.work_at_heights_permits_id_seq OWNED BY public.work_at_heights_permits.id;


--
-- Name: work_at_heights_permits_sequence_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.work_at_heights_permits_sequence_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: work_at_heights_permits_sequence_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.work_at_heights_permits_sequence_seq OWNED BY public.work_at_heights_permits.sequence;


--
-- Name: checklist_items_catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_items_catalog ALTER COLUMN id SET DEFAULT nextval('public.checklist_items_catalog_id_seq'::regclass);


--
-- Name: checklist_responses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_responses ALTER COLUMN id SET DEFAULT nextval('public.checklist_responses_id_seq'::regclass);


--
-- Name: critical_tasks_catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_catalog ALTER COLUMN id SET DEFAULT nextval('public.critical_tasks_catalog_id_seq'::regclass);


--
-- Name: critical_tasks_permit id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_permit ALTER COLUMN id SET DEFAULT nextval('public.critical_tasks_permit_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: customers_permit id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_permit ALTER COLUMN id SET DEFAULT nextval('public.customers_permit_id_seq'::regclass);


--
-- Name: documents_permit id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents_permit ALTER COLUMN id SET DEFAULT nextval('public.documents_permit_id_seq'::regclass);


--
-- Name: permit_equipment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_equipment ALTER COLUMN id SET DEFAULT nextval('public.permit_equipment_id_seq'::regclass);


--
-- Name: permit_signatures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_signatures ALTER COLUMN id SET DEFAULT nextval('public.permit_signatures_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: safety_equipment_catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.safety_equipment_catalog ALTER COLUMN id SET DEFAULT nextval('public.safety_equipment_catalog_id_seq'::regclass);


--
-- Name: supporting_documents_catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supporting_documents_catalog ALTER COLUMN id SET DEFAULT nextval('public.supporting_documents_catalog_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: work_at_heights_permits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_at_heights_permits ALTER COLUMN id SET DEFAULT nextval('public.work_at_heights_permits_id_seq'::regclass);


--
-- Name: work_at_heights_permits sequence; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_at_heights_permits ALTER COLUMN sequence SET DEFAULT nextval('public.work_at_heights_permits_sequence_seq'::regclass);


--
-- Data for Name: checklist_items_catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checklist_items_catalog (id, verification, aspect) FROM stdin;
1	El sitio donde se ejecutará el trabajo está aislado\ncompletamente\n	Verificar que en el sitio y en sus alrededores no existan materiales o\nequipos que puedan generar riesgos para las personas o equipos de la\nempresa. Si existe el riesgo, se debe corregir para poder diligenciar el\npermiso.
2	Se han instalado mamparas, cerramiento rìgido o cinta\npara aislar la zona y no permitir el paso de vehículos o\npersonas	Si en la zona de trabajo existe paso de personas o vehículos se debe\naislar y señalizar el área de influencia para evitar el tránsito por el\nárea.
3	La(s) persona(s) encargada(s) de ejecutar la labor ha(n)\nrecibido instrucciones y precauciones a seguir en la\nejecución de la tarea	La(s) persona(s) que realizará la tarea debe estar técnicamente\ncapacitada y entrenada en las tareas asignadas. Además debe estar\nen capacidad de manejar equipos y elementos de seguridad.
4	Se garantiza que las personas que realizarán el\ndiligenciamiento del permiso y las que ejecutarán el\ntrabajo conocen el equipo y los procedimientos\ncontemplados para solicitar un permiso	Todas las personas que vayan a realizar el trabajo así como el\nsolicitante (supervisor o persona encargada por laempresa) del\ndiligenciamiento del permiso, deben conocer y cumplir con los\nrequerimientos exigidos. Si es la primera vez que lo realizan se debe\ncapacitar y entrenar al personal en este tema antes de iniciar.
5	Se realizaran trabajos simultáneos en la misma área	Revisar si se están realizando otros trabajos de manera simultánea,\npara la identificación de otros peligros.
6	Se ha verificado que los autorizados para realizar el\ntrabajo estén al día en los pagos de seguridad social	Revisión del pago de aportes de seguridad social de los autorizados.
7	Se ha verificado que los autorizados para realizar el\ntrabajo cuenten con el certificado de aptitud medica para\ntrabajos en altura	Revisión de que se cuente con los certificados de aptitud para realizar\nel trabajo en alturas por parte de los autorizados.
\.


--
-- Data for Name: checklist_responses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checklist_responses (id, permit_id, item_id, response, observations) FROM stdin;
1	16	1	SI	\N
2	16	2	NO	\N
3	16	3	SI	\N
4	16	4	NO	\N
5	16	5	SI	\N
6	16	6	SI	\N
7	16	7	SI	\N
15	18	1	SI	\N
16	18	2	NO	\N
17	18	3	SI	\N
18	18	4	NO	\N
19	18	5	SI	\N
20	18	6	SI	\N
21	18	7	SI	\N
43	23	1	SI	\N
44	23	2	SI	\N
45	23	3	SI	\N
46	23	4	SI	\N
47	23	5	SI	\N
48	23	6	SI	\N
49	23	7	SI	\N
50	24	1	SI	\N
51	24	2	SI	\N
52	24	3	SI	\N
53	24	4	SI	\N
54	24	5	SI	\N
55	24	6	SI	\N
56	24	7	SI	\N
71	27	1	SI	\N
72	27	2	SI	\N
73	27	3	SI	\N
74	27	4	SI	\N
75	27	5	SI	\N
76	27	6	SI	\N
77	27	7	SI	\N
85	29	1	SI	\N
86	29	2	SI	\N
87	29	3	SI	\N
88	29	4	SI	\N
89	29	5	SI	\N
90	29	6	SI	\N
91	29	7	SI	\N
99	31	1	SI	\N
100	31	2	SI	\N
101	31	3	SI	\N
102	31	4	SI	\N
103	31	5	SI	\N
104	31	6	SI	\N
105	31	7	SI	\N
106	32	1	SI	\N
107	32	2	SI	\N
108	32	3	SI	\N
109	32	4	SI	\N
110	32	5	SI	\N
111	32	6	SI	\N
112	32	7	SI	\N
113	33	1	SI	\N
114	33	2	SI	\N
115	33	3	SI	\N
116	33	4	SI	\N
117	33	5	SI	\N
118	33	6	SI	\N
119	33	7	SI	\N
120	34	1	SI	\N
121	34	2	SI	\N
122	34	3	SI	\N
123	34	4	SI	\N
124	34	5	SI	\N
125	34	6	SI	\N
126	34	7	SI	\N
127	35	1	SI	\N
128	35	2	SI	\N
129	35	3	SI	\N
130	35	4	SI	\N
131	35	5	SI	\N
132	35	6	SI	\N
133	35	7	SI	\N
134	36	1	SI	\N
135	36	2	SI	\N
136	36	3	SI	\N
137	36	4	SI	\N
138	36	5	SI	\N
139	36	6	SI	\N
140	36	7	SI	\N
\.


--
-- Data for Name: critical_tasks_catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.critical_tasks_catalog (id, name) FROM stdin;
1	Trabajo en caliente
2	Izaje de cargas
3	Uso de productos químicos
\.


--
-- Data for Name: critical_tasks_permit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.critical_tasks_permit (id, permit_id, task_id, applies) FROM stdin;
1	16	1	t
3	18	1	t
8	23	1	t
9	24	1	t
10	24	2	t
15	27	1	t
16	27	2	t
19	29	1	t
20	29	2	t
23	31	1	t
24	31	2	t
25	32	1	t
26	32	2	t
27	33	1	t
28	33	2	t
29	34	1	t
30	34	2	t
31	35	1	t
32	35	2	t
33	36	1	t
34	36	2	t
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, name, tax_id, phone, email, address) FROM stdin;
1	Customer 1	3105258794	3105258795	customer1@customer1.com	Zona Franca
2	Customer 2	9005258794	3102788792	customer2@customer2.com	Km 13 vía Pereira-Cartago
3	Customer 3	8005258794	3101298791	customer3@customer3.com	Vía Galicia
\.


--
-- Data for Name: customers_permit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers_permit (id, permit_id, customer_id) FROM stdin;
1	16	1
3	18	1
7	23	2
8	24	1
11	27	1
13	29	1
15	31	1
16	32	1
17	33	1
18	34	1
19	35	1
20	36	1
\.


--
-- Data for Name: documents_permit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.documents_permit (id, permit_id, document_id, response) FROM stdin;
1	16	1	SI
2	16	2	NA
3	16	3	NA
4	16	4	NA
5	16	5	NA
6	16	6	NA
7	16	7	NA
8	16	8	NA
17	18	1	SI
18	18	2	NA
19	18	3	NA
20	18	4	NA
21	18	5	NA
22	18	6	NA
23	18	7	NA
24	18	8	NA
49	23	1	SI
50	23	2	NA
51	23	3	NA
52	23	4	NA
53	23	5	NA
54	23	6	NA
55	23	7	NA
56	23	8	NA
57	24	1	SI
58	24	2	NA
59	24	3	NA
60	24	4	NA
61	24	5	NA
62	24	6	NA
63	24	7	NA
64	24	8	NA
81	27	1	SI
82	27	2	NA
83	27	3	NA
84	27	4	NA
85	27	5	NA
86	27	6	NA
87	27	7	NA
88	27	8	NA
97	29	1	SI
98	29	2	NA
99	29	3	NA
100	29	4	NA
101	29	5	NA
102	29	6	NA
103	29	7	NA
104	29	8	NA
113	31	1	SI
114	31	2	NA
115	31	3	NA
116	31	4	NA
117	31	5	NA
118	31	6	NA
119	31	7	NA
120	31	8	NA
121	32	1	SI
122	32	2	NA
123	32	3	NA
124	32	4	NA
125	32	5	NA
126	32	6	NA
127	32	7	NA
128	32	8	NA
129	33	1	SI
130	33	2	NA
131	33	3	NA
132	33	4	NA
133	33	5	NA
134	33	6	NA
135	33	7	NA
136	33	8	NA
137	34	1	SI
138	34	2	NA
139	34	3	NA
140	34	4	NA
141	34	5	NA
142	34	6	NA
143	34	7	NA
144	34	8	NA
145	35	1	SI
146	35	2	NA
147	35	3	NA
148	35	4	NA
149	35	5	NA
150	35	6	NA
151	35	7	NA
152	35	8	NA
153	36	1	SI
154	36	2	NA
155	36	3	NA
156	36	4	NA
157	36	5	NA
158	36	6	NA
159	36	7	NA
160	36	8	NA
\.


--
-- Data for Name: permit_equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permit_equipment (id, permit_id, equipment_id, applies) FROM stdin;
1	16	1	t
2	16	11	t
3	16	17	t
4	16	18	t
5	16	33	t
6	16	42	t
13	18	1	t
14	18	11	t
15	18	17	t
16	18	18	t
17	18	33	t
18	18	42	t
39	23	1	t
40	23	17	t
41	24	1	t
42	24	2	t
43	24	17	t
44	24	18	t
45	24	39	t
56	27	1	t
57	27	2	t
58	27	17	t
59	27	18	t
60	27	39	t
66	29	1	t
67	29	2	t
68	29	17	t
69	29	18	t
70	29	39	t
76	31	1	t
77	31	2	t
78	31	17	t
79	31	18	t
80	31	39	t
81	32	1	t
82	32	2	t
83	32	17	t
84	32	18	t
85	32	39	t
86	33	1	t
87	33	2	t
88	33	17	t
89	33	18	t
90	33	39	t
91	34	1	t
92	34	2	t
93	34	17	t
94	34	18	t
95	34	39	t
96	35	1	t
97	35	2	t
98	35	17	t
99	35	18	t
100	35	39	t
101	36	1	t
102	36	2	t
103	36	17	t
104	36	18	t
105	36	39	t
\.


--
-- Data for Name: permit_signatures; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permit_signatures (id, permit_id, name, identification, role, signature, signed_at) FROM stdin;
1	16	Juan Perez	123456789	ejecutor	https://res.cloudinary.com/smartpocket/image/upload/v1758060827/signatures/signature_123456789_1758060824181.png	2025-09-16 22:13:45.984
2	16	\N	987654321	ejecutor	\N	2025-09-16 22:13:45.985
3	16	Carlos Rodriguez	1122334455	autorizador	https://res.cloudinary.com/smartpocket/image/upload/v1758060827/signatures/signature_1122334455_1758060825487.png	2025-09-16 22:13:45.985
4	16	Ana Lopez	6677889900	coordinador	\N	2025-09-16 22:13:45.986
9	18	Juan Perez	123456789	ejecutor	https://res.cloudinary.com/smartpocket/image/upload/v1758060971/signatures/signature_123456789_1758060968513.png	2025-09-16 22:16:09.97
10	18	\N	987654321	ejecutor	\N	2025-09-16 22:16:09.971
11	18	Carlos Rodriguez	1122334455	autorizador	https://res.cloudinary.com/smartpocket/image/upload/v1758060972/signatures/signature_1122334455_1758060969548.png	2025-09-16 22:16:09.971
12	18	Ana Lopez	6677889900	coordinador	\N	2025-09-16 22:16:09.972
24	23	\N	\N	ejecutor	https://res.cloudinary.com/smartpocket/image/upload/v1758580055/signatures/signature_undefined_1758580049866.png	2025-09-22 22:27:32.304
25	23	Autorizador Suzuki	4562135	autorizador	https://res.cloudinary.com/smartpocket/image/upload/v1758580055/signatures/signature_4562135_1758580051066.png	2025-09-22 22:27:32.304
26	23	Juan García	45454545	coordinador	https://res.cloudinary.com/smartpocket/image/upload/v1758580056/signatures/signature_45454545_1758580051669.png	2025-09-22 22:27:32.306
27	24	\N	14567896	ejecutor	\N	2025-09-22 23:06:38.398
28	24	Autorizador 1	34567812	autorizador	\N	2025-09-22 23:06:38.398
29	24	Juan García	1088262478	coordinador	\N	2025-09-22 23:06:38.399
36	27	\N	14567896	ejecutor	\N	2025-09-23 01:31:27.457
37	27	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:31:27.457
38	27	Juan García	1088262478	coordinador	\N	2025-09-23 01:31:27.459
42	29	\N	14567896	ejecutor	\N	2025-09-23 01:33:04.038
43	29	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:33:04.039
44	29	Juan García	1088262478	coordinador	\N	2025-09-23 01:33:04.039
48	31	\N	14567896	ejecutor	\N	2025-09-23 01:39:36.887
49	31	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:39:36.887
50	31	Juan García	1088262478	coordinador	\N	2025-09-23 01:39:36.888
51	32	\N	14567896	ejecutor	\N	2025-09-23 01:39:36.898
52	32	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:39:36.898
53	32	Juan García	1088262478	coordinador	\N	2025-09-23 01:39:36.899
54	33	\N	14567896	ejecutor	\N	2025-09-23 01:39:36.912
55	33	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:39:36.912
56	33	Juan García	1088262478	coordinador	\N	2025-09-23 01:39:36.913
57	34	\N	14567896	ejecutor	\N	2025-09-23 01:39:36.923
58	34	Autorizador 1	34567812	autorizador	\N	2025-09-23 01:39:36.923
59	34	Juan García	1088262478	coordinador	\N	2025-09-23 01:39:36.924
60	35	Jhonny Zapata	14567896	ejecutor	https://res.cloudinary.com/smartpocket/image/upload/v1758640437/signatures/signature_14567896_1758640436467.png	2025-09-23 15:13:59.834
61	35	Autorizador 1	34567812	autorizador	https://res.cloudinary.com/smartpocket/image/upload/v1758640438/signatures/signature_34567812_1758640437835.png	2025-09-23 15:13:59.834
62	35	Juan García	1088262478	coordinador	https://res.cloudinary.com/smartpocket/image/upload/v1758640438/signatures/signature_1088262478_1758640439034.png	2025-09-23 15:13:59.835
63	36	Jhonny Zapata	14567896	ejecutor	https://res.cloudinary.com/smartpocket/image/upload/v1758640780/signatures/signature_14567896_1758640780059.png	2025-09-23 15:19:43.569
64	36	Autorizador 1	34567812	autorizador	https://res.cloudinary.com/smartpocket/image/upload/v1758640781/signatures/signature_34567812_1758640781453.png	2025-09-23 15:19:43.57
65	36	Juan García	1088262478	coordinador	https://res.cloudinary.com/smartpocket/image/upload/v1758640782/signatures/signature_1088262478_1758640782098.png	2025-09-23 15:19:43.571
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (role_id, role_name) FROM stdin;
1	admin
2	operator
\.


--
-- Data for Name: safety_equipment_catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.safety_equipment_catalog (id, name, type) FROM stdin;
1	Puntos de anclaje	caidas
2	Mecanismos de anclaje	caidas
3	Lineas de vida horizontal cable	caidas
4	Lineas de vida horizontal cuerda	caidas
5	Lineas de vida vertical cable	caidas
6	Lineas de vida vertical cuerda	caidas
7	Mosquetones	caidas
8	Eslinga para restricción	caidas
9	Eslinga para posicionamiento	caidas
10	Eslinga para detención	caidas
11	Arnes integral de seguridad	caidas
12	Cuerda certificada para rescate	caidas
13	Descendedor	caidas
14	Ascendedor	caidas
15	Arrestador (freno)	caidas
16	Poleas	caidas
17	Casco con barbuquejo de 3 puntos	EPP
18	Botas de seguridad	EPP
19	Gafas de seguridad	EPP
20	Guantes de algodon	EPP
21	Guantes de cuero	EPP
22	Guantes dielectricos	EPP
23	Protección facial	EPP
24	Proteccion auditiva	EPP
25	Careta de soldador	EPP
26	Proteccion respiratoria	EPP
27	Chaleco reflectivo	EPP
28	Ropa de trabajo (overol)	EPP
29	Pantalla facial	EPP
30	Impermeable	EPP
31	Extintores	acceso
32	Elementos para delimitación	acceso
33	Elementos de señalizacion	acceso
34	Equipos de Comunicación	acceso
35	Botiquín	acceso
36	Kit ambiental	acceso
37	Kit Lava ojos	acceso
38	Detector de gases	acceso
39	Andamios	acceso
40	Gruas con canasta	acceso
41	Escaleras tipo tijera	acceso
42	Escalera extensibles	acceso
43	Escaleras fijas	acceso
44	Elevadores	acceso
\.


--
-- Data for Name: supporting_documents_catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.supporting_documents_catalog (id, name) FROM stdin;
1	ATS
2	Lista de chequeo de los equipos de acceso (ESCALERAS)
3	Lista de chequeo de los equipos de acceso (ANDAMIO)
4	Lista de chequeo de los equipos de acceso (ELEVADOR)
5	Lista de chequeo para manejo de productos químicos
6	Lista de chequeo de trabajo en excavaciones
7	Lista de chequeo para valoración de condiciones de salud tareas de alto riesgo
8	Plan de izaje de cargas
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, name, email, password, role_id) FROM stdin;
1	userAdmin	permit-demo@example.com	$2b$10$y.0R3sScAiYX6KoaB4IMt.VlalrSDSkbjMuDRLWDAxsjYSWqfAsSO	1
\.


--
-- Data for Name: work_at_heights_permits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.work_at_heights_permits (id, start_date, end_date, description, max_height, max_load, status, created_by, created_at, sequence) FROM stdin;
4	2025-10-12 00:00:00	2025-10-12 00:00:00	fdgjldfjg	23.00	34.00	finalizado	\N	2025-09-16 16:23:28.59395	4
18	2023-10-27 10:30:00	2023-10-27 17:00:00	Trabajo de mantenimiento en la azotea del edificio A	12.00	23.00	finalizado	\N	2025-09-16 22:16:08.506	18
29	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas con 5 permisos	20.00	30.00	pendiente	\N	2025-09-23 01:33:04.019	29
31	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas, permiso #2	20.00	30.00	pendiente	\N	2025-09-23 01:39:36.874	31
32	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas, permiso #3	20.00	30.00	pendiente	\N	2025-09-23 01:39:36.892	32
33	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas, permiso #4	20.00	30.00	pendiente	\N	2025-09-23 01:39:36.903	33
16	2023-10-27 10:30:00	2023-10-27 17:00:00	Trabajo de mantenimiento en la azotea del edificio A	12.00	23.00	finalizado	\N	2025-09-16 22:13:44.175	16
23	2025-09-22 17:27:00	2025-09-22 17:27:00	Permiso 23	20.00	20.00	finalizado	\N	2025-09-22 22:27:29.857	23
24	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas	20.00	30.00	finalizado	\N	2025-09-22 23:06:38.384	24
36	2025-08-27 17:00:00	2025-08-27 17:00:00	Actividades de trabajo en alturas, permiso #1	20.00	30.00	finalizado	\N	2025-09-23 15:19:40.053	36
35	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas, permiso #1	20.00	30.00	finalizado	\N	2025-09-23 15:13:56.455	35
27	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas	20.00	30.00	finalizado	\N	2025-09-23 01:31:27.431	27
34	2023-10-27 17:00:00	2023-10-27 17:00:00	Actividades de trabajo en alturas, permiso #5	20.00	30.00	finalizado	\N	2025-09-23 01:39:36.917	34
\.


--
-- Name: checklist_items_catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklist_items_catalog_id_seq', 7, true);


--
-- Name: checklist_responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklist_responses_id_seq', 140, true);


--
-- Name: critical_tasks_catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.critical_tasks_catalog_id_seq', 3, true);


--
-- Name: critical_tasks_permit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.critical_tasks_permit_id_seq', 34, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 3, true);


--
-- Name: customers_permit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_permit_id_seq', 20, true);


--
-- Name: documents_permit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.documents_permit_id_seq', 160, true);


--
-- Name: permit_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permit_equipment_id_seq', 105, true);


--
-- Name: permit_signatures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permit_signatures_id_seq', 65, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: safety_equipment_catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.safety_equipment_catalog_id_seq', 44, true);


--
-- Name: supporting_documents_catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.supporting_documents_catalog_id_seq', 8, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);


--
-- Name: work_at_heights_permits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.work_at_heights_permits_id_seq', 36, true);


--
-- Name: work_at_heights_permits_sequence_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.work_at_heights_permits_sequence_seq', 36, true);


--
-- Name: checklist_items_catalog checklist_items_catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_items_catalog
    ADD CONSTRAINT checklist_items_catalog_pkey PRIMARY KEY (id);


--
-- Name: checklist_responses checklist_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_responses
    ADD CONSTRAINT checklist_responses_pkey PRIMARY KEY (id);


--
-- Name: critical_tasks_catalog critical_tasks_catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_catalog
    ADD CONSTRAINT critical_tasks_catalog_pkey PRIMARY KEY (id);


--
-- Name: critical_tasks_permit critical_tasks_permit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_permit
    ADD CONSTRAINT critical_tasks_permit_pkey PRIMARY KEY (id);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers_permit customers_permit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_permit
    ADD CONSTRAINT customers_permit_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: customers customers_tax_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_tax_id_key UNIQUE (tax_id);


--
-- Name: documents_permit documents_permit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents_permit
    ADD CONSTRAINT documents_permit_pkey PRIMARY KEY (id);


--
-- Name: permit_equipment permit_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_equipment
    ADD CONSTRAINT permit_equipment_pkey PRIMARY KEY (id);


--
-- Name: permit_signatures permit_signatures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_signatures
    ADD CONSTRAINT permit_signatures_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: safety_equipment_catalog safety_equipment_catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.safety_equipment_catalog
    ADD CONSTRAINT safety_equipment_catalog_pkey PRIMARY KEY (id);


--
-- Name: supporting_documents_catalog supporting_documents_catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supporting_documents_catalog
    ADD CONSTRAINT supporting_documents_catalog_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: work_at_heights_permits work_at_heights_permits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_at_heights_permits
    ADD CONSTRAINT work_at_heights_permits_pkey PRIMARY KEY (id);


--
-- Name: checklist_responses checklist_responses_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_responses
    ADD CONSTRAINT checklist_responses_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.checklist_items_catalog(id);


--
-- Name: checklist_responses checklist_responses_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist_responses
    ADD CONSTRAINT checklist_responses_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: critical_tasks_permit critical_tasks_permit_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_permit
    ADD CONSTRAINT critical_tasks_permit_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: critical_tasks_permit critical_tasks_permit_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.critical_tasks_permit
    ADD CONSTRAINT critical_tasks_permit_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.critical_tasks_catalog(id);


--
-- Name: customers_permit customers_permit_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_permit
    ADD CONSTRAINT customers_permit_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: customers_permit customers_permit_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_permit
    ADD CONSTRAINT customers_permit_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: documents_permit documents_permit_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents_permit
    ADD CONSTRAINT documents_permit_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.supporting_documents_catalog(id);


--
-- Name: documents_permit documents_permit_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents_permit
    ADD CONSTRAINT documents_permit_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: permit_equipment permit_equipment_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_equipment
    ADD CONSTRAINT permit_equipment_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.safety_equipment_catalog(id);


--
-- Name: permit_equipment permit_equipment_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_equipment
    ADD CONSTRAINT permit_equipment_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: permit_signatures permit_signatures_permit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permit_signatures
    ADD CONSTRAINT permit_signatures_permit_id_fkey FOREIGN KEY (permit_id) REFERENCES public.work_at_heights_permits(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA public TO demouser;


--
-- Name: TABLE checklist_items_catalog; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.checklist_items_catalog TO demouser;


--
-- Name: SEQUENCE checklist_items_catalog_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.checklist_items_catalog_id_seq TO demouser;


--
-- Name: TABLE checklist_responses; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.checklist_responses TO demouser;


--
-- Name: SEQUENCE checklist_responses_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.checklist_responses_id_seq TO demouser;


--
-- Name: TABLE critical_tasks_catalog; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.critical_tasks_catalog TO demouser;


--
-- Name: SEQUENCE critical_tasks_catalog_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.critical_tasks_catalog_id_seq TO demouser;


--
-- Name: TABLE critical_tasks_permit; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.critical_tasks_permit TO demouser;


--
-- Name: SEQUENCE critical_tasks_permit_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.critical_tasks_permit_id_seq TO demouser;


--
-- Name: TABLE customers; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.customers TO demouser;


--
-- Name: SEQUENCE customers_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.customers_id_seq TO demouser;


--
-- Name: TABLE customers_permit; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.customers_permit TO demouser;


--
-- Name: SEQUENCE customers_permit_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.customers_permit_id_seq TO demouser;


--
-- Name: TABLE documents_permit; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.documents_permit TO demouser;


--
-- Name: SEQUENCE documents_permit_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.documents_permit_id_seq TO demouser;


--
-- Name: TABLE permit_equipment; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.permit_equipment TO demouser;


--
-- Name: SEQUENCE permit_equipment_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.permit_equipment_id_seq TO demouser;


--
-- Name: TABLE permit_signatures; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.permit_signatures TO demouser;


--
-- Name: SEQUENCE permit_signatures_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.permit_signatures_id_seq TO demouser;


--
-- Name: TABLE roles; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.roles TO demouser;


--
-- Name: SEQUENCE roles_role_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.roles_role_id_seq TO demouser;


--
-- Name: TABLE safety_equipment_catalog; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.safety_equipment_catalog TO demouser;


--
-- Name: SEQUENCE safety_equipment_catalog_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.safety_equipment_catalog_id_seq TO demouser;


--
-- Name: TABLE supporting_documents_catalog; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.supporting_documents_catalog TO demouser;


--
-- Name: SEQUENCE supporting_documents_catalog_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.supporting_documents_catalog_id_seq TO demouser;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO demouser;


--
-- Name: SEQUENCE users_user_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.users_user_id_seq TO demouser;


--
-- Name: TABLE work_at_heights_permits; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.work_at_heights_permits TO demouser;


--
-- Name: SEQUENCE work_at_heights_permits_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.work_at_heights_permits_id_seq TO demouser;


--
-- Name: SEQUENCE work_at_heights_permits_sequence_seq; Type: ACL; Schema: public; Owner: -
--

GRANT USAGE ON SEQUENCE public.work_at_heights_permits_sequence_seq TO demouser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT USAGE ON SEQUENCES  TO demouser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO demouser;


--
-- PostgreSQL database dump complete
--

