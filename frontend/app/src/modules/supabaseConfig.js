// --------------------------------------------------
// Archivo de conexión a Supabase para React
// --------------------------------------------------

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://qfjjprdpytwodagcvhqx.supabase.co";
export const supabaseApiKey = "sb_publishable_mxerFCKUojd-8Xa9wcNKBg_iESGO_3y";

export const supabase = createClient(supabaseUrl, supabaseApiKey);