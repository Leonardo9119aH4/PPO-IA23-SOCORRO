#!/bin/bash
# Compile o TypeScript na mesma pasta
npx tsc 

# Verifique se a compilação foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "Compilação bem-sucedida. Deletando arquivos .ts..."

    # Encontre e delete todos os arquivos .ts na pasta src (exceto os .d.ts, caso existam)
    find $SRC_DIR -type f -name "*.ts" ! -name "*.ts" -delete

    echo "Arquivos .ts deletados com sucesso."
else
    echo "Erro na compilação. Nenhum arquivo foi deletado."
fi
