# projeto13-mywallet-back

MyWallet backend, a simple app for financial control.

Try out the fronted app at https://mywallet-eumerme.vercel.app/

# About

This project is a simple finance manager in which you can register earnings and expenses. You will always be up on of your bank balance, ensuring greater control over your financial life.

# How to run

- Clone this repository
- Run `npm i` to installl dependencies
- Create a `.env` file with a `PORT` and a `MONGO_URI` as in `.env.example` file
- Run `npm run dev` to start the local server

# API endpoints

### `POST /signup`

- Request:

```json
{
	"name": "Seu nome",
	"email": "Seu email",
	"password": "Sua senha",
	"confirmPassword": "Sua senha"
}
```

- Response: 201 Created

### `POST /login`

- Request:

```json
{
	"email": "Seu email",
	"password": "Sua senha"
}
```

- Response: 200 Ok

### `POST /logout`

- Response: 200 Ok

### `POST /transactions`

- Request:

```json
{
	"email": "Seu email",
	"value": 1290,
	"description": "Almoço",
	"type": "credit",
	"date": "07/01"
}
```

- Response: 201 Created

### `GET /transactions`

- Response: 200 Ok

```json
{
	"_id" : ObjectId("63bd75c68c24f6235192c091"),
	"email": "Seu email",
	"value": 1290,
	"description": "Almoço",
	"type": "credit",
	"date": "07/01"
}
```

### `DELETE /transactions/:id`

- Response: 200 Ok
