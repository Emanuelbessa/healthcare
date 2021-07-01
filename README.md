<h1 align="center">Bem vindo a Healthcare 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Healthcare é um sistema de gerenciamento de uma clínica onde você pode organizar pacientes, profissionais e procedimentos.

### Stack de desenvolvimento
<div align="center"> 
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img alt="Angular" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white"/>
  <img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
</div>

<br />

## Instalação
1. Preencha o arquivo .env localizado dentro da pasta healthcare-back baseado no .env.example

2. Dentro da pasta healthcare-back, instale as dependências:
```sh
composer install
```
```sh
npm install
```
3. Em seguida rode as migrations, seeds e inicie o server. Atualmente as seed geram automáticamente 5 registros de cada, com o projeto rodando será possível realizar mais adições:

* Rodando as seeds
```sh
php artisan migrate --seed
```
* Iniciando api:
```sh
php artisan serve
```
4. Em seguida, dentro da pasta healthcare-front, instale as dependências do angular:
```sh
npm install
``` 
5. Por fim, inicie o projeto do angular:
```sh
npm start
```

## Author

👤 **Emanuel Bessa**
<div align="center">
  <a href="https://github.com/Emanuelbessa" target="_blank" title="Github">
    <img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/emanuel-bessa-825363205/" target="_blank" title="Linkedin">
    <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</div>

## 🤝 Contributing

Contribuições são sempre bem-vindas!<br />Fique à vontade para ver a [issues page](https://github.com/Emanuelbessa/healthcare/issues). 

## License

Licensed under the [MIT license](LICENSE)
