<?php
/**
 * نظرهای بازدیدکنندگان (بخش «تجربه‌ها و آدم‌هایش»).
 * GET  -> فهرست نظرهای تأییدشده (JSON)
 * POST -> ثبت نظر جدید؛ تا تأیید مدیریت در پنل (/admin → نظرها) نمایش داده نمی‌شود.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function out($d, $code = 200) { http_response_code($code); echo json_encode($d, JSON_UNESCAPED_UNICODE); exit; }

require_once __DIR__ . '/cms-core/lib.php';
try { $pdo = db(); } catch (Throwable $e) { out(['ok' => false], 500); }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = $pdo->query("SELECT name,text,rating,created FROM comments WHERE status='approved' ORDER BY id DESC LIMIT 100")->fetchAll();
    foreach ($rows as &$r) { $r['rating'] = (int)$r['rating']; $r['created'] = (int)$r['created']; }
    out(['ok' => true, 'items' => $rows]);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['ok' => false], 405);

$host = $_SERVER['HTTP_HOST'] ?? '';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) out(['ok' => false], 403);
if (!empty($_POST['website'])) out(['ok' => true]); // تله اسپم

$name = trim(preg_replace('/\s+/u', ' ', mb_substr((string)($_POST['name'] ?? ''), 0, 60)));
$text = trim(str_replace(["\r", "\0"], '', mb_substr((string)($_POST['text'] ?? ''), 0, 800)));
$rating = max(0, min(5, (int)($_POST['rating'] ?? 0)));
$lang = in_array($_POST['lang'] ?? '', ['fa', 'en', 'ru'], true) ? $_POST['lang'] : 'fa';
if ($name === '' || mb_strlen($text) < 3) out(['ok' => false], 422);
if (preg_match('~https?://|www\.~i', $text)) out(['ok' => false, 'reason' => 'links'], 422);

// محدودیت: حداکثر ۵ نظر در ساعت برای هر آی‌پی
$ip = hash('sha256', client_ip() . app_secret());
$st = $pdo->prepare('SELECT COUNT(*) FROM comments WHERE ip=? AND created>?'); $st->execute([$ip, time() - 3600]);
if ((int)$st->fetchColumn() >= 5) out(['ok' => false, 'reason' => 'rate'], 429);

$pdo->prepare('INSERT INTO comments(name,text,rating,lang,status,ip,created) VALUES(?,?,?,?,?,?,?)')
    ->execute([$name, $text, $rating, $lang, 'pending', $ip, time()]);
out(['ok' => true]);
