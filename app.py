from flask import Flask, render_template, request, redirect, url_for
import mysql.connector


app = Flask(__name__)


# Configurações do banco de dados
db_config = {
    'user': '',
    'password': '',
    'host': '',
    'database': '',
    'raise_on_warnings': True
}

# Verifica se o usuário está autenticado
def verificar_autenticacao():
    # Obtenha o estado de autenticação do usuário de alguma forma (por exemplo, usando cookies, sessões, etc.)
    autenticado = True  # Exemplo: definindo como True para fins de teste

    return autenticado

@app.route('/')
def index():
    return render_template('menu.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Conectando ao banco de dados
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Verificando as credenciais do usuário
    cursor.execute("SELECT * FROM mini_game_registro WHERE usuario = %s AND senha = %s", (username, password))
    result = cursor.fetchone()

    # Fechando a conexão com o banco de dados
    cursor.close()
    conn.close()

    if result:
        return render_template('menu.html')
    else:
        return 'Usuário ou senha inválidos.'

@app.route('/market', methods=['GET', 'POST'])
def mercado():
    if verificar_autenticacao():
        if request.method == 'POST':
            posicao = request.form['posicao']

            # Conectar ao banco de dados
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Obter informações do mercado filtradas por posição
            cursor.execute("SELECT * FROM mini_game_mercado WHERE posi = %s", (posicao,))
            mercado_info = cursor.fetchall()

            # Fechando a conexão com o banco de dados
            cursor.close()
            conn.close()

            return render_template('mercado.html', mercado=mercado_info, posicao=posicao)
        else:
            # Conectar ao banco de dados
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Obter todas as informações do mercado
            cursor.execute("SELECT * FROM mini_game_mercado")
            mercado_info = cursor.fetchall()

            # Fechando a conexão com o banco de dados
            cursor.close()
            conn.close()

            return render_template('mercado.html', mercado=mercado_info, posicao=None)
    else:
        # Redireciona para a página de login
        return redirect(url_for('index'))

@app.route('/lineup')
def escalação_atual():
    if verificar_autenticacao():
        # Conectar ao banco de dados
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Obter informações da escalação atual
        cursor.execute("SELECT * FROM mini_game_registro")
        escalação_info = cursor.fetchall()

        # Fechando a conexão com o banco de dados
        cursor.close()
        conn.close()

        return render_template('escalacao.html', escalação=escalação_info)
    else:
        # Redireciona para a página de login
        return redirect(url_for('index'))












































if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

