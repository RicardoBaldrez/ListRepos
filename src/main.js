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

    setLoading(loading = true) {
        if (loading === true) {
            let loadElement = document.createElement('p');
            loadElement.appendChild(document.createTextNode('Carregando ...'));
            loadElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadElement);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const inputValue = this.inputElement.value;

        if (inputValue.length === 0) {
            alert('Digite o repositório para buscar!!!');
            return;
        }

        this.setLoading();

        try {
            const response = await api.get(`/repos/${inputValue}`);

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url,
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

            this.render()

        } catch (error) {
            // alert(`O repositório ${inputValue} não existe!!!`);
            this.listElement.innerHTML = '';

            let listItemElement = document.createElement('li');
            listItemElement.style.color = 'red';
            listItemElement.style.fontWeight = 'bold';
            listItemElement.appendChild(document.createTextNode(`O repositório '${inputValue}' não existe!!!`));
            this.listElement.appendChild(listItemElement);
        };

        this.setLoading(false);
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
            linkElement.setAttribute('target', '_blank');
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