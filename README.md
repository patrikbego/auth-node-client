# Authorization Nextjs Client

This is a Auth Nextjs Client
The project contains following source files:
```
├── README.md
├── package.json
├── pages
│   ├── _app.js
│   ├── _document.js
│   ├── about.js
│   ├── confirmEmail.js
│   ├── index.js
│   ├── login.js
│   └── signup.js
├── privkey.pem
├── server.js
└── src
    ├── api
    │   └── controller.js
    ├── components
    │   ├── Copyright.js
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── Link.js
    │   ├── Login.js
    │   ├── MainLayout.js
    │   ├── ProTip.js
    │   ├── SignUp.js
    │   ├── formFields
    │   │   ├── Password.js
    │   │   ├── Phone.js
    │   │   └── TextFieldRequired.js
    │   └── theme.js
    └── utils
        ├── facebookService.js
        ├── googleService.js
        ├── reducers
        │   ├── StateProvider.js
        │   └── reducer.js
        ├── storeUtils.js
        └── validationHooks.js
```

## Prerequisites
### Create Certificate
Locally you should create a certificate with openssl:
```shell
openssl req -x509 -out localhost.crt -keyout localhost.key \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=localhost' -extensions EXT -config <( \
printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
Update the server.js with private key and certificate

### Build project
`npm install && npm run build`

### Run the project
#### HTTPS
`node server.js` - https  
`npm run dev` - http

### Code Quality
`docker-compose -f docker-compose.sonar.yml up -d` - starts sonar (optional)  
`node sonar-scanner.js`  
`eslint .`

### Test execution
`jest --detectOpenHandles --collectCoverage .`

### Running it with docker
`#docker rm -f $(docker ps -aq)`  
`#docker rmi -f $(docker images -a -q)`  
`docker build -t auth-node .`  
`docker run --name auth-node-api -d -p 8888:3005 auth-node`


`npm run dev`
