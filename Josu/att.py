# primeira att

x = []

for i in range(10):
    valor = int(input("Digite um valor: "))
    x.append(valor)

print("Valores armazenados:")
for valor in x:
    print(valor)

# segunda

x = []

for i in range(10):
    valor = int(input("Digite um valor: "))
    x.append(valor)

print("Lista original:")
print(x)

for i in range(10):
    if x[i] % 2 == 0:
        x[i] = x[i] * i
    else:
        x[i] = i

print("Lista atualizada:")
print(x)

# terceira


lista1 = []
for i in range(5):
    valor = int(input("Digite um valor para a lista 1: "))
    lista1.append(valor)


lista2 = []
for i in range(5):
    valor = int(input("Digite um valor para a lista 2: "))
    lista2.append(valor)


print("Lista 1:", lista1)
print("Lista 2:", lista2)


lista_soma = []
for i in range(5):
    soma = lista1[i] + lista2[i]
    lista_soma.append(soma)

print("Resultado da soma:", lista_soma)

# quarta

lista1 = []
for i in range(5):
    valor = int(input("Digite um valor para a lista 1: "))
    lista1.append(valor)


lista2 = []
for i in range(5):
    valor = int(input("Digite um valor para a lista 2: "))
    lista2.append(valor)


print("Lista 1:", lista1)
print("Lista 2:", lista2)


lista2_inversa = lista2[::-1]


print("Lista 2 inversa:", lista2_inversa)


lista_produto = []
for i in range(5):
    produto = lista1[i] * lista2_inversa[i]
    lista_produto.append(produto)


print("Resultado do produto:", lista_produto)

# quinta

lista_A = []
for i in range(5):
    valor = int(input("Digite um valor para a lista A: "))
    lista_A.append(valor)


lista_B = []
for i in range(5):
    valor = int(input("Digite um valor para a lista B: "))
    lista_B.append(valor)


print("Lista A:", lista_A)
print("Lista B:", lista_B)


lista_C = lista_A + lista_B


print("Lista C:", lista_C)

# lista 2

nome = input("Digite seu nome: ")


nome_maiusculo = nome.upper()


nome_reverso = nome_maiusculo[::-1]


print("Seu nome de trás para frente é:", nome_reverso)

# segundo

nome = input("Digite seu nome: ")


nome_maiusculo = nome.upper()


for i in range(1, len(nome_maiusculo) + 1):
    print(nome_maiusculo[:i])


# terceiro


data_nascimento = input("Digite sua data de nascimento (dd/mm/aaaa): ")


dia, mes, ano = data_nascimento.split("/")


meses = {
    "01": "janeiro",
    "02": "fevereiro",
    "03": "março",
    "04": "abril",
    "05": "maio",
    "06": "junho",
    "07": "julho",
    "08": "agosto",
    "09": "setembro",
    "10": "outubro",
    "11": "novembro",
    "12": "dezembro",
}
mes_extenso = meses[mes]

print(f"Você nasceu em {dia} de {mes_extenso} de {ano}")

# quarta

nome = input("Digite seu nome: ")

for letra in nome.upper():
    print(letra)


# quinta A e B

frase = input("Digite uma frase: ")


espacos = frase.count(" ")
print(f"Espaços em branco: {espacos}")


vogais = "aeiou"
contagem_vogais = {}
for vogal in vogais:
    contagem_vogais[vogal] = frase.lower().count(vogal)
print("Vogais:")
for vogal, contador in contagem_vogais.items():
    print(f"  {vogal}: {contador}")


# sexta

sequencia = input("Digite uma sequência de caracteres: ")


sequencia_sem_espacos = "".join(e for e in sequencia if e.isalnum())


sequencia_sem_espacos = sequencia_sem_espacos.lower()

if sequencia_sem_espacos == sequencia_sem_espacos[::-1]:
    print(f"A sequência '{sequencia}' é um palíndromo.")
else:
    print(f"A sequência '{sequencia}' não é um palíndromo.")

# setima

string1 = input("Digite a primeira string: ")
string2 = input("Digite a segunda string: ")


if string2 in string1:
    posicao_inicio = string1.index(string2)
    print(
        f"A string '{string2}' ocorre na string '{string1}' a partir da posição {posicao_inicio}."
    )
else:
    print(f"A string '{string2}' não ocorre na string '{string1}'.")


# oitava


string = input("Digite a string: ")


frequencia = {}


for char in string:

    if char in frequencia:
        frequencia[char] += 1

    else:
        frequencia[char] = 1


for char, freq in frequencia.items():
    print(f"{char}: {freq}x")


frase = input("Digite a frase: ")


frase = frase.strip()


palavras = frase.split()


print(f"A frase contém {len(palavras)} palavra(s).")
