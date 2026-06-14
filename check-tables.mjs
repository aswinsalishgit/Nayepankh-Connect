import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const { data: users, error: err1 } = await supabase.from('users').select('*').limit(1);
  console.log('Users table check:', err1 ? err1.message : 'Exists');
  
  const { data: messages, error: err2 } = await supabase.from('messages').select('*').limit(1);
  console.log('Messages table check:', err2 ? err2.message : 'Exists');
}

checkTables();
