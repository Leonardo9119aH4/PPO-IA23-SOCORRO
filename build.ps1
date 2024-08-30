# Compile o TypeScript na mesma pasta
npx tsc
# Verifique se a compilacao foi bem-sucedida
if ($?) {
    Write-Host "Compilacao bem-sucedida. Deletando arquivos .ts..."
    # Encontre e delete todos os arquivos .ts na pasta src (exceto os .d.ts, caso existam)
    Get-ChildItem -Path ".\src" -Recurse -Include *.ts | Where-Object { $_.Name -like "*.ts" } | Remove-Item
    Write-Host "Arquivos .ts deletados com sucesso."
}
else {
    Write-Host "Erro na compilacao. Nenhum arquivo foi deletado."
}
