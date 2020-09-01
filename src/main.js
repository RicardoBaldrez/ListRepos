class App {
    constructor() {
        this.repositories = [];

        this.formElement = document.getElementById('repo-form');
        this.listElement = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    addRepository(event) {
        event.preventDefault();

        this.repositories.push(
            {
                name: 'rocketseat.com.br',
                description: 'Tire a sua ideia do papel, e de vida a sua startup.',
                avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?v=4',
                html_url: 'http://github.com/rocketseat/rocketseat.com.br'
            }
        );

        this.render();
    }

    render() {
        this.listElement.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repo.avatar_url);

            let titleElement = document.createElement('strong');
            titleElement.appendChild(document.createTextNode(repo.name));

            let descElement = document.createElement('p');
            descElement.appendChild(document.createTextNode(repo.description));

            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', repo.html_url);
            linkElement.setAttribute('_target', '_blank');
            linkElement.appendChild(document.createTextNode('Acessar'));

            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement);
            listItemElement.appendChild(titleElement);
            listItemElement.appendChild(descElement);
            listItemElement.appendChild(linkElement);


            this.listElement.appendChild(listItemElement);
        });
    }
}

new App();