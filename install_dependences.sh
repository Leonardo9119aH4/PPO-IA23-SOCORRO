#!/usr/bin
command_exists() {
    command -v "$1" >/dev/null 2>&1
}
if command_exists apt-get; then
    sudo apt-get install -y nodejs npm
elif command_exists dnf; then
    sudo dnf install -y nodejs
elif command_exists yum; then
    sudo yum install -y nodejs
elif command_exists pacman; then
    sudo pacman -Syu --noconfirm nodejs npm
elif command_exists zypper; then
    sudo zypper install -y nodejs8
elif command_exists apk; then
    sudo apk add --no-cache nodejs npm
else
    echo "Nenhum gestor de pacotes conhecido encontrado. Por favor, instale o Node.js manualmente."
    exit 1
fi
npm install --fix-broken
npx prisma generate
npx prisma migrate dev