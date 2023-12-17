# Explicação do Código Node.js com Express, express-session e connect-flash 👋

### Este documento fornece uma explicação detalhada do código Node.js que utiliza o framework Express e as bibliotecas `express-session` e `connect-flash` para configurar sessões de usuário e mensagens flash em um servidor web.

## Configuração da Sessão
# 🧑‍💻
```javascript
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);
```
# 💡
## Explicação:
### Nesta parte do código, a sessão do usuário é configurada no aplicativo. As sessões são usadas para armazenar informações do usuário entre diferentes requisições `HTTP`, permitindo que o aplicativo mantenha um estado de usuário durante uma visita. Aqui estão os detalhes dos parâmetros usados: `secret`: É uma chave secreta usada para assinar os `cookies` da sessão, tornando-os mais seguros. Esta chave deve ser mantida em segredo. `resave`: Define se a sessão deve ser salva novamente no servidor a cada solicitação, mesmo que não tenha sido modificada. true significa que a sessão será sempre salva. `saveUninitialized`: Define se as sessões devem ser salvas no servidor, mesmo que não tenham sido inicializadas (ou seja, não tenham sido modificadas durante a solicitação). `true` significa que as sessões serão salvas mesmo que não tenham sido usadas.

```javascript
 //Definindo flash para mensagens de flash
app.use(flash());
//Middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
```
# 💡
### Explicação: Estamos definindo um middleware, nele estamos definindo duas variáveis, de `Erro` e `Sucesso`, que seus valores podem ser definidos em alguma rota(Por exemplo uma rota `/login` que define a mensagem de Erro, e exibe se o login for mal sucessido).    