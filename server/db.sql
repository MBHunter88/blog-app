--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

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
-- Name: comments; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying,
    post_id integer,
    author character varying,
    sentiment_score integer
);


ALTER TABLE public.comments OWNER TO mj;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO mj;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    content character varying,
    title character varying,
    author character varying,
    date timestamp with time zone DEFAULT now()
);


ALTER TABLE public.posts OWNER TO mj;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO mj;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.posts.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.comments (id, content, post_id, author, sentiment_score) FROM stdin;
1	This is a test comment	1	John Smith	\N
2	This is a another test comment	1	Joe Brown	\N
7	This is a test comment. 	2	Jane Doe	\N
9	This is the best test comment to test the amazing sentiment API. 	3	Brad	2
10	This is the freakin' worst comment to test the awful sentiment API.	1	Chad	-3
12	This is another neutral test comment. 	4	Beyonce	\N
15	I really like test comments they are the best. 	2	Brittney	2
14	I really hate test comments, they are dumb.	3	Joey	-3
8	This is the best comment to test the wonderful sentiment API. 	1	Mindy	5
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.posts (id, content, title, author, date) FROM stdin;
1	For years, I found deep fulfillment in my role as a postpartum doula, helping families through one of the most transformative experiences of their lives: parenthood. The gratitude that parents express after you've been with them during their most vulnerable moments filled my cup. But even in this incredibly meaningful career, I felt a calling to explore something new—a challenge that would push me to grow in ways I hadn’t yet imagined.\nA Growing Curiosity for Technology\nAs a postpartum doula, I utilized technology that helps parents during the postpartum period from tracking apps to biometric sleep monitors. Over time, I realized that instead of just being a consumer of these tools, I wanted to be the one creating them. The idea of being able to develop software that could directly help parents, children, and even other birth workers was an exciting possibility.\nThe Decision to Pivot\nDeciding to pivot from a well-established career wasn’t easy. I had built strong relationships with clients, and my identity was tied to being a doula. However, the tech industry offered me a way to not only continue helping others but also to reach a broader audience with innovative solutions. After researching what makes a great software engineer, I realized I possessed many of the necessary characteristics and qualities, such as curiosity and problem-solving skills. So I decided to begin my search for training programs.\nDuring my search, my wife and I suffered the tragic loss of our twin boys who were born pre-term, which devastated us emotionally and financially, making many coding boot camps no longer viable options.\nThen I discovered Techtonica - a program that promotes economic empowerment for the underrepresented and it felt like a light at the end of the tunnel. The opportunity, combined with Techtonica’s mission that resonated with my values, made it an easy choice. I was determined to give myself the best shot at being selected for the upcoming cohort. Coding became a way for me to channel my grief into something productive and hopeful. What finally convinced me was the realization that the skills I had honed as a doula—empathy, problem-solving, resilience—were just as valuable in the world of software development.\nWhat I’ve Learned So Far\nThe journey hasn’t been easy. Coding nonstop, late nights debugging, and moments of feeling like I didn’t belong in the tech world have all been part of my story. But each small victory—whether it was successfully learning React or building my first full-stack project—reminded me that I made the right choice.\nTransitioning into tech isn’t about leaving behind the work I loved; it’s about building on it. I can already see how my understanding of human connection, support, and communication helps me approach tech projects in a unique way. I’m excited to see where this journey takes me, and how I can bridge the gap between birth work and technology to create something meaningful.\n\n\n	Career Change at 36...Why Not?	MJBH	2024-10-02 20:00:22.28752-07
2	As a doula, I was often faced with unexpected challenges—whether it was helping a new mother adjust to sleepless nights or guiding a family through complex postpartum issues. These moments taught me to approach problems with a calm and steady mindset, always thinking a few steps ahead. It wasn’t just about finding quick fixes; it was about truly understanding the situation and offering solutions that would benefit the family in the long term.\n\nWhen I transitioned into software development, I realized this problem-solving mindset was one of my greatest assets. Coding, in its essence, is about solving problems, and often the solutions aren't immediately apparent. Debugging, for example, can be just as unpredictable as a newborn's sleep schedule, but the patience and resilience I developed as a doula helped me navigate those late-night coding sessions.\n\nI’ve found that the skills of active listening and observation, which were essential in my birth work, have transferred seamlessly into coding. In both cases, it’s about taking a step back, carefully assessing the issue, and then methodically working through possible solutions.\n\nHere are some specific parallels I’ve discovered:\n\nPattern Recognition: In postpartum care, every family has unique needs, but there are patterns that emerge, just like in coding. Recognizing these patterns helps you troubleshoot more efficiently.\nEmpathy in User-Centered Design: As a doula, empathy is essential to understanding what new parents need, even when they can’t articulate it themselves. In tech, this translates into user-centered design—creating tools that truly meet the needs of users, even if they aren’t fully aware of what those needs are.\nStaying Calm Under Pressure: In both careers, things can go wrong quickly, and maintaining calm helps to find the right solution without panic.\nBy applying the doula's problem-solving mindset to software development, I’ve been able to approach each coding challenge with a level of patience and clarity that’s been incredibly valuable.	The Doula's Problem-Solving Mindset in Software Development	MJBH	2024-10-04 09:46:04.576613-07
4	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor nulla a tortor tincidunt, non fringilla libero efficitur. Cras viverra lacinia sem non scelerisque. Donec scelerisque lectus nec sapien suscipit interdum. Nam interdum ultricies magna vel sollicitudin. Etiam luctus purus a tortor posuere, at convallis nunc scelerisque. Sed a diam at sapien egestas vestibulum. Cras vitae tortor ut libero vehicula volutpat. Curabitur vehicula libero ut purus vulputate lobortis. Mauris in felis vel velit auctor faucibus. Vivamus tristique justo vel neque faucibus, et facilisis dolor tincidunt. Nam eget augue et eros ullamcorper auctor ac et leo. Aliquam dapibus, dui vitae pretium elementum, lorem arcu posuere libero, sit amet scelerisque magna nunc a velit.	From Birth Plans to Code Reviews: How I Manage Stress in Tech	MJBH	\N
7	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor nulla a tortor tincidunt, non fringilla libero efficitur. Cras viverra lacinia sem non scelerisque. Donec scelerisque lectus nec sapien suscipit interdum. Nam interdum ultricies magna vel sollicitudin. Etiam luctus purus a tortor posuere, at convallis nunc scelerisque. Sed a diam at sapien egestas vestibulum. Cras vitae tortor ut libero vehicula volutpat. Curabitur vehicula libero ut purus vulputate lobortis. Mauris in felis vel velit auctor faucibus. Vivamus tristique justo vel neque faucibus, et facilisis dolor tincidunt. Nam eget augue et eros ullamcorper auctor ac et leo. Aliquam dapibus, dui vitae pretium elementum, lorem arcu posuere libero, sit amet scelerisque magna nunc a velit.	Building My First Full-Stack Project: Lessons Learned and Wins	MJBH	\N
8	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor nulla a tortor tincidunt, non fringilla libero efficitur. Cras viverra lacinia sem non scelerisque. Donec scelerisque lectus nec sapien suscipit interdum. Nam interdum ultricies magna vel sollicitudin. Etiam luctus purus a tortor posuere, at convallis nunc scelerisque. Sed a diam at sapien egestas vestibulum. Cras vitae tortor ut libero vehicula volutpat. Curabitur vehicula libero ut purus vulputate lobortis. Mauris in felis vel velit auctor faucibus. Vivamus tristique justo vel neque faucibus, et facilisis dolor tincidunt. Nam eget augue et eros ullamcorper auctor ac et leo. Aliquam dapibus, dui vitae pretium elementum, lorem arcu posuere libero, sit amet scelerisque magna nunc a velit.	The Intersection of Tech and Maternal Care: My Vision for the Future	MJBH	\N
3	One of the most rewarding aspects of being a doula was working closely with families to ensure they felt supported and heard during a critical time in their lives. There’s an art to understanding what people need, even if they can’t fully express it, and offering your expertise in a way that empowers them to feel confident. I never imposed solutions; instead, I collaborated with families to find what worked best for them.\n\nNow, as I move through the tech world, I realize how essential collaboration is in software development as well. The stereotype of a lone coder hunched over their computer doesn’t fully capture what modern tech work looks like. It’s highly collaborative—whether it's pairing with another developer, working with designers, or taking feedback from end users. And just like in birth work, the goal is to build something together that truly works for everyone involved.\n\nI’ve also noticed how my ability to collaborate under stress has become one of my greatest strengths. During birth work, emotions run high, and there are often moments where things don’t go as planned. My job was to remain grounded and work with the team to ensure the best outcome for everyone. In tech, there are similarly high-pressure moments, especially during deadlines or when critical bugs emerge. The ability to stay calm and communicate clearly is just as crucial.\n\nSome things I’ve learned about collaboration from my journey:\n\nActive Listening: In birth work, listening was key to providing the best care. Now, I’ve found that listening to other developers, designers, and clients leads to better products because we can incorporate a wide range of perspectives.\nFlexible Thinking: Birth plans change, just like project requirements. Being open to flexibility and adaptation is a vital skill I’ve carried over into the tech world.\nTeam Trust: Just like families trusted me during vulnerable moments, I’ve learned that trust is equally important in a tech team. Trusting that everyone is doing their best work, and communicating openly when things go wrong, has been a cornerstone of every successful project I’ve been part of so far.\nThrough both careers, I've come to realize that the key to success is simple: work together, stay flexible, and remember that every challenge is an opportunity to learn.\n\n	From Supporting Families to Supporting Teams: Collaboration in Tech	MJBH	2024-10-04 09:46:20.732819-07
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.comments_id_seq', 17, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.post_id_seq', 8, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: posts post_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: comments post_id; Type: FK CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- PostgreSQL database dump complete
--

