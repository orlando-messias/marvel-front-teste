## Marvel Challenge Frontend

### :information_source: Sobre
Após o usuário se cadastrar no sistema e realizar login, é permitido visualizar e interagir com Personagens :muscle: e Comics :newspaper: da Marvel. Todas as informações sobre os Personagens e Comics vêm da API https://developer.marvel.com e as informações dos usuários são gerenciadas pelo backend em [marvel-challenge-backend](https://github.com/orlando-messias/marvel-challenge-backend).

Na página ***home***, a aplicação exibe os primeiros 20 personagens em formato de card e disponibiliza uma barra de pesquisa para procurar por um nome de Personagem ou título de um Comic.

#### :camera: Screenshot
<p align="center"><img src="/src/assets/home-screen.png"></p>


Ao localizar um personagem:
- são exibidas suas informações principais;
- o usuário pode favoritá-lo ou desfavoritá-lo;
- mostra os Comics em que ele está inserido.
#### :camera: Screenshot
<p align="center"><img src="/src/assets/character-screen.png"></p>


Ao localizar um Comic:
- são exibidas suas informações principais;
- é possível clicar e acessar os seus detalhes;
- na página de detalhes é possível favoritar ou desfavoritar o Comic.
#### :camera: Screenshot
<p align="center"><img src="/src/assets/comic-screen.png"></p>


Na topbar, o link ***Favorites*** direciona o usuário para a página **favorites** que exibe os personagens e comics favoritados.

Algumas características:
- Responsividade;
- Utiliza Redux para gerenciar os dados do usuário logado como *name*, *email* e *token*;
- Campos dos formulários possuem validações lógicas e visuais;
- Utiliza token para as requisições;
- Os dados dos usuários e os personagens/comics favoritados são armazenados em banco de dados MySql.

### :bulb: Antes de Começar
Clone e inicialize o backend [marvel-challenge-backend](https://github.com/orlando-messias/marvel-challenge-backend) para o gerenciamento do login e dos dados dos usuários.


### :gear: Instalações
```
## Clone este repositório
$ git clone https://github.com/orlando-messias/marvel-challenge-frontend.git

## Instale todas as dependências
$ npm install

## Inicialize o projeto
$ npm start

```

### :hammer_and_wrench: Tecnologias
- [ReactJS](https://reactjs.org/)
- [React Redux](https://redux.js.org//)
- [Axios](https://www.npmjs.com/package/axios)
- [React-Icons](https://react-icons.netlify.com)


#
> Developed by Orlando Messias [linkedin.com/in/orlando-messias-dev](https://www.linkedin.com/in/orlando-messias-dev)

