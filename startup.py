import subprocess
import os
import time
SystemExit()
# Não executar o script, ele ainda não funciona direito
db_user = "root"
db_pass = "12345"
sql_file = "./database/main.sql"
mysql_port = 3001
mysql_cmd = f"mysqld --user={db_user} --password={db_pass} --port={mysql_port} &" # Comando para iniciar o servidor MySQL
mysql_db_cmd = f"mysql -u {db_user} -p{db_pass} -P {mysql_port} < {sql_file}" # Comando para criar o banco de dados a partir do arquivo SQL
subprocess.Popen(mysql_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE) # Iniciar o servidor MySQL em segundo plano
time.sleep(5)
subprocess.run(mysql_db_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE) # Criar o banco de dados
print("Servidor MySQL iniciado na porta 3001 e banco de dados criado com sucesso!")
