// Supabaseクライアントの初期化用ファイル
import { createClient } from '@supabase/supabase-js';


// .envファイルから環境変数を取得
// Create React App exposes only variables prefixed with REACT_APP_ to the browser.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl) {
	throw new Error("supabaseUrl is required. Set REACT_APP_SUPABASE_URL in your .env file and restart the dev server.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);