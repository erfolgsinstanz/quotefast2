import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdiicdlrwijxkavsfihv.supabase.co'
const supabaseKey = 'sb_publishable_jn5nXmo0LdC05wN2qxuj9Q_Zg0hu_lt'

export const supabase = createClient(supabaseUrl, supabaseKey)