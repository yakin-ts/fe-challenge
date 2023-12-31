PGDMP      
                {            railway    16.0 (Debian 16.0-1.pgdg120+1)    16.0 %    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    16384    railway    DATABASE     r   CREATE DATABASE railway WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE railway;
                postgres    false            �            1259    32839    Sectors    TABLE     |   CREATE TABLE public."Sectors" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    parent_id integer
);
    DROP TABLE public."Sectors";
       public         heap    postgres    false            �            1259    32838    Sectors_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Sectors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Sectors_id_seq";
       public          postgres    false    222            E           0    0    Sectors_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Sectors_id_seq" OWNED BY public."Sectors".id;
          public          postgres    false    221            �            1259    32850    User_Sectors    TABLE     �   CREATE TABLE public."User_Sectors" (
    user_id integer NOT NULL,
    sector_ids integer[],
    agreed boolean DEFAULT true
);
 "   DROP TABLE public."User_Sectors";
       public         heap    postgres    false            �            1259    32832    Users    TABLE     c   CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    32831    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    220            F           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    219            �            1259    24578    knex_migrations    TABLE     �   CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
 #   DROP TABLE public.knex_migrations;
       public         heap    postgres    false            �            1259    24577    knex_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.knex_migrations_id_seq;
       public          postgres    false    216            G           0    0    knex_migrations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
          public          postgres    false    215            �            1259    24585    knex_migrations_lock    TABLE     `   CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);
 (   DROP TABLE public.knex_migrations_lock;
       public         heap    postgres    false            �            1259    24584    knex_migrations_lock_index_seq    SEQUENCE     �   CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.knex_migrations_lock_index_seq;
       public          postgres    false    218            H           0    0    knex_migrations_lock_index_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;
          public          postgres    false    217            �           2604    32842 
   Sectors id    DEFAULT     l   ALTER TABLE ONLY public."Sectors" ALTER COLUMN id SET DEFAULT nextval('public."Sectors_id_seq"'::regclass);
 ;   ALTER TABLE public."Sectors" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    32835    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    24581    knex_migrations id    DEFAULT     x   ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
 A   ALTER TABLE public.knex_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    24588    knex_migrations_lock index    DEFAULT     �   ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);
 I   ALTER TABLE public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
       public          postgres    false    218    217    218            =          0    32839    Sectors 
   TABLE DATA           8   COPY public."Sectors" (id, name, parent_id) FROM stdin;
    public          postgres    false    222   v(       >          0    32850    User_Sectors 
   TABLE DATA           E   COPY public."User_Sectors" (user_id, sector_ids, agreed) FROM stdin;
    public          postgres    false    223   r,       ;          0    32832    Users 
   TABLE DATA           +   COPY public."Users" (id, name) FROM stdin;
    public          postgres    false    220   �,       7          0    24578    knex_migrations 
   TABLE DATA           J   COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
    public          postgres    false    216   2-       9          0    24585    knex_migrations_lock 
   TABLE DATA           @   COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
    public          postgres    false    218   �-       I           0    0    Sectors_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Sectors_id_seq"', 1, false);
          public          postgres    false    221            J           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);
          public          postgres    false    219            K           0    0    knex_migrations_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.knex_migrations_id_seq', 13, true);
          public          postgres    false    215            L           0    0    knex_migrations_lock_index_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 3, true);
          public          postgres    false    217            �           2606    32844    Sectors Sectors_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Sectors"
    ADD CONSTRAINT "Sectors_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Sectors" DROP CONSTRAINT "Sectors_pkey";
       public            postgres    false    222            �           2606    32857    User_Sectors User_Sectors_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."User_Sectors"
    ADD CONSTRAINT "User_Sectors_pkey" PRIMARY KEY (user_id);
 L   ALTER TABLE ONLY public."User_Sectors" DROP CONSTRAINT "User_Sectors_pkey";
       public            postgres    false    223            �           2606    32837    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    220            �           2606    24590 .   knex_migrations_lock knex_migrations_lock_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);
 X   ALTER TABLE ONLY public.knex_migrations_lock DROP CONSTRAINT knex_migrations_lock_pkey;
       public            postgres    false    218            �           2606    24583 $   knex_migrations knex_migrations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.knex_migrations DROP CONSTRAINT knex_migrations_pkey;
       public            postgres    false    216            �           2606    32845 !   Sectors sectors_parent_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sectors"
    ADD CONSTRAINT sectors_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES public."Sectors"(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Sectors" DROP CONSTRAINT sectors_parent_id_foreign;
       public          postgres    false    222    3234    222            �           2606    32858 )   User_Sectors user_sectors_user_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_Sectors"
    ADD CONSTRAINT user_sectors_user_id_foreign FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 U   ALTER TABLE ONLY public."User_Sectors" DROP CONSTRAINT user_sectors_user_id_foreign;
       public          postgres    false    223    3232    220            =   �  x^eU�n�6>����bpS�,阸���&H�BK��Z]�J6��F_�O�o([�b/6�����Ǒ�;��*��L��o_#Y��v�wC��D��vF5=�H�t���;ۙ�������ݒn���ݕ~�Nm5n�ELWj�ݛ�E���፨,�����e�H��ĘnL��G��s���C��ߙ&)��4{h*e~��d9=�j�{h�N�{Qjțѽ�i��L�fp�A'� p�sֶ�:E2�m
�_���jg�������IQ����Nwl&�n�<$EL�umJ��8���0a�I����u,=8�z(�w�Hc���p_��&Mohx�F�8*�J�=�CՅ��Gq̾'Jhak`���#AЫ�[F������t^w�+��{	e�9Clg�i�g�.��5����{��j�~c Y/1���f��*�����{���{=(��<?��$Jg��#��ُT�b*NBB�����'(�u�)�L\�m
����'XEYJ���_�nr~EK0ݺ-�~&n���QU�'�ۇF����[�N�r�~r^�ݗO3�柱����1@x����f�3<z�+P���(M���}�ݻ/*+u�3}�.w�m��-��Uc_C�":a�cr��S��*�x7�-�Sv�jӀR��A�qPr��e��z�0(�d:-�����V�ĂB��n�F7�iO��e���=R�Uc=����,B��eQNϼ=`3�t7Q�lY��";�w�<�G�i߈�������r��̋��<1�$��/�o���rHp�b����=�Ř΀nar�7"FI
'^�o��0�/]m�<���4�В�ƾ�m;`����~W^��r&��F��A�k���u_��`��[�Z�t;�����zKz��UN��g�*>����C�MEk��V��Ğ\;���X�q�0X��J��[�o��K��8��1��Ge��ӣU�xN虿�,|�-����i<�      >   Q   x^=���0C��,"NC�.��-bw�"q��ٔd��[]�`g�V�����`m���!�����@VԿ�ő���Q嵩��V�      ;   O   x^3�I-.Q-N-�2�����Sp�O�2�43q5�2A��rzde�+�&�%�U�qF&fg�) �g��r���c���� ��      7   �   x^���
�0���)z/��f5&�R�.������m����g���5dȂ�	֓�c�T$�2�w�cIׇ���`���p�܅�i��l����I��l \��[���R-�hA�c��Vؽ_	1MSL�,�W��-����9��έ���� �dCi      9      x^3�4������ h     