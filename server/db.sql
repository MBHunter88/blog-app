--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Homebrew)

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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying,
    post_id integer,
    author character varying,
    sentiment_score integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    content character varying,
    title character varying,
    author character varying,
    date timestamp with time zone DEFAULT now(),
    approved boolean DEFAULT true
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_seq OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.posts.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, content, title, author, date, approved) FROM stdin;
1	For years, I found deep fulfillment in my role as a postpartum doula, helping families through one of the most transformative experiences of their lives: parenthood. The gratitude that parents express after you've been with them during their most vulnerable moments filled my cup. But even in this incredibly meaningful career, I felt a calling to explore something new—a challenge that would push me to grow in ways I hadn’t yet imagined.\\nA Growing Curiosity for Technology\\nAs a postpartum doula, I utilized technology that helps parents during the postpartum period from tracking apps to biometric sleep monitors. Over time, I realized that instead of just being a consumer of these tools, I wanted to be the one creating them. The idea of being able to develop software that could directly help parents, children, and even other birth workers was an exciting possibility.\\nThe Decision to Pivot\\nDeciding to pivot from a well-established career wasn’t easy. I had built strong relationships with clients, and my identity was tied to being a doula. However, the tech industry offered me a way to not only continue helping others but also to reach a broader audience with innovative solutions. After researching what makes a great software engineer, I realized I possessed many of the necessary characteristics and qualities, such as curiosity and problem-solving skills. So I decided to begin my search for training programs.\\nDuring my search, my wife and I suffered the tragic loss of our twin boys who were born pre-term, which devastated us emotionally and financially, making many coding boot camps no longer viable options.\\nThen I discovered Techtonica - a program that promotes economic empowerment for the underrepresented and it felt like a light at the end of the tunnel. The opportunity, combined with Techtonica’s mission that resonated with my values, made it an easy choice. I was determined to give myself the best shot at being selected for the upcoming cohort. Coding became a way for me to channel my grief into something productive and hopeful. What finally convinced me was the realization that the skills I had honed as a doula—empathy, problem-solving, resilience—were just as valuable in the world of software development.\\nWhat I’ve Learned So Far\\nThe journey hasn’t been easy. Coding nonstop, late nights debugging, and moments of feeling like I didn’t belong in the tech world have all been part of my story. But each small victory—whether it was successfully learning React or building my first full-stack project—reminded me that I made the right choice.\\nTransitioning into tech isn’t about leaving behind the work I loved; it’s about building on it. I can already see how my understanding of human connection, support, and communication helps me approach tech projects in a unique way. I’m excited to see where this journey takes me, and how I can bridge the gap between birth work and technology to create something meaningful.\\n\\n\\n	Career Change at 36...Why Not?	MJBH	2024-10-03 03:00:22.28752+00	t
2	As a doula, I was often faced with unexpected challenges—whether it was helping a new mother adjust to sleepless nights or guiding a family through complex postpartum issues. These moments taught me to approach problems with a calm and steady mindset, always thinking a few steps ahead. It wasn’t just about finding quick fixes; it was about truly understanding the situation and offering solutions that would benefit the family in the long term.\\n\\nWhen I transitioned into software development, I realized this problem-solving mindset was one of my greatest assets. Coding, in its essence, is about solving problems, and often the solutions aren't immediately apparent. Debugging, for example, can be just as unpredictable as a newborn's sleep schedule, but the patience and resilience I developed as a doula helped me navigate those late-night coding sessions.\\n\\nI’ve found that the skills of active listening and observation, which were essential in my birth work, have transferred seamlessly into coding. In both cases, it’s about taking a step back, carefully assessing the issue, and then methodically working through possible solutions.\\n\\nHere are some specific parallels I’ve discovered:\\n\\nPattern Recognition: In postpartum care, every family has unique needs, but there are patterns that emerge, just like in coding. Recognizing these patterns helps you troubleshoot more efficiently.\\nEmpathy in User-Centered Design: As a doula, empathy is essential to understanding what new parents need, even when they can’t articulate it themselves. In tech, this translates into user-centered design—creating tools that truly meet the needs of users, even if they aren’t fully aware of what those needs are.\\nStaying Calm Under Pressure: In both careers, things can go wrong quickly, and maintaining calm helps to find the right solution without panic.\\nBy applying the doula's problem-solving mindset to software development, I’ve been able to approach each coding challenge with a level of patience and clarity that’s been incredibly valuable.	The Doula's Problem-Solving Mindset in Software Development	MJBH	2024-10-04 16:46:04.576613+00	t
3	One of the most rewarding aspects of being a doula was working closely with families to ensure they felt supported and heard during a critical time in their lives. There’s an art to understanding what people need, even if they can’t fully express it, and offering your expertise in a way that empowers them to feel confident. I never imposed solutions; instead, I collaborated with families to find what worked best for them.\\n\\nNow, as I move through the tech world, I realize how essential collaboration is in software development as well. The stereotype of a lone coder hunched over their computer doesn’t fully capture what modern tech work looks like. It’s highly collaborative—whether it's pairing with another developer, working with designers, or taking feedback from end users. And just like in birth work, the goal is to build something together that truly works for everyone involved.\\n\\nI’ve also noticed how my ability to collaborate under stress has become one of my greatest strengths. During birth work, emotions run high, and there are often moments where things don’t go as planned. My job was to remain grounded and work with the team to ensure the best outcome for everyone. In tech, there are similarly high-pressure moments, especially during deadlines or when critical bugs emerge. The ability to stay calm and communicate clearly is just as crucial.\\n\\nSome things I’ve learned about collaboration from my journey:\\n\\nActive Listening: In birth work, listening was key to providing the best care. Now, I’ve found that listening to other developers, designers, and clients leads to better products because we can incorporate a wide range of perspectives.\\nFlexible Thinking: Birth plans change, just like project requirements. Being open to flexibility and adaptation is a vital skill I’ve carried over into the tech world.\\nTeam Trust: Just like families trusted me during vulnerable moments, I’ve learned that trust is equally important in a tech team. Trusting that everyone is doing their best work, and communicating openly when things go wrong, has been a cornerstone of every successful project I’ve been part of so far.\\nThrough both careers, I've come to realize that the key to success is simple: work together, stay flexible, and remember that every challenge is an opportunity to learn.\\n\\n	From Supporting Families to Supporting Teams: Collaboration in Tech	MJBH	2024-10-04 16:46:20.732819+00	t
4	I used to spend nights in living rooms dotted with burp cloths while new parents fought off exhaustion. Today my backdrop is a standing desk, glowing monitors, and the occasional CI failure. The scenery changed, but the mission stayed the same: keep everyone calm enough to make good decisions.\n\nPlans Are Maps, Not GPS\nEvery family drafts a newborn‑care plan that covers who handles night feeds, how to pace bottle introductions, and which visitors are welcome. Within two days reality edits the document. The tech version is a pristine design spec that looks brilliant until a late integration test fails or product priorities shift.\n\nWhat saves me in either world is the habit of planning with confidence, then revising without ego. Preparation lowers the volume of panic. Flexibility keeps the story moving forward.\n\nThe Thirty‑Second Reset\nPostpartum nights taught me a simple trick. When the baby’s cries spike and the room feels tense, I step out, inhale for four counts, exhale for six, then return. I use the same reset before replying to a heated pull‑request comment. Oxygen first; keyboard second. The baby calms faster and the Git thread stays civil.\n\nSpotting Trouble Early\nWith newborns, tiny cues matter. Flaring nostrils can signal reflux long before a full‑blown meltdown. In software, a single latency blip can hint at an outage. Training my eye on subtle human signals made me better at reading dashboards. Early action means fewer emergencies and a lower heart rate for everyone.\n\nMicro Check‑Ins Beat Macro Meltdowns\nDuring home visits I ask parents every hour whether they need water, a shower, or just five minutes of quiet. That rhythm carried into stand‑ups. I ping my teammate: “Still good on the API refactor, or need a quick rubber‑duck session?” Frequent, honest touchpoints keep stress from snowballing.\n\nDebriefing Turns Stress into Improvement\nA week after the baby arrives, I circle back for a home visit. We talk about what felt hard, celebrate small wins, and adjust the care plan. In engineering we call it a retro. Different label, same purpose. No blame, just a clear look at what tripped us up and how to dodge it next time.\n\nHow Tech Gives Back to Doula Work\nI thought my doula skills would flow one way into engineering. Then version control showed me how concise, time‑stamped commits could improve baby‑care notes. Unit tests nudged me to build repeatable checklists for midnight feeds. Blameless post‑mortems offered healthier language when parents worry they “did something wrong.”\n\nPocket Reminders I Carry Everywhere\nPlan early, then expect revisions.\n\nOne deep exhale is cheaper than therapy.\n\nSmall signals matter; watch for them.\n\nFrequent check‑ins prevent last‑minute heroics.\n\nEvery stressful episode deserves a review.\n\nIf you juggle newborn chaos and Kubernetes deployments, or any two pressure cookers, try borrowing a habit from this list. Maybe start with the thirty‑second breath or schedule a weekly retro at home and work. Your nervous system—and everyone around you—will thank you.\n\nNow, if you’ll excuse me, a fresh test report just landed on my desk.	From Birth Plans to Code Reviews: How I Manage Stress in Tech	MJBH	\N	t
7	The Project: A Contact List App\nFor my first full-stack build, I decided on something simple and functional—a contact list manager. The app allows users to add, edit, view, and delete contact information, including name, phone number, email, and location. It used a PostgreSQL database, a Node and Express back end, and a React front end.\n\nI focused on building clean CRUD functionality while paying attention to the user experience, accessibility, and responsiveness.\n\nWhat I Learned\n1. Break the work into pieces early\nTrying to tackle the entire app at once led to unnecessary frustration. Once I mapped out the features and built them step by step—starting with the database, then setting up the API routes, then connecting the front end—everything became more manageable. It also gave me room to troubleshoot without getting overwhelmed.\n\n2. State management matters\nManaging state in React taught me a lot about how data flows through an application. I ran into challenges passing data between components and deciding when to lift state or refactor into smaller components. I eventually used a reducer to manage more complex form logic, which was a game-changer.\n\n3. Forms are more complicated than they look\nHandling form input, validation, and pre-filled fields for updates took more effort than I expected. I learned how important it is to control user inputs and give immediate feedback, especially when dealing with user-submitted data.\n\n4. PostgreSQL and SQL require clarity\nWriting SQL queries made me appreciate the importance of a well-structured schema. I had to think ahead about how tables would relate, how to avoid redundancy, and how to write join queries to fetch related data. Mistakes here often surfaced later in the front end.\n\n5. Git is your friend—but only if you use it wisely\nMaking small, frequent commits with clear messages saved me so many times. It helped me backtrack when something broke and made it easier to isolate bugs. Creating branches for features or fixes kept my workflow organized and gave me more confidence to experiment.\n\nWhat I’m Proud Of\nI built something end-to-end.\nEvery part of the app—from the database to the UI—is something I wrote. That alone gave me a huge confidence boost and a better understanding of how the pieces fit together.\n\nI handled edge cases and errors.\nInstead of assuming everything would work perfectly, I added error handling to my routes and created fallback messages on the front end. It made the app more resilient and the experience smoother for users.\n\nI prioritized accessibility and responsiveness.\nUsing semantic HTML and testing with screen readers helped me create an app that more people can use. I also tested different screen sizes and added media queries to make sure the layout worked across devices.\n\nI kept going when things got hard.\nThere were moments I wanted to start over—or quit entirely—but I stuck with it. That persistence is something I’ll carry into every future project.\n\nFinal Thoughts\nBuilding a full-stack app pushed me to use everything I’ve learned so far and exposed the areas I still need to grow in. It was humbling and empowering at the same time.\n\nFor anyone starting their first full-stack project, my advice is simple: start small, break things down, and don’t be afraid to ask for help. Every bug is an opportunity to learn, and every small win adds up.\n\nThis project taught me that I can build something real. That lesson alone makes all the debugging worth it.	Building My First Full-Stack Project: Lessons Learned and Wins	MJBH	\N	t
8	Why This Intersection Matters\nPostpartum care is often under-resourced, full of uncertainty, and emotionally intense. Tech has the potential to offer tools that make this time more manageable. But not just any tools—ones that center real people, diverse family structures, and emotional nuance. Technology that doesn’t just solve problems, but anticipates needs.\n\nThe systems I work on now may be digital, but the heart of the work hasn’t changed. I’m still helping people navigate new territory. I’m still thinking about how to meet someone where they are, with clarity and compassion.\n\nThe Work in Progress: Queer Conceptions\nOne of the projects I’m building is Queer Conceptions, an app designed to support LGBTQ+ individuals and couples through the fertility journey. It asks users a few questions about their goals and preferences, then generates a personalized conception plan.\n\nThe app doesn’t make assumptions about gender, identity, or relationship structure. Instead, it offers inclusive guidance that reflects the complexity and beauty of queer family-building. It’s a space that feels informed, affirming, and practical—all values I carried over from my work as a doula.\n\nTools I Hope to See in the Future\nAs I continue working on Queer Conceptions, I’m also dreaming bigger. Here are a few ideas I believe could transform how we approach postpartum care with the help of tech:\n\n1. Mood and energy tracking for the whole household\nNot just for the baby, but for parents and caregivers too. Imagine a dashboard that gently surfaces trends, flags rising stress, and offers reminders to rest or reach out. It’s not about micromanagement—it’s about awareness.\n\n2. Secure, identity-aware support matching\nA platform where new parents can connect with doulas, peer mentors, or community resources based on shared experiences. No data scraping. No judgment. Just a safe space to ask questions and feel seen.\n\n3. AI-guided postpartum check-ins\nA tool that listens to your concerns and responds with evidence-based guidance, then recommends next steps if needed. It wouldn’t replace care, but it could fill the gaps during late-night worries.\n\n4. Collaborative care planning templates\nDigital documents that families and doulas can build together. These could include feeding schedules, emotional check-ins, visitor preferences, and more. Easy to update, easy to share.\n\nCore Values Guiding This Work\nCare should be accessible. Every family deserves tools that support them, regardless of income, location, or identity.\nPrivacy must be protected. Postpartum care is intimate. Tech should never compromise that trust.\nInclusion isn’t a feature—it’s the foundation. The best tools are built for everyone from the start.\nTechnology should amplify, not replace, human care. The goal isn’t to automate empathy. It’s to create more space for it.\n\nLooking Ahead\nI believe the future of maternal care is collaborative. It will be shaped by doulas, engineers, designers, parents, and public health advocates working together. Queer Conceptions is just one step in that direction—a project born from lived experience, community feedback, and a desire to make the fertility journey less isolating.\n\nIf you’re working on something similar or curious about how to get involved, I’d love to connect. There’s so much more we can build when we bring care and code into the same conversation. And I truly believe that when tech meets maternal care with intention, everyone benefits.	The Intersection of Tech and Maternal Care: My Vision for the Future	MJBH	\N	t
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 17, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--

