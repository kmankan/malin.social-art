--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg120+1)
-- Dumped by pg_dump version 14.13 (Debian 14.13-1.pgdg120+1)

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
-- Name: Artwork; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Artwork" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    likes integer NOT NULL,
    state jsonb NOT NULL
);


--
-- Name: Favourite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Favourite" (
    id text NOT NULL,
    "artworkId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text,
    email text NOT NULL,
    name text,
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    clerk_id text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: Artwork; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Artwork" (id, title, description, "authorId", "createdAt", "updatedAt", likes, state) FROM stdin;
cm2nxpvge000bwor7u2ynb6tz	Rotating Boxes	\N	user_2nuA3jNX553Fal910wqsUEnYq9h	2024-10-24 23:28:51.321	2024-10-25 18:58:36.618	1	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 0.9600228838377286, "color": "hsl(266.8119868953039, 100%, 50%)", "speed": 1.631985311659031, "position": [2.770396696483457, -2.599805786375023, -1.723814379438209], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 0.8937698202262416, "color": "hsl(68.05292863415367, 100%, 50%)", "speed": 1.557597772280861, "position": [-1.697709958221789, 2.585177912819445, -2.695544362645787], "isSelected": false, "rotationAxis": "y"}, {"id": "box5", "size": 0.9957353888730536, "color": "hsl(269.3398494473888, 100%, 50%)", "speed": 0.9868719717259986, "position": [-1.143175763123274, -2.056051085119283, -1.408404963302358], "isSelected": false, "rotationAxis": "y"}, {"id": "box6", "size": 1.21355819576109, "color": "hsl(237.14805622687993, 100%, 50%)", "speed": 1.178452107816119, "position": [1.914902761564328, -0.3431999302128155, 2.641530499869825], "isSelected": false, "rotationAxis": "y"}, {"id": "box7", "size": 0.944086823068302, "color": "hsl(137.47169681273115, 100%, 50%)", "speed": 2.319119559743244, "position": [-1.560289450296975, -0.4116503449865303, -2.571044500979014], "isSelected": false, "rotationAxis": "y"}, {"id": "box8", "size": 0.8171130180362546, "color": "hsl(347.7470805241722, 100%, 50%)", "speed": 0.9006105427959543, "position": [-2.523551490104982, 2.779339096473704, -0.458455640744075], "isSelected": false, "rotationAxis": "y"}, {"id": "box9", "size": 1.219079923920216, "color": "hsl(153.72772599661306, 100%, 50%)", "speed": 2.221846756139128, "position": [-1.705036859743952, 0.5460483600532378, 1.742874680967948], "isSelected": false, "rotationAxis": "y"}, {"id": "box10", "size": 1.100289097898148, "color": "hsl(97.89096374951488, 100%, 50%)", "speed": 2.148035673538718, "position": [1.309800954212864, -1.17286374701998, 1.17710300586055], "isSelected": false, "rotationAxis": "y"}, {"id": "box11", "size": 0.9674078748913354, "color": "hsl(35.259289042684884, 100%, 50%)", "speed": 1.245264761314669, "position": [0.7647282927630381, 0.3484783101854005, -1.322613420149787], "isSelected": false, "rotationAxis": "x"}, {"id": "box12", "size": 0.8795690816606819, "color": "hsl(116.29945915572011, 100%, 50%)", "speed": 2.137201059478072, "position": [-1.519178276022033, -2.413204276759405, -2.745490425308397], "isSelected": false, "rotationAxis": "x"}, {"id": "box13", "size": 1.211159185796213, "color": "hsl(94.31567034385999, 100%, 50%)", "speed": 2.327250997449538, "position": [-2.420186919876959, 1.333574370082152, 2.065078117731764], "isSelected": false, "rotationAxis": "x"}, {"id": "box14", "size": 1.09052867214886, "color": "hsl(290.72708764180874, 100%, 50%)", "speed": 0.6489558345551458, "position": [2.80729288580298, 2.324459270064446, 1.036494771459835], "isSelected": false, "rotationAxis": "x"}, {"id": "box15", "size": 1.119406237205471, "color": "hsl(220.82818129208246, 100%, 50%)", "speed": 1.128364953010571, "position": [1.427301810989135, 1.931186113363578, -2.139914782171061], "isSelected": false, "rotationAxis": "x"}, {"id": "box16", "size": 1.158359676169656, "color": "hsl(12.767258984224652, 100%, 50%)", "speed": 0.6187831361626466, "position": [-2.002447817673886, -2.048884686057117, -1.988839272644793], "isSelected": false, "rotationAxis": "x"}, {"id": "box17", "size": 1.015833364657773, "color": "hsl(126.4261894793568, 100%, 50%)", "speed": 2.1089455697206, "position": [1.983384969044297, 0.0008953380851197679, 0.1477023293934705], "isSelected": false, "rotationAxis": "x"}, {"id": "box18", "size": 0.9133507568359451, "color": "hsl(242.55430805487646, 100%, 50%)", "speed": 1.936674032542365, "position": [-2.28510133041597, -2.57784756889221, -1.946667103707953], "isSelected": false, "rotationAxis": "x"}, {"id": "box19", "size": 1.18487459165266, "color": "hsl(158.92938353766635, 100%, 50%)", "speed": 1.720693025336103, "position": [0.9513574099557518, -0.8149219527583207, 2.814717331093558], "isSelected": false, "rotationAxis": "y"}, {"id": "box20", "size": 1.246956807946895, "color": "hsl(330.4530173098357, 100%, 50%)", "speed": 2.304256475232838, "position": [-0.7612392460646156, -0.329848095444484, -0.4545283831177827], "isSelected": false, "rotationAxis": "x"}, {"id": "box21", "size": 1.177758612029403, "color": "hsl(172.3824395794476, 100%, 50%)", "speed": 1.37152136727906, "position": [0.6493921431440932, 1.372614737367166, 1.453076085602025], "isSelected": false, "rotationAxis": "y"}], "selectedBoxId": "box21", "backgroundColor": "#FFB3E3"}
cm2nxgdh30006wor7jxir70zr	Rotating Boxes	\N	user_2nqTqZWY3DapP6VicrpltTz4IdT	2024-10-24 23:21:28.116	2024-10-25 18:25:35.518	0	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 1.289206341954714, "color": "hsl(217.3335397451344, 100%, 50%)", "speed": 0.6818126802183389, "position": [-1.608417693470166, 1.718659510345807, 2.383991784609725], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 0.852323871137791, "color": "hsl(353.57460588111917, 100%, 50%)", "speed": 2.378882197214566, "position": [1.372230023971955, 0.2984642113787053, -0.1982951712010435], "isSelected": false, "rotationAxis": "y"}, {"id": "box5", "size": 1.016396393391475, "color": "hsl(245.863035366122, 100%, 50%)", "speed": 2.066680120523149, "position": [0.4386197359562849, 2.856941167378961, 2.27874150802019], "isSelected": false, "rotationAxis": "y"}, {"id": "box6", "size": 0.8119391553016077, "color": "hsl(224.3006167782725, 100%, 50%)", "speed": 1.1256059126317, "position": [-2.064665938678476, -2.309023017313944, -2.887247626591019], "isSelected": false, "rotationAxis": "x"}, {"id": "box7", "size": 1.085975830008166, "color": "hsl(103.15713812729194, 100%, 50%)", "speed": 1.737456204547336, "position": [-0.3850611225472598, -2.506707428155273, 1.947592493686801], "isSelected": false, "rotationAxis": "y"}, {"id": "box8", "size": 1.136398009503312, "color": "hsl(337.0776688796318, 100%, 50%)", "speed": 1.146927905162977, "position": [-2.018842005139396, 2.881361323803715, 2.666467048902515], "isSelected": false, "rotationAxis": "x"}, {"id": "box9", "size": 0.9822484306996646, "color": "hsl(358.26578261168936, 100%, 50%)", "speed": 2.328670374732984, "position": [1.540339039389655, -2.638687662653864, -2.13742309961], "isSelected": false, "rotationAxis": "x"}, {"id": "box10", "size": 1.161007185199726, "color": "hsl(203.01987237671756, 100%, 50%)", "speed": 1.863482949903285, "position": [-0.7706625496185318, -1.949623890007531, -1.036054283324894], "isSelected": false, "rotationAxis": "y"}, {"id": "box11", "size": 0.9469416661397829, "color": "hsl(173.83127439263896, 100%, 50%)", "speed": 0.7723274702231495, "position": [-0.08065454023586272, 0.5580361228552309, -2.765027187641007], "isSelected": false, "rotationAxis": "x"}, {"id": "box12", "size": 0.9332653614691809, "color": "hsl(64.58753030405101, 100%, 50%)", "speed": 1.819517956664471, "position": [1.400763734676563, -2.61101607554613, -1.402499960400113], "isSelected": false, "rotationAxis": "y"}, {"id": "box13", "size": 0.9624762948724406, "color": "hsl(214.51064822004574, 100%, 50%)", "speed": 0.870117316210457, "position": [-2.976389104812796, -0.8391248782642755, -1.498374857562624], "isSelected": false, "rotationAxis": "y"}, {"id": "box14", "size": 1.128322478556606, "color": "hsl(315.8172642850621, 100%, 50%)", "speed": 1.339732344328478, "position": [-1.967935512798693, 2.216358513158007, 1.332392900032985], "isSelected": false, "rotationAxis": "y"}, {"id": "box15", "size": 0.8408853492513796, "color": "hsl(2.044296239397614, 100%, 50%)", "speed": 1.003462819207091, "position": [-1.441784012264287, 2.701759273784581, 2.103111797548808], "isSelected": false, "rotationAxis": "x"}, {"id": "box16", "size": 1.26318434705745, "color": "hsl(39.29571229950126, 100%, 50%)", "speed": 0.7536147513443372, "position": [2.902431672466738, -2.700842525729442, -2.756341702936296], "isSelected": false, "rotationAxis": "x"}, {"id": "box17", "size": 0.8554942113141656, "color": "hsl(144.2642449792777, 100%, 50%)", "speed": 0.7834837721126533, "position": [-2.040868277642348, 1.109533947653791, -1.36105530800678], "isSelected": false, "rotationAxis": "y"}, {"id": "box18", "size": 1.240710343225174, "color": "hsl(301.4013583855557, 100%, 50%)", "speed": 1.819144726676417, "position": [0.7483247406312805, -1.185501831133252, 1.315888464377425], "isSelected": false, "rotationAxis": "x"}, {"id": "box19", "size": 1.207225677182556, "color": "hsl(262.86473241910676, 100%, 50%)", "speed": 1.117359875345677, "position": [-2.148792691316353, -1.576424364504238, 1.838899496759923], "isSelected": false, "rotationAxis": "x"}, {"id": "box20", "size": 0.9465294772937427, "color": "hsl(323.1166709674592, 100%, 50%)", "speed": 0.7353634890980141, "position": [1.409385943082587, 1.098835029670933, 1.857833050700771], "isSelected": false, "rotationAxis": "x"}], "selectedBoxId": "box20", "backgroundColor": "#080808"}
cm2nx07fb0001wor79epjifay	Rotating Boxes	\N	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-24 23:08:53.78	2024-10-25 19:00:16.219	1	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 1.272662022181554, "color": "hsl(178.2804951053826, 100%, 50%)", "speed": 1.215411041626849, "position": [2.991829996227258, 1.428958261430323, 1.470845536866637], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 1.22036340343136, "color": "hsl(291.82912836386913, 100%, 50%)", "speed": 1.551281283092189, "position": [2.484260773347131, -2.198573308848254, 0.6071615130431649], "isSelected": false, "rotationAxis": "y"}, {"id": "box5", "size": 0.9900724063023758, "color": "hsl(272.48024039366453, 100%, 50%)", "speed": 1.37799494414759, "position": [2.316280518512679, 1.967477792622041, -2.234737824103666], "isSelected": false, "rotationAxis": "y"}, {"id": "box6", "size": 0.863678317817682, "color": "hsl(317.8771667498803, 100%, 50%)", "speed": 0.8040799870406921, "position": [-1.062684423565768, 2.727040287067403, -0.1332465206185427], "isSelected": false, "rotationAxis": "y"}, {"id": "box7", "size": 1.008038329084405, "color": "hsl(310.58736038047107, 100%, 50%)", "speed": 1.108532861745163, "position": [-0.8722535806474574, -0.7818559280530626, -2.351796538284684], "isSelected": false, "rotationAxis": "y"}, {"id": "box8", "size": 0.9457429832096206, "color": "hsl(138.55512298381285, 100%, 50%)", "speed": 1.832770693820932, "position": [2.609740133729327, -2.049327640629917, -1.377271763285586], "isSelected": false, "rotationAxis": "x"}, {"id": "box9", "size": 1.149134429286809, "color": "hsl(349.6863941641916, 100%, 50%)", "speed": 2.389465819162729, "position": [2.802474110175226, 1.611299325477363, -0.853786891098014], "isSelected": false, "rotationAxis": "x"}, {"id": "box10", "size": 1.203197535811177, "color": "hsl(332.37937475893335, 100%, 50%)", "speed": 0.531960594667535, "position": [2.457557628136882, 0.7348593439411495, 2.626959464274525], "isSelected": false, "rotationAxis": "x"}, {"id": "box11", "size": 0.9875941200313227, "color": "hsl(270.7530629130436, 100%, 50%)", "speed": 1.897998916046861, "position": [-0.4224704862186752, -0.6329065788674977, 1.301016386188106], "isSelected": false, "rotationAxis": "y"}, {"id": "box12", "size": 1.125118085600266, "color": "hsl(69.77051475143868, 100%, 50%)", "speed": 2.117829509733108, "position": [-1.079085007336666, 2.225937879017458, 2.27931220354473], "isSelected": false, "rotationAxis": "y"}, {"id": "box13", "size": 1.081357888601716, "color": "hsl(186.63228344191543, 100%, 50%)", "speed": 6.6, "position": [-1.951703311026538, -0.8410962567838323, 1.938524460629363], "isSelected": true, "rotationAxis": "x"}], "selectedBoxId": "box13", "backgroundColor": "#949bff"}
cm2nx4edq0003wor7qy8lxb7x	Rotating Boxes	\N	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-24 23:12:09.408	2024-10-25 19:59:28.824	0	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 1.177900004636114, "color": "hsl(18.291987817264868, 100%, 50%)", "speed": 2.104966566776063, "position": [2.663528437812234, -1.543410775155018, 2.270576609432926], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 1.129833385788881, "color": "hsl(13.267558448581482, 100%, 50%)", "speed": 1.161349065367388, "position": [-0.3915764642501265, 0.6211197619164421, 0.4851503711456804], "isSelected": false, "rotationAxis": "x"}, {"id": "box5", "size": 1.157893316261007, "color": "hsl(312.69681284109, 100%, 50%)", "speed": 0.6381016841891349, "position": [0.9791289133454733, 2.29283319771227, 1.381879769853333], "isSelected": false, "rotationAxis": "y"}, {"id": "box6", "size": 0.806312260011293, "color": "hsl(159.43329078948244, 100%, 50%)", "speed": 1.157570993731407, "position": [0.3909428623927234, -2.890704108921067, 0.4192450211217817], "isSelected": false, "rotationAxis": "y"}, {"id": "box7", "size": 0.9716701148994633, "color": "hsl(174.77049542249082, 100%, 50%)", "speed": 1.895115737345111, "position": [1.939605023589362, -1.097131465961615, -0.009415095834765186], "isSelected": false, "rotationAxis": "x"}, {"id": "box8", "size": 0.8462296376077297, "color": "hsl(22.454226398797566, 100%, 50%)", "speed": 1.546786200955611, "position": [2.676612914326265, 1.43041044259627, -1.896013944833863], "isSelected": false, "rotationAxis": "x"}, {"id": "box9", "size": 1.015921537236802, "color": "hsl(6.396117768716714, 100%, 50%)", "speed": 0.8666402051841353, "position": [-0.07506659195299292, -1.725642384335439, 2.388374580407742], "isSelected": false, "rotationAxis": "y"}, {"id": "box10", "size": 0.8509409418649245, "color": "hsl(353.7190624188196, 100%, 50%)", "speed": 2.115546627095849, "position": [-1.631197659406293, -1.094823952789302, 2.904146122116665], "isSelected": false, "rotationAxis": "y"}, {"id": "box11", "size": 1.023297606147914, "color": "hsl(297.76013710912656, 100%, 50%)", "speed": 1.580307704549108, "position": [2.351909533191696, 0.1866961840040382, 1.792541518340979], "isSelected": false, "rotationAxis": "y"}, {"id": "box12", "size": 1.281926554231003, "color": "hsl(287.4435292567991, 100%, 50%)", "speed": 2.24729625071342, "position": [-2.655683489270672, -2.296806537094762, 1.417560106505994], "isSelected": false, "rotationAxis": "x"}, {"id": "box13", "size": 1.064406431135379, "color": "hsl(228.53211706648455, 100%, 50%)", "speed": 2.339583601431498, "position": [-2.947419522951167, 2.00393023105469, 0.9229791933806974], "isSelected": false, "rotationAxis": "y"}, {"id": "box14", "size": 1.041888119845392, "color": "hsl(230.80109054324606, 100%, 50%)", "speed": 2.281190661289882, "position": [1.524081926362991, 0.6169367525430922, 0.5425399293338762], "isSelected": false, "rotationAxis": "y"}, {"id": "box15", "size": 1.080198780737672, "color": "hsl(82.52269442908042, 100%, 50%)", "speed": 2.019446911272209, "position": [-1.151777709579111, 2.131330026195578, 0.5765533801477685], "isSelected": false, "rotationAxis": "x"}, {"id": "box16", "size": 0.8924053092595039, "color": "hsl(179.36193062200272, 100%, 50%)", "speed": 1.546725590134108, "position": [-0.3060642961773299, 1.503966065308234, 1.504779659966049], "isSelected": false, "rotationAxis": "y"}, {"id": "box17", "size": 0.8729956506957833, "color": "hsl(24.294682475677654, 100%, 50%)", "speed": 2.440566508002227, "position": [-0.5513760701313579, 0.05769236778048192, 1.720929006263084], "isSelected": false, "rotationAxis": "y"}, {"id": "box18", "size": 0.9728311972476344, "color": "hsl(61.79344152156669, 100%, 50%)", "speed": 2.292331123971631, "position": [0.6359857177855828, -2.613351202914461, -1.577939473252159], "isSelected": false, "rotationAxis": "x"}, {"id": "box19", "size": 0.960457785430059, "color": "hsl(225.06245846604514, 100%, 50%)", "speed": 0.7413040552536452, "position": [0.6479978227071519, -2.594500875519706, 2.846500719735718], "isSelected": false, "rotationAxis": "y"}, {"id": "box20", "size": 1.202771860418355, "color": "hsl(270.3655119582453, 100%, 50%)", "speed": 1.611458277375232, "position": [0.7448458691394193, -0.7844527511670787, -1.07014233500422], "isSelected": false, "rotationAxis": "y"}, {"id": "box21", "size": 1.104390106880803, "color": "hsl(36.69443006826103, 100%, 50%)", "speed": 0.6525394466503598, "position": [1.480155383886872, 1.726497456323463, -1.835600654238135], "isSelected": false, "rotationAxis": "y"}, {"id": "box22", "size": 1.161949842255505, "color": "hsl(337.91446189017825, 100%, 50%)", "speed": 2.299731354785684, "position": [2.016500515663701, -0.2151090481764224, 2.546515201652174], "isSelected": false, "rotationAxis": "y"}, {"id": "box23", "size": 0.8097527339166734, "color": "hsl(65.1882952370032, 100%, 50%)", "speed": 1.65291688951051, "position": [-2.926838439775187, 0.7288784023055448, -0.8899892996896628], "isSelected": false, "rotationAxis": "y"}, {"id": "box24", "size": 1.212212856260252, "color": "hsl(156.70662028463605, 100%, 50%)", "speed": 1.724689470890869, "position": [0.364846319919661, -0.469055702949905, 2.422012576546877], "isSelected": false, "rotationAxis": "y"}, {"id": "box25", "size": 1.244786489696306, "color": "hsl(137.7168459672997, 100%, 50%)", "speed": 1.505101502545471, "position": [1.744119363450592, 0.7357527520825657, 1.994340777676882], "isSelected": false, "rotationAxis": "x"}, {"id": "box26", "size": 0.843656860528134, "color": "hsl(190.07075505523787, 100%, 50%)", "speed": 0.5411915534553513, "position": [-1.848427649469982, -0.1310314688941201, 2.802290252002397], "isSelected": false, "rotationAxis": "x"}, {"id": "box27", "size": 0.8567705398214479, "color": "hsl(92.3875409519377, 100%, 50%)", "speed": 2.056981374992942, "position": [0.5697730830214858, -1.017425692775815, -2.698359668174387], "isSelected": false, "rotationAxis": "y"}, {"id": "box28", "size": 1.298702634878065, "color": "hsl(31.47100823022388, 100%, 50%)", "speed": 0.9535537672619938, "position": [2.76331069520338, 2.401964863205741, 1.398472779092596], "isSelected": false, "rotationAxis": "y"}, {"id": "box29", "size": 1.050307548390069, "color": "hsl(100.78199074922854, 100%, 50%)", "speed": 0.5763052001901197, "position": [2.781538686239401, 2.384075827130058, -1.680451748849102], "isSelected": false, "rotationAxis": "x"}, {"id": "box30", "size": 1.052184570774753, "color": "hsl(263.1979765533368, 100%, 50%)", "speed": 0.9863019401970989, "position": [-1.225071829926348, 1.174276303273921, 1.283213360358673], "isSelected": false, "rotationAxis": "x"}, {"id": "box31", "size": 1.171133825443911, "color": "hsl(304.20588486247, 100%, 50%)", "speed": 0.9760549864258601, "position": [-2.855067982541282, 0.3800372211194367, -1.950679256961223], "isSelected": false, "rotationAxis": "y"}, {"id": "box32", "size": 0.8211379398858324, "color": "hsl(330.10956903584116, 100%, 50%)", "speed": 0.8198196500762274, "position": [0.3996066422047129, -1.718887812859239, 0.5107270696234885], "isSelected": false, "rotationAxis": "y"}, {"id": "box33", "size": 1.003889783749642, "color": "hsl(205.23660566658316, 100%, 50%)", "speed": 0.5676013730791634, "position": [-2.115153928545803, -2.390165776378439, -0.1520674649327902], "isSelected": false, "rotationAxis": "y"}, {"id": "box34", "size": 0.8016947859886105, "color": "hsl(111.24316449140122, 100%, 50%)", "speed": 1.543957279873323, "position": [1.920584932083298, 1.928775492010653, 1.737119284421846], "isSelected": false, "rotationAxis": "x"}, {"id": "box35", "size": 1.110843732298838, "color": "hsl(69.5582463451022, 100%, 50%)", "speed": 2.235960319295933, "position": [0.9453342644260117, 2.995196679405421, 0.8156633078800231], "isSelected": false, "rotationAxis": "y"}, {"id": "box36", "size": 0.9185867615692084, "color": "hsl(257.75934242511914, 100%, 50%)", "speed": 0.9790400728255149, "position": [-2.879587489928453, -0.5722541235432455, -1.981601508968764], "isSelected": false, "rotationAxis": "x"}, {"id": "box37", "size": 0.8246130847573614, "color": "hsl(103.16110648668032, 100%, 50%)", "speed": 1.123774880244056, "position": [-2.520155963659636, 1.253794087925833, 0.3057662287223266], "isSelected": false, "rotationAxis": "x"}, {"id": "box38", "size": 0.8573379710782064, "color": "hsl(184.85395405527123, 100%, 50%)", "speed": 0.6929047286530987, "position": [0.02017797005212252, 1.588219660305234, -0.03287941908264136], "isSelected": false, "rotationAxis": "y"}, {"id": "box39", "size": 0.8484783222159654, "color": "hsl(23.587108134109755, 100%, 50%)", "speed": 1.00330909498681, "position": [2.37760079486592, 1.042832414904058, -0.6476782486126527], "isSelected": false, "rotationAxis": "y"}], "selectedBoxId": "box39", "backgroundColor": "#fff5b3"}
cm2nxjidj0008wor7rilt2m5a	Rotating Boxes	\N	user_2nqTqZWY3DapP6VicrpltTz4IdT	2024-10-24 23:23:54.436	2024-10-25 19:59:31.559	0	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 1.183354643479652, "color": "hsl(286.3436368460338, 100%, 50%)", "speed": 1.807485736760434, "position": [-2.802692385972126, -1.069956332915696, 1.757427381693518], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 0.8444774708913311, "color": "hsl(156.7959849689689, 100%, 50%)", "speed": 1.213656727578917, "position": [-0.06434296419234675, 2.484818438558568, 2.13302156780132], "isSelected": false, "rotationAxis": "y"}, {"id": "box5", "size": 0.8499047740838788, "color": "hsl(233.36109976588358, 100%, 50%)", "speed": 1.632013544208369, "position": [1.872906544053947, 1.678386203006998, -1.131574430123924], "isSelected": false, "rotationAxis": "x"}, {"id": "box6", "size": 0.825543817138318, "color": "hsl(102.73005927733563, 100%, 50%)", "speed": 1.305670005303404, "position": [-0.1704317306952445, -2.844144969528323, -2.176739670610276], "isSelected": false, "rotationAxis": "y"}, {"id": "box7", "size": 0.8096919288373214, "color": "hsl(102.22879106154733, 100%, 50%)", "speed": 2.196289931694858, "position": [-0.8106154167942918, -2.993650556067, 0.4488334117636636], "isSelected": false, "rotationAxis": "x"}, {"id": "box8", "size": 1.15808995410422, "color": "hsl(88.17237348347385, 100%, 50%)", "speed": 0.5626102857081321, "position": [-0.8487059913268231, 2.636049456987961, 1.492343958787639], "isSelected": false, "rotationAxis": "x"}, {"id": "box9", "size": 1.091903526892622, "color": "hsl(206.1668790416881, 100%, 50%)", "speed": 1.519306504035943, "position": [2.44540994112649, 0.8445538336909326, 0.1864348379915244], "isSelected": false, "rotationAxis": "x"}, {"id": "box10", "size": 1.027757462495556, "color": "hsl(56.825046241515345, 100%, 50%)", "speed": 1.438559740290876, "position": [-1.31297666837546, -2.177424592261839, 0.3206762633300144], "isSelected": false, "rotationAxis": "x"}, {"id": "box11", "size": 1.046252007051255, "color": "hsl(105.08981855142285, 100%, 50%)", "speed": 0.8160252083439508, "position": [1.662149938461544, -2.284118114790803, -0.9114056784040399], "isSelected": false, "rotationAxis": "x"}, {"id": "box12", "size": 1.116664426592378, "color": "hsl(350.10544000793016, 100%, 50%)", "speed": 0.8032893191102266, "position": [-1.250653576718525, 0.956217247827782, 1.159478419712727], "isSelected": false, "rotationAxis": "y"}, {"id": "box13", "size": 0.8900391361711377, "color": "hsl(176.81418673656316, 100%, 50%)", "speed": 1.207598606060051, "position": [0.8663268106775299, 2.595720591699305, 2.778217604606077], "isSelected": false, "rotationAxis": "y"}, {"id": "box14", "size": 1.222317087899427, "color": "hsl(207.78065151950017, 100%, 50%)", "speed": 1.085240122798262, "position": [-2.923521332554788, 2.238595188441364, -2.783218977977898], "isSelected": false, "rotationAxis": "y"}, {"id": "box15", "size": 1.20683794527811, "color": "hsl(142.22741211555658, 100%, 50%)", "speed": 1.756439224779319, "position": [-2.275988096521151, -1.627573786691822, 0.3730928921311567], "isSelected": false, "rotationAxis": "x"}, {"id": "box16", "size": 1.27399671659486, "color": "hsl(267.1732267813938, 100%, 50%)", "speed": 0.5272591761210914, "position": [-2.032507036811118, -2.088774271614239, -2.65308451255667], "isSelected": false, "rotationAxis": "x"}, {"id": "box17", "size": 0.8043335684556441, "color": "hsl(170.31776179216513, 100%, 50%)", "speed": 1.108879153802499, "position": [-2.969695303275689, 0.02391853828854762, -0.9378055268025496], "isSelected": false, "rotationAxis": "y"}, {"id": "box18", "size": 0.9166124775150052, "color": "hsl(23.955016819218677, 100%, 50%)", "speed": 1.652573032031736, "position": [-0.9300741567661226, -2.748723401130414, 2.633441187560705], "isSelected": false, "rotationAxis": "y"}, {"id": "box19", "size": 0.8781454309847179, "color": "hsl(13.347369452645506, 100%, 50%)", "speed": 1.578414796678451, "position": [2.783139561564906, -0.1613606637338272, 0.9435769241636276], "isSelected": false, "rotationAxis": "x"}, {"id": "box20", "size": 1.264129514872641, "color": "hsl(122.37883942534872, 100%, 50%)", "speed": 1.795683940348591, "position": [-0.5787516910060311, 2.192120290558789, -0.5045744310332951], "isSelected": false, "rotationAxis": "x"}, {"id": "box21", "size": 0.8940033197557062, "color": "hsl(89.93993400257816, 100%, 50%)", "speed": 0.623193431618271, "position": [-2.131226982666637, 1.18103757275642, 0.8082741788699495], "isSelected": false, "rotationAxis": "x"}], "selectedBoxId": "box21", "backgroundColor": "#84bf78"}
cm2o7fqcu00015n1w7iac82t8	Rotating Boxes	\N	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-25 04:00:54.314	2024-10-25 18:28:27.197	1	{"boxes": [{"id": "box1", "size": 1, "color": "#00ff00", "speed": 1, "position": [-2, 0, 0], "isSelected": false, "rotationAxis": "x"}, {"id": "box2", "size": 1.2, "color": "#00ffff", "speed": 0.5, "position": [1.2, 0, 0], "isSelected": false, "rotationAxis": "y"}, {"id": "box3", "size": 1.122614504948807, "color": "hsl(194.09381944064972, 100%, 50%)", "speed": 0.6626033399685181, "position": [-0.540654479177439, -2.972977715081491, 2.332990794252938], "isSelected": false, "rotationAxis": "x"}, {"id": "box4", "size": 1.07636394004619, "color": "hsl(119.03297153848153, 100%, 50%)", "speed": 1.230960298239076, "position": [-2.551665251097885, -0.2234397622321396, -0.7562647603573174], "isSelected": false, "rotationAxis": "x"}, {"id": "box5", "size": 0.9354361526937686, "color": "hsl(72.1194236849841, 100%, 50%)", "speed": 2.254743707622926, "position": [2.261101668173884, -0.4688612686429967, 2.995885458768559], "isSelected": false, "rotationAxis": "x"}, {"id": "box6", "size": 0.9310971308146252, "color": "hsl(165.46845167754432, 100%, 50%)", "speed": 2.185764844444894, "position": [0.1064331019089395, 0.6512243286446697, 2.88932554056464], "isSelected": false, "rotationAxis": "x"}, {"id": "box7", "size": 1.033654586448032, "color": "hsl(30.771515970650434, 100%, 50%)", "speed": 0.6648740567417, "position": [0.5561872091080358, -0.6488699694642617, 1.795048175816633], "isSelected": false, "rotationAxis": "x"}, {"id": "box8", "size": 1.205456508247786, "color": "hsl(152.15752055956082, 100%, 50%)", "speed": 2.074070895783295, "position": [-2.776777390782664, 1.534791372391258, 2.965348157563747], "isSelected": false, "rotationAxis": "y"}, {"id": "box9", "size": 1.12705833949942, "color": "hsl(312.23944367756144, 100%, 50%)", "speed": 0.6364014929007977, "position": [-0.8804967048902919, -0.3565380264437019, 1.307781897726066], "isSelected": false, "rotationAxis": "x"}, {"id": "box10", "size": 1.188321108301065, "color": "hsl(325.50932193181205, 100%, 50%)", "speed": 0.9830514127993251, "position": [1.39635376879698, -0.5006184077602462, -2.666958424198823], "isSelected": false, "rotationAxis": "y"}, {"id": "box11", "size": 0.8761518869200291, "color": "hsl(263.55137046280413, 100%, 50%)", "speed": 0.955523307972745, "position": [-0.421114250149103, 1.100732856272226, -0.5736103147158063], "isSelected": false, "rotationAxis": "x"}, {"id": "box12", "size": 0.8047492998810277, "color": "hsl(38.32158711095854, 100%, 50%)", "speed": 0.7384116343511056, "position": [-2.045890645017645, 0.7745362580934403, 0.6369860691417655], "isSelected": false, "rotationAxis": "x"}, {"id": "box13", "size": 1.121338250381813, "color": "hsl(166.50852429902238, 100%, 50%)", "speed": 2.364935176862144, "position": [-1.953562765963782, 2.856405324045021, 1.793221307840414], "isSelected": false, "rotationAxis": "x"}, {"id": "box14", "size": 0.9318628666705298, "color": "hsl(88.21928301413612, 100%, 50%)", "speed": 1.92822369082633, "position": [2.740118808250442, 1.200737141583211, 2.807691112438871], "isSelected": false, "rotationAxis": "y"}, {"id": "box15", "size": 0.8639566851405277, "color": "hsl(104.79022569389494, 100%, 50%)", "speed": 1.415544427559391, "position": [-1.515891116419049, -0.8124379361221861, -0.05586139827283576], "isSelected": false, "rotationAxis": "x"}, {"id": "box16", "size": 1.015252663430645, "color": "hsl(301.3900535629208, 100%, 50%)", "speed": 2.169197571270545, "position": [2.115700463867606, 1.524676357997135, 1.979059559904669], "isSelected": false, "rotationAxis": "y"}, {"id": "box17", "size": 0.8420531753110222, "color": "hsl(331.17426707852417, 100%, 50%)", "speed": 2.083034358054561, "position": [-2.887162147922332, 2.699286569699206, 1.046550290736635], "isSelected": false, "rotationAxis": "x"}, {"id": "box18", "size": 1.016309609907546, "color": "hsl(103.6834007993921, 100%, 50%)", "speed": 0.8371551453006201, "position": [1.416894573330111, -0.4194515740825611, 2.873463506719963], "isSelected": false, "rotationAxis": "x"}], "selectedBoxId": "box18", "backgroundColor": "#332a0a"}
\.


--
-- Data for Name: Favourite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favourite" (id, "artworkId", "userId", "createdAt") FROM stdin;
cm2p2fem5000bw69efgdb8602	cm2o7fqcu00015n1w7iac82t8	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-25 18:28:27.197
cm2p3i6rt000hw69e8cnzksmz	cm2nxpvge000bwor7u2ynb6tz	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-25 18:58:36.618
cm2p3kbmj000jw69e76mucpex	cm2nx07fb0001wor79epjifay	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC	2024-10-25 19:00:16.219
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, username, email, name, bio, "createdAt", "updatedAt", clerk_id) FROM stdin;
cm2nijheb0000fhtf9hdd8f8m	kmankan	malink027@gmail.com	mahlen	\N	2024-10-24 16:23:58.931	2024-10-24 16:23:58.931	user_2nrpkFoS6GneJzWEQ4PNeV2iNfC
cm2nj1ore0001fhtfuq3886tj	\N	malin.kankanamge@gmail.com	Malin	\N	2024-10-24 16:38:08.282	2024-10-24 16:38:08.282	user_2ntMOfIJkoWzlsE8kWM8sAbtoKG
cm2nxdrt00004wor7rxydspz0	\N	9mp6ypvrqd@privaterelay.appleid.com	Malin	\N	2024-10-24 23:19:26.724	2024-10-24 23:19:26.724	user_2nqTqZWY3DapP6VicrpltTz4IdT
cm2nxmwaf0009wor7wpyp5qe7	\N	mahlen.ty@gmail.com	Mahlen	\N	2024-10-24 23:26:32.439	2024-10-24 23:26:32.439	user_2nuA3jNX553Fal910wqsUEnYq9h
cm2ny59sa000011yf3x3kn5er	\N	jacobwaldor@gmail.com	\N	\N	2024-10-24 23:40:49.738	2024-10-24 23:40:49.738	user_2nuBnYc8cs8mSn211CcyaEeVtJ6
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6d516e99-8037-4547-84cd-58155bfbc336	db45bc2b2272a5ef222e34f6c92b182207a044bc449d99df600058bc342a8ef9	2024-10-22 23:52:23.236915+00	20241022235223_init	\N	\N	2024-10-22 23:52:23.2272+00	1
9d58e0a9-cc0f-459c-8a1b-338a7fc1d63f	775abc0b28424b79b5db8cb5f29b1f58de3a91aeccdb6c5870f47b92d36ee06e	2024-10-23 00:24:02.781567+00	20241023002402_change_config_to_state	\N	\N	2024-10-23 00:24:02.77761+00	1
0f680921-d8ed-429a-9b23-88ca0576d7ca	239f03f8077910712b6c3fe0695714e5a76b490a92b36506ee6f925f1edc42ee	2024-10-24 01:52:49.16726+00	20241024015249_clerk_id_as_relation	\N	\N	2024-10-24 01:52:49.153439+00	1
c6cda101-d841-4557-ab1a-88c76b666e73	f5e58b6e465544918889a4354b2a476c2f81e90f313ad5f4822d7c847c624253	2024-10-24 06:05:14.673399+00	20241024060514_name_optional	\N	\N	2024-10-24 06:05:14.670704+00	1
\.


--
-- Name: Artwork Artwork_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Artwork"
    ADD CONSTRAINT "Artwork_pkey" PRIMARY KEY (id);


--
-- Name: Favourite Favourite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favourite"
    ADD CONSTRAINT "Favourite_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Favourite_artworkId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Favourite_artworkId_userId_key" ON public."Favourite" USING btree ("artworkId", "userId");


--
-- Name: User_clerk_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_clerk_id_idx" ON public."User" USING btree (clerk_id);


--
-- Name: User_clerk_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_clerk_id_key" ON public."User" USING btree (clerk_id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_username_idx" ON public."User" USING btree (username);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Artwork Artwork_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Artwork"
    ADD CONSTRAINT "Artwork_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(clerk_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favourite Favourite_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favourite"
    ADD CONSTRAINT "Favourite_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artwork"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favourite Favourite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favourite"
    ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(clerk_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

