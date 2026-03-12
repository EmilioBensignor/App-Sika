export type UsuarioRow = {
  id: string
  nombre: string
  correo: string
  profesion: string
  ciudad: string
  resultado: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: UsuarioRow
        Insert: Omit<UsuarioRow, 'id' | 'created_at'>
        Update: Partial<Omit<UsuarioRow, 'id'>>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
