## O Desafio

Temos uma demanda para integrar dois sistemas. O sistema legado que possui um arquivo de
pedidos desnormalizado, precisamos transformá-lo em um arquivo json normalizado. E para isso
precisamos satisfazer alguns requisitos.

## Objetivo

Faça um sistema que receba um arquivo via API REST e processe-o para ser retornado via API
REST.

## Passo a Passo da aplicação

- Após iniciar as aplicações, inicie os Contêiners com os comandos abaixo:

```
    docker-compose up -d
```

> O phpmyadmin foi adicionado ao projeto para ter uma interface amigável para visualizar os registros importados, sendo assim, o mesmo está rodando na porta '8080'

> Além do phpmyadmin, nosso contêiner 'mariadb' está rodando na porta '3306'.

Após iniciar os conteiners, é necessário instalar as dependências do projeto.

- Dentro do diretório '/api', rode os seguintes comandos abaixo:

```
    npm install
    npm start
```

> Note que nossa api está rodando na porta 8081

- Dentro do diretório '/front', rode o comando abaixo:

```
    npx next dev
```
> Note que nosso front está rodando na porta '3000'

Após iniciar nosso front-end, ficam aqui outros avisos:


- Após iniciar, a aplicação estará com o banco de dados vazio, sendo necessário fazer o import do arquivo através do botão `Import`:

![Home Screen](/images/home.png)

- Com isso, após efetuar todo o import do arquivo. É possível pesquisar e executar as funcionalidades do sistema, como por exemplo, "Export JSON" onde disponibilizará o JSON resposta padrão da API, onde foi divido em diferentes Tables para demonstrar os pedidos importados.

> Efetuei as pesquisas páginadas de 10 em 10, sendo necessário clicar em "+" ou "-" para manipular as mesmas.