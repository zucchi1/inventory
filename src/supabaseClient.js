// Supabaseクライアントの初期化用ファイル
import { createClient } from '@supabase/supabase-js';

// 下記のURLとAPIキーはSupabaseのプロジェクト設定画面から取得してください
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);