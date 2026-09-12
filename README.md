[README.md](https://github.com/user-attachments/files/32144566/README.md)
# ABTI · 测测你的 AI 人格

这是一个可部署到 Vercel 的人格测试网站。朋友端完成测试后，浏览器会调用 /api/results；Vercel 服务端再将匿名结果写入 Supabase。数据看板地址为 /admin.html。

## 部署步骤

1. 在 Supabase 创建项目，打开 SQL Editor，粘贴并执行 supabase.sql。
2. 将整个 abti-test 文件夹上传到 GitHub 仓库。
3. 在 Vercel 点击 New Project，导入仓库，并将 Root Directory 设置为 abti-test。
4. 在 Vercel Project Settings 的 Environment Variables 添加：

| Key | Value |
| --- | --- |
| SUPABASE_URL | Supabase 项目 URL |
| SUPABASE_SECRET_KEY | Supabase 的 secret key（sb_secret_ 开头），仅存 Vercel |
| ADMIN_TOKEN | 自己生成的一串长口令，用于 /admin.html |

5. 重新部署。Production URL 是给朋友的测试链接；你的数据页是 域名/admin.html。

## 数据边界

- 只记录测试结果、12 个选项和四维度得分，不记录昵称、邮箱、手机号或 IP。
- SUPABASE_SECRET_KEY 绝不能写进前端 HTML、JS 或 GitHub；只存 Vercel 环境变量。
- ADMIN_TOKEN 不要分享给朋友。它只用于读取聚合数据。

## 本地预览

直接打开 index.html 可以体验测试，但本地不会写入数据，因为没有 /api/results 服务。
