/** @type {import('next').NextConfig} */
const nextConfig = {
  // خروجی کاملاً استاتیک (پوشه out) که روی هر سی‌پنلی با public_html کار می‌کند
  output: 'export',
  // آدرس‌ها مثل وردپرس با اسلش پایانی: /about/
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
