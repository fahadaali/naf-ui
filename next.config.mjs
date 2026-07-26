/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript 7 لا يوفّر واجهة المصرّف القديمة — نستخدم الأداة الطرفية بدلاً منها.
  experimental: {
    useTypeScriptCli: true,
  },
}

export default nextConfig
