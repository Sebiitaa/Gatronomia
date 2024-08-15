import { createClient } from '@supabase/supabase-js'

// Tu URL de Supabase y la clave pública
const supabaseUrl = 'https://ukuvffbluwfmoqxbjrms.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdXZmZmJsdXdmbW9xeGJqcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NTIzNjAsImV4cCI6MjAzOTMyODM2MH0.FNARtf3lSBZ0kdgg0zwGgoXxYjTaf9yPrLPQP1opjAo'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }

