import mysql.connector
import subprocess

def conectar_banco():
    try:
        conexao = mysql.connector.connect(
        host="localhost",
        user="root",
        password="ia23"
        )
        print("Conectado ao servidor MySQL com sucesso!")
        return conexao
    except mysql.connector.Error as e:
        print(f"Erro ao conectar ao servidor MySQL: {e}")
    return None

def verificar_e_criar_banco_dados(conexao):
    cursor = conexao.cursor()
    cursor.execute("SHOW DATABASES LIKE 'codegamix'")
    resultado = cursor.fetchone()
    if not resultado:
        cursor.execute("CREATE DATABASE codegamix")
        conexao.commit()
        
def startDB(conexao):
    with open("./database/start_db.sql", 'r') as f:
      sql = f.read()
    cursor = conexao.cursor()
    cursor.execute(sql, multi=True)

# Conecta ao servidor MySQL
conexao = conectar_banco()
if conexao:
    verificar_e_criar_banco_dados(conexao)
    startDB(conexao)
    conexao.close()
    subprocess.run(["node", "./index.js"])

