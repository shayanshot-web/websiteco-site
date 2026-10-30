<?php
declare(strict_types=1);
/**
 * بازیابی دسترسی مدیر: با «کد نصب» برای یک نام کاربری، رمز جدید و نقش «مدیر کل» تعیین می‌شود
 * (اگر نام کاربری وجود نداشته باشد، ساخته می‌شود). فقط برای زمانی که رمز مدیر را ندارید.
 */
require __DIR__ . '/cms-core/lib.php';
header('X-Frame-Options: DENY'); header('Cache-Control: no-store');
const INSTALL_CODE = 'HLL-D22323C6EF';
$err = ''; $msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $un = trim((string)($_POST['username'] ?? '')); $pw = (string)($_POST['password'] ?? '');
    if (too_many_attempts()) $err = 'تلاش‌های ناموفق زیاد بود؛ ۱۵ دقیقه بعد دوباره امتحان کنید.';
    elseif (!hash_equals(INSTALL_CODE, trim((string)($_POST['code'] ?? '')))) { db()->prepare('INSERT INTO attempts(ip,ts) VALUES(?,?)')->execute([client_ip(), now()]); $err = 'کد نصب درست نیست.'; }
    elseif (!preg_match('/^[A-Za-z0-9_.-]{3,30}$/', $un)) $err = 'نام کاربری ۳ تا ۳۰ حرف لاتین/عدد باشد.';
    elseif (mb_strlen($pw) < 10) $err = 'رمز عبور حداقل ۱۰ نویسه باشد.';
    else {
        $h = password_hash($pw, PASSWORD_DEFAULT);
        $s = db()->prepare('SELECT id FROM users WHERE username=?'); $s->execute([$un]); $id = $s->fetchColumn();
        if ($id) db()->prepare("UPDATE users SET pass=?, role='admin' WHERE id=?")->execute([$h, $id]);
        else db()->prepare('INSERT INTO users(username,name,email,role,pass,created) VALUES(?,?,?,?,?,?)')->execute([$un, $un, '', 'admin', $h, now()]);
        db()->exec('DELETE FROM sessions');
        header('Location: /admin/?a=login'); exit;
    }
}
$users = db()->query('SELECT username,role FROM users ORDER BY id')->fetchAll();
echo '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>بازیابی دسترسی مدیر</title><link rel="stylesheet" href="/admin/admin.css"></head>';
echo '<body class="login"><form method="post" class="login-box" autocomplete="off"><h1>بازیابی دسترسی مدیر</h1>';
if ($err) echo '<p class="alert err">' . e($err) . '</p>';
if ($users) echo '<p class="muted small">کاربران موجود: ' . e(implode('، ', array_map(fn($u) => $u['username'] . ' (' . $u['role'] . ')', $users))) . '</p>';
echo '<input type="hidden" name="_csrf" value="' . e(csrf()) . '">'
   . '<label>کد نصب<input name="code" required dir="ltr" autofocus></label>'
   . '<label>نام کاربری (موجود یا جدید)<input name="username" required dir="ltr" autocomplete="username"></label>'
   . '<label>رمز عبور جدید (حداقل ۱۰ نویسه)<input name="password" type="password" required dir="ltr" autocomplete="new-password"></label>'
   . '<button class="btn primary wide">تعیین رمز و مدیر کل کردن</button></form></body></html>';
