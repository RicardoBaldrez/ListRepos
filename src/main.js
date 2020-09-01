import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formElement = document.getElementById('repo-form');
        this.inputElement = document.querySelector('input[name=repository]')
        this.listElement = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        event.preventDefault();

        const inputValue = this.inputElement.value;

        if (inputValue.length === 0) {
            return;
        }

        const response = await api.get(`/repos/${inputValue}`);

        const {
            name,
            description,
            owner: {
                avatar_url,
                html_url
            }
        } = response.data;

        this.repositories.push(
            {
                name,
                description,
                avatar_url,
                html_url
            }
        );

        this.inputElement.value = '';

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