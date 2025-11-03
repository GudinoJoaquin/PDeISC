-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.clases (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text NOT NULL,
  institucion uuid NOT NULL,
  profesor uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  bucket_path text,
  CONSTRAINT clases_pkey PRIMARY KEY (id),
  CONSTRAINT clases_institucion_fkey FOREIGN KEY (institucion) REFERENCES public.instituciones(id),
  CONSTRAINT clases_profesor_fkey1 FOREIGN KEY (profesor) REFERENCES auth.users(id)
);
CREATE TABLE public.contenidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  curso_id uuid,
  bucket_path text,
  url_path text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  titulo text NOT NULL,
  mensaje text,
  CONSTRAINT contenidos_pkey PRIMARY KEY (id),
  CONSTRAINT contenidos_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES public.cursos(id)
);
CREATE TABLE public.cursos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text,
  topicos ARRAY NOT NULL,
  profesor uuid NOT NULL DEFAULT gen_random_uuid(),
  alumnos ARRAY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cursos_pkey PRIMARY KEY (id),
  CONSTRAINT clases_profesor_fkey FOREIGN KEY (profesor) REFERENCES auth.users(id)
);
CREATE TABLE public.instituciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text NOT NULL,
  encargado uuid,
  topicos ARRAY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT instituciones_pkey PRIMARY KEY (id),
  CONSTRAINT instituciones_encargado_fkey FOREIGN KEY (encargado) REFERENCES auth.users(id)
);
CREATE TABLE public.tareas (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  clase_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  titulo text,
  descripcion text,
  due_date date,
  bucket_path text,
  CONSTRAINT tareas_pkey PRIMARY KEY (id),
  CONSTRAINT tareas_clase_id_fkey FOREIGN KEY (clase_id) REFERENCES public.clases(id)
);