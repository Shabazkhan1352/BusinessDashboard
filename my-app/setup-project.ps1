# PowerShell Script to Setup Business Dashboard Project Structure
# Run this script in your project root directory

Write-Host "Setting up Business Dashboard Project Structure..." -ForegroundColor Cyan

# Create main app directory structure
Write-Host "`nCreating app directories..." -ForegroundColor Yellow

# Auth directories
New-Item -ItemType Directory -Path "app\(auth)\login" -Force | Out-Null

# Dashboard directories
New-Item -ItemType Directory -Path "app\dashboard\users" -Force | Out-Null
New-Item -ItemType Directory -Path "app\dashboard\products" -Force | Out-Null
New-Item -ItemType Directory -Path "app\dashboard\orders" -Force | Out-Null

# API directories
New-Item -ItemType Directory -Path "app\api\auth\login" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\auth\register" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\users" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\products" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\orders" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\dashboard" -Force | Out-Null
New-Item -ItemType Directory -Path "app\api\ai\insights" -Force | Out-Null

# Components directory
Write-Host "Creating components directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "components" -Force | Out-Null

# Lib directory
Write-Host "Creating lib directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "lib" -Force | Out-Null

# Prisma directory
Write-Host "Creating prisma directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "prisma" -Force | Out-Null

# Create files
Write-Host "`nCreating files..." -ForegroundColor Yellow

# App files
New-Item -ItemType File -Path "app\layout.jsx" -Force | Out-Null
New-Item -ItemType File -Path "app\page.jsx" -Force | Out-Null

# Auth files
New-Item -ItemType File -Path "app\(auth)\login\page.jsx" -Force | Out-Null

# Dashboard files
New-Item -ItemType File -Path "app\dashboard\page.jsx" -Force | Out-Null
New-Item -ItemType File -Path "app\dashboard\users\page.jsx" -Force | Out-Null
New-Item -ItemType File -Path "app\dashboard\products\page.jsx" -Force | Out-Null
New-Item -ItemType File -Path "app\dashboard\orders\page.jsx" -Force | Out-Null

# API route files
New-Item -ItemType File -Path "app\api\auth\login\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\auth\register\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\users\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\products\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\orders\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\dashboard\route.js" -Force | Out-Null
New-Item -ItemType File -Path "app\api\ai\insights\route.js" -Force | Out-Null

# Component files
New-Item -ItemType File -Path "components\Sidebar.jsx" -Force | Out-Null
New-Item -ItemType File -Path "components\Navbar.jsx" -Force | Out-Null
New-Item -ItemType File -Path "components\StatsCard.jsx" -Force | Out-Null
New-Item -ItemType File -Path "components\Chart.jsx" -Force | Out-Null

# Lib files
New-Item -ItemType File -Path "lib\prisma.js" -Force | Out-Null
New-Item -ItemType File -Path "lib\auth.js" -Force | Out-Null
New-Item -ItemType File -Path "lib\groq.js" -Force | Out-Null

# Prisma files
New-Item -ItemType File -Path "prisma\schema.prisma" -Force | Out-Null

# Root files
New-Item -ItemType File -Path ".env" -Force | Out-Null
New-Item -ItemType File -Path ".env.local" -Force | Out-Null
New-Item -ItemType File -Path ".gitignore" -Force | Out-Null
New-Item -ItemType File -Path "README.md" -Force | Out-Null

Write-Host "`nProject structure created successfully!" -ForegroundColor Green

# Display tree structure
Write-Host "`nProject Structure:" -ForegroundColor Cyan
Write-Host "business-dashboard/" -ForegroundColor White
Write-Host "  |-- app/" -ForegroundColor White
Write-Host "      |-- (auth)/login/page.jsx" -ForegroundColor White
Write-Host "      |-- dashboard/" -ForegroundColor White
Write-Host "          |-- page.jsx" -ForegroundColor White
Write-Host "          |-- users/page.jsx" -ForegroundColor White
Write-Host "          |-- products/page.jsx" -ForegroundColor White
Write-Host "          |-- orders/page.jsx" -ForegroundColor White
Write-Host "      |-- api/" -ForegroundColor White
Write-Host "          |-- auth/login/route.js" -ForegroundColor White
Write-Host "          |-- auth/register/route.js" -ForegroundColor White
Write-Host "          |-- users/route.js" -ForegroundColor White
Write-Host "          |-- products/route.js" -ForegroundColor White
Write-Host "          |-- orders/route.js" -ForegroundColor White
Write-Host "          |-- dashboard/route.js" -ForegroundColor White
Write-Host "          |-- ai/insights/route.js" -ForegroundColor White
Write-Host "      |-- layout.jsx" -ForegroundColor White
Write-Host "      |-- page.jsx" -ForegroundColor White
Write-Host "  |-- components/" -ForegroundColor White
Write-Host "      |-- Sidebar.jsx" -ForegroundColor White
Write-Host "      |-- Navbar.jsx" -ForegroundColor White
Write-Host "      |-- StatsCard.jsx" -ForegroundColor White
Write-Host "      |-- Chart.jsx" -ForegroundColor White
Write-Host "  |-- lib/" -ForegroundColor White
Write-Host "      |-- prisma.js" -ForegroundColor White
Write-Host "      |-- auth.js" -ForegroundColor White
Write-Host "      |-- groq.js" -ForegroundColor White
Write-Host "  |-- prisma/" -ForegroundColor White
Write-Host "      |-- schema.prisma" -ForegroundColor White
Write-Host "  |-- .env" -ForegroundColor White
Write-Host "  |-- .env.local" -ForegroundColor White
Write-Host "  |-- .gitignore" -ForegroundColor White
Write-Host "  |-- README.md" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Run: pnpm install" -ForegroundColor White
Write-Host "2. Configure your .env file with database credentials" -ForegroundColor White
Write-Host "3. Run: pnpx prisma migrate dev --name init" -ForegroundColor White
Write-Host "4. Run: pnpm dev" -ForegroundColor White

Write-Host "`nHappy Coding!" -ForegroundColor Green