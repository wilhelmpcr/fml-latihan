#!/usr/bin/env pwsh
# =============================================================
# Script: commit-prd-versions.ps1
# Tujuan: Melakukan 3 commit Git terpisah untuk setiap PRD
#         versi Landing Page CRM NusaCater
# Cara pakai: Jalankan script ini dari folder proyek
#   .\commit-prd-versions.ps1
# =============================================================

Set-Location "d:\wilhelm-2SIB\fml-latihan\fml-latihan"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  NusaCater CRM — PRD Landing Page Git Commits    " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# ─── Cek git status dulu ─────────────────────────────────────
Write-Host "[INFO] Cek git status..." -ForegroundColor Yellow
git status --short
Write-Host ""

# ─── COMMIT 1: PRD v1 ────────────────────────────────────────
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "COMMIT 1: PRD v1 — Landing Page Dasar" -ForegroundColor Blue
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray

git add src/pages/LandingPageV1.jsx

$commit1 = git commit -m "feat: PRD v1 - Landing Page dasar (Navbar + Hero + Features + Footer)"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PRD v1 committed!" -ForegroundColor Green
    $hash1 = git rev-parse --short HEAD
    Write-Host "   Hash: $hash1" -ForegroundColor Magenta
} else {
    Write-Host "⚠️  PRD v1 sudah di-commit sebelumnya atau tidak ada perubahan." -ForegroundColor Yellow
    $hash1 = git log --oneline --grep="PRD v1" -1 --format="%h"
    Write-Host "   Hash existing: $hash1" -ForegroundColor Magenta
}
Write-Host ""

# ─── COMMIT 2: PRD v2 ────────────────────────────────────────
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "COMMIT 2: PRD v2 — Landing Page Intermediate" -ForegroundColor Blue
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray

git add src/pages/LandingPageV2.jsx

$commit2 = git commit -m "feat: PRD v2 - Landing Page intermediate (Stats + 6 Features + Testimonials + Pricing + CTA Form)"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PRD v2 committed!" -ForegroundColor Green
    $hash2 = git rev-parse --short HEAD
    Write-Host "   Hash: $hash2" -ForegroundColor Magenta
} else {
    Write-Host "⚠️  PRD v2 sudah di-commit sebelumnya atau tidak ada perubahan." -ForegroundColor Yellow
    $hash2 = git log --oneline --grep="PRD v2" -1 --format="%h"
    Write-Host "   Hash existing: $hash2" -ForegroundColor Magenta
}
Write-Host ""

# ─── COMMIT 3: PRD v3 + App.jsx + PDF doc ────────────────────
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "COMMIT 3: PRD v3 — Landing Page CRM Komplit" -ForegroundColor Blue
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray

git add src/pages/LandingPage.jsx
git add src/App.jsx
git add public/prd-landing-page.html

$commit3 = git commit -m "feat: PRD v3 - Landing Page CRM komplit (typing anim + 9 features + carousel + FAQ + dark mode) + routes + PDF doc"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PRD v3 committed!" -ForegroundColor Green
    $hash3 = git rev-parse --short HEAD
    Write-Host "   Hash: $hash3" -ForegroundColor Magenta
} else {
    Write-Host "⚠️  PRD v3 sudah di-commit sebelumnya atau tidak ada perubahan." -ForegroundColor Yellow
    $hash3 = git log --oneline --grep="PRD v3" -1 --format="%h"
    Write-Host "   Hash existing: $hash3" -ForegroundColor Magenta
}
Write-Host ""

# ─── Tampilkan Git Log ────────────────────────────────────────
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  GIT LOG — 5 Commit Terakhir                    " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
git log --oneline -5
Write-Host ""

# ─── Info URL untuk PDF doc ──────────────────────────────────
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  AKSES LANDING PAGE & DOKUMEN PDF               " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  🌐 PRD v1 (Dasar)       : http://localhost:5173/landing-v1" -ForegroundColor White
Write-Host "  🌐 PRD v2 (Intermediate) : http://localhost:5173/landing-v2" -ForegroundColor White
Write-Host "  🌐 PRD v3 (Komplit)      : http://localhost:5173/landing" -ForegroundColor White
Write-Host ""
Write-Host "  📄 Dokumen PDF (browser) : http://localhost:5173/prd-landing-page.html" -ForegroundColor Yellow
Write-Host "     → Buka link di atas, klik tombol 'Simpan sebagai PDF'" -ForegroundColor Gray
Write-Host ""
Write-Host "  💡 Jalankan dev server dulu: npm run dev" -ForegroundColor Green
Write-Host ""
