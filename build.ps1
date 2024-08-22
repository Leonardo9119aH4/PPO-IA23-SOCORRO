# Defina o diretório de origem
$SRC_DIR = ".\src"

# Compile o TypeScript na mesma pasta
npx tsc --outDir $SRC_DIR --rootDir $SRC_DIR

# Verifique se a compilação foi bem-sucedida
if ($?) {
    Write-Host "Compilação bem-sucedida. Deletando arquivos .ts..."

    # Encontre e delete todos os arquivos .ts na pasta src (exceto os .d.ts, caso existam)
    Get-ChildItem -Path $SRC_DIR -Recurse -Include *.ts | Where-Object { $_.Name -notlike "*.d.ts" } | Remove-Item

    Write-Host "Arquivos .ts deletados com sucesso."
} else {
    Write-Host "Erro na compilação. Nenhum arquivo foi deletado."
}
