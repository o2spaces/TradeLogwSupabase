// ═══════════════════════════════════════════════════════════════
//  TradeLog Pro+ — Config File (Supabase Edition)
//  แก้ไขไฟล์นี้ก่อน deploy แอป
//  ไฟล์นี้ไม่ควรแชร์ให้ User ทั่วไป
// ═══════════════════════════════════════════════════════════════

// ── Supabase Project Settings ──────────────────────────────────
// วิธีหา:
//   Supabase Dashboard → Project → Settings → API
//   "Project URL"  → ใส่ใน SUPABASE_URL
//   "anon public"  → ใส่ใน SUPABASE_ANON_KEY

window.SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
window.SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY_HERE';

// ── Google OAuth Client ID ─────────────────────────────────────
// ยังใช้ Client ID เดิมได้ แต่ต้องเพิ่ม Authorized Redirect URI ใหม่:
//   Google Cloud Console → Credentials → OAuth 2.0 Client IDs
//   เพิ่ม: https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
//   (Supabase จะจัดการ redirect ให้ทั้งหมด — ไม่ต้องทำ popup เอง)
//
// หมายเหตุ: ต้องตั้งค่า Google Provider ใน Supabase Dashboard ด้วย:
//   Authentication → Providers → Google → ใส่ Client ID + Client Secret

window.GOOGLE_CLIENT_ID  = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// ── วิธี Setup (ทีละขั้นตอน) ───────────────────────────────────
//
//  STEP 1: สร้าง Supabase Project
//    → https://supabase.com → New Project
//    → จด Project URL และ anon key ใส่ด้านบน
//
//  STEP 2: รัน SQL นี้ใน SQL Editor (Supabase Dashboard → SQL Editor)
//
//    CREATE TABLE profiles (
//      id           UUID REFERENCES auth.users PRIMARY KEY,
//      username     TEXT UNIQUE,
//      display_name TEXT,
//      role         TEXT DEFAULT 'user',
//      login_count  INT  DEFAULT 0,
//      last_login   TIMESTAMPTZ,
//      created_at   TIMESTAMPTZ DEFAULT NOW()
//    );
//    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
//    CREATE POLICY "own_select" ON profiles FOR SELECT  USING (auth.uid() = id);
//    CREATE POLICY "own_update" ON profiles FOR UPDATE  USING (auth.uid() = id);
//    CREATE POLICY "own_insert" ON profiles FOR INSERT  WITH CHECK (auth.uid() = id);
//    CREATE POLICY "admin_all"  ON profiles FOR ALL
//      USING (EXISTS (SELECT 1 FROM profiles WHERE id=auth.uid() AND role='admin'));
//
//  STEP 3: เปิด Google Provider
//    → Supabase → Authentication → Providers → Google
//    → ใส่ Client ID + Client Secret จาก Google Cloud Console
//    → Copy "Callback URL" ไปใส่ใน Authorized Redirect URIs ที่ Google Cloud Console
//
//  STEP 4: ตั้งค่า Redirect URL
//    → Supabase → Authentication → URL Configuration
//    → Site URL: URL ของแอปคุณ (เช่น https://mytradelog.com)
//
//  STEP 5: บันทึกไฟล์นี้ → deploy แอป
//
//  STEP 6: สร้าง Admin user แรก
//    → Register ผ่านแอปตามปกติ
//    → Supabase → Table Editor → profiles → แก้ role เป็น 'admin'
