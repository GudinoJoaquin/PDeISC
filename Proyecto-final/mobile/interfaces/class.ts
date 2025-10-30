export interface Class {
  id: string,
  titulo: string
  descripcion: string
  topicos: string[]
  profesor: string
  alumnos: string[]
  created_at: string
}

export interface Content {
  id: string
  clase_id: string
  bucket_path: string
  url_path: string
  created_at:string
  titulo: string
  mensaje: string
}