# Mini Game - Flask App

Este é um mini jogo desenvolvido usando o framework Flask para Python. O jogo possui um sistema de login e algumas funcionalidades para interagir com um banco de dados MySQL.

## Configuração do Banco de Dados

Antes de executar o aplicativo, é necessário configurar as informações do banco de dados MySQL no código. Você precisará fornecer os detalhes de autenticação para estabelecer a conexão com o banco de dados:

```python
db_config = {
    'user': '',          # Nome de usuário do banco de dados
    'password': '',      # Senha do banco de dados
    'host': '',          # Endereço do servidor do banco de dados
    'database': '',      # Nome do banco de dados
    'raise_on_warnings': True
}
```

## Funcionalidades do Mini Jogo

O aplicativo Flask possui as seguintes funcionalidades:

### Página Inicial - "/"

A página inicial exibe um menu básico com as opções disponíveis para o usuário. Para acessar outras páginas, o usuário precisa fazer login no sistema.

### Login - "/login" (Método POST)

A página de login permite ao usuário autenticar-se no sistema. O aplicativo verifica as credenciais fornecidas pelo usuário com as informações armazenadas no banco de dados. Se as credenciais estiverem corretas, o usuário será redirecionado para a página do menu; caso contrário, receberá uma mensagem de "Usuário ou senha inválidos."

### Mercado - "/market" (Método GET e POST)

A página do mercado exibe informações sobre os produtos disponíveis para compra. Se o usuário estiver autenticado, ele poderá selecionar uma posição específica para filtrar as informações exibidas. As informações do mercado são obtidas do banco de dados.

### Escalação Atual - "/lineup"

A página da escalação atual exibe informações sobre os jogadores registrados no sistema. Apenas usuários autenticados podem acessar essa página. As informações são obtidas do banco de dados.

## Executando o Aplicativo

Para executar o aplicativo, você pode usar o seguinte comando no terminal:

```bash
python app.py
```

O aplicativo estará disponível em `http://localhost:80/`. Certifique-se de ter as dependências do Flask e do conector MySQL instaladas antes de executar o aplicativo.

**Observação:** Este é apenas um mini jogo de exemplo com funcionalidades básicas. Certifique-se de implementar medidas adicionais de segurança e autenticação antes de implantar o aplicativo em um ambiente de produção.
# Versão atualizada
http://bslsuperpro.com.br/
