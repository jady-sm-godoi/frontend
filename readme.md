# CMS Portal /internet

Documentação para a utilização de componentes do /internet

## Modulos javacript

- cookieManager
- dataLayer
- debounce
- offers
- theme

## Retornos

- faq questions
- head og:tags
- seo head tags

## Pode usar

- Brasil States

# Documentação da Classe ThemeManager

A classe **ThemeManager** é responsável por gerenciar temas de interface do usuário em uma página da web. Ela fornece funcionalidades para alternar entre temas, permitindo que os desenvolvedores ajustem a aparência da aplicação dinamicamente.

## Propriedades

### `themeKeys: { dark: string, light: string }`

- **Descrição:** Um objeto contendo as chaves 'dark' e 'light', representando os nomes dos temas escuro e claro, respectivamente. Essas chaves são utilizadas para definir o tema atual.

### `currentTheme: string`

- **Descrição:** Obtém ou define o tema atual da aplicação. Pode ser 'dark' ou 'light'.

## Métodos

### `set currentTheme(value: "light" | "dark"): void`

- **Descrição:** Define o tema atual da aplicação como 'light' (claro) ou 'dark' (escuro).

**Exemplo de Uso:**

```javascript
themeManager.currentTheme = 'dark';
```

### `runWhenChangeTheme(callback: (theme: "dark" | "light") => void): void`

- **Descrição:** Adiciona um callback que será executado quando o tema da aplicação for alterado. O callback recebe o tema atual como argumento.

**Exemplo de Uso:**

```javascript
themeManager.runWhenChangeTheme((theme) => {
    console.log('Tema alterado para:', theme);
});
```

## Métodos Privados

### `_readImages(): void`

- **Descrição:** Lê as imagens na página e armazena os caminhos das imagens claras e escuras, quando especificados usando o atributo `data-src-dark`.

### `_setImagePaths(): void`

- **Descrição:** Altera dinamicamente os caminhos das imagens na página com base no tema atual. As imagens especificadas como claras ou escuras são alternadas de acordo com o tema.

### `_applyTheme(args: { runCallbacks: boolean, runApplyImagePaths: boolean }): void`

- **Descrição:** Aplica o tema atual à página, adicionando a classe correspondente ('dark' ou 'light') ao elemento `<body>`. Pode também executar callbacks e ajustar os caminhos das imagens, dependendo das opções fornecidas.

### `_runCallbacksList(): void`

- **Descrição:** Executa todos os callbacks registrados quando o tema da aplicação é alterado, passando o tema atual como argumento para cada callback.

### `_runCallback(callback: Function, params: string): void`

- **Descrição:** Executa um callback específico associado à alteração de tema, passando o tema atual como argumento.

## Exemplo de Uso da Classe ThemeManager

```javascript
// Criando uma instância de ThemeManager
const themeManager = new ThemeManager();

// Definindo um callback para ser executado quando o tema é alterado
themeManager.runWhenChangeTheme((theme) => {
    console.log('Tema alterado para:', theme);
});

// Alterando o tema para 'dark'
themeManager.currentTheme = 'dark';
```

---

Esta documentação fornece uma descrição detalhada da classe ThemeManager, incluindo suas propriedades, métodos públicos e privados, bem como exemplos de uso para cada método público.

# Documentação da Classe OfferManager

A classe OfferManager é responsável por gerenciar ofertas de negócios e funcionalidades relacionadas. Ela contém vários métodos e propriedades para interagir com dados de cidades, ofertas e addons. Abaixo está uma visão geral dos métodos públicos e privados na classe, com exemplos de como usá-los.

## Propriedades

### `defaultCities`

- Tipo: `cityObject[]`
- Descrição: Array de objetos de cidade representando cidades padrão.

### `currentCity`

- Tipo: `cityObject`
- Descrição: Representa a cidade atualmente selecionada.

### `offerData`

- Tipo: `BusinessOffer`
- Descrição: Representa os dados da oferta de negócios atual.

## Métodos Públicos

### `searchCityByName(name: string): Promise<cityObject[]>`

- Parâmetros: `name` (string) - O nome da cidade a ser pesquisado.
- Retorna: Promise que resolve para um array de objetos de cidade correspondendo ao nome fornecido ou cidades padrão se não houver correspondência.
- Descrição: Procura cidades pelo nome e retorna objetos de cidade correspondentes.

**Exemplo de Uso:**

```javascript
offerManager.searchCityByName('São Paulo').then(cities => {
    console.log(cities);
});
```

### `searchCityById(id: string): Promise<cityObject>`

- Parâmetros: `id` (string) - O ID da cidade a ser pesquisado.
- Retorna: Promise que resolve para um objeto de cidade com o ID fornecido.
- Descrição: Procura uma cidade pelo ID e retorna o objeto de cidade.

**Exemplo de Uso:**

```javascript
offerManager.searchCityById('123').then(city => {
    console.log(city);
});
```

### `setDefaultConfigs(): void`

- Descrição: Define as configurações padrão de cidade e oferta. Usado quando nenhuma cidade é encontrada nos cookies.

**Exemplo de Uso:**

```javascript
offerManager.setDefaultConfigs();
```

### `setCurrentCityById(id: string): void`

- Parâmetros: `id` (string) - O ID da cidade a ser definido como a cidade atual.
- Descrição: Define a cidade atual usando o ID fornecido e busca os dados da oferta correspondentes.

**Exemplo de Uso:**

```javascript
offerManager.setCurrentCityById('456');
```

### `setCurrentCityByIndex(index: string | number): void`

- Parâmetros: `index` (string | number) - Índice da cidade no último array de pesquisa de cidade.
- Descrição: Define a cidade atual com base no índice fornecido e busca os dados da oferta correspondentes.

**Exemplo de Uso:**

```javascript
offerManager.setCurrentCityByIndex(0);
```

### `runWhenCityLoad(callback: (cityObject) => void): void`

- Parâmetros: `callback` ((cityObject) => void) - Função de callback a ser executada quando a cidade atual for carregada.
- Descrição: Adiciona uma função de callback para ser executada quando a cidade atual for carregada.

**Exemplo de Uso:**

```javascript
offerManager.runWhenCityLoad(city => {
    console.log('Cidade carregada:', city);
});
```

### `runWhenOfferLoad(callback: (offer: BusinessOffer) => void): void`

- Parâmetros: `callback` ((offer: BusinessOffer) => void) - Função de callback a ser executada quando os dados da oferta forem carregados.
- Descrição: Adiciona uma função de callback para ser executada quando os dados da oferta forem carregados.

**Exemplo de Uso:**

```javascript
offerManager.runWhenOfferLoad(offer => {
    console.log('Oferta carregada:', offer);
});
```

## Métodos Privados

### `_requestOffer(args: { city: string, uf: string }): Promise<BusinessOffer>`

- Parâmetros: `args` ({ city: string, uf: string }) - Objeto contendo informações de cidade e UF (estado).
- Retorna: Promise que resolve para um objeto BusinessOffer.
- Descrição: Envia uma solicitação à API de backend para buscar dados da oferta para a cidade e UF especificadas.

### `_executeCityCallbacks(): void`

- Descrição: Executa os callbacks de cidade registrados com os dados da cidade atual.

### `_executeOfferCallbacks(): void`

- Descrição: Executa os callbacks de oferta registrados com os dados da oferta atual.

### `_errorWhenFetchCity(err: any): void`

- Parâmetros: `err` (any) - Objeto de erro recebido ao buscar dados da cidade.
- Descrição: Trata erros que ocorrem durante operações de busca de dados da cidade.

## Getters e Setters

### `getCityFromCookies(): cityObject`

- Retorna: cityObject
- Descrição: Recupera dados da cidade dos cookies e retorna um objeto de cidade.

### `setCityOnCookies(value: cityObject): void`

- Parâmetros: `value` (cityObject) - Objeto de cidade contendo informações de cidade, ID, UF e DDD.
- Descrição: Define dados da cidade nos cookies usando o objeto de cidade fornecido.

## Tipos de Dados

### `cityObject`

- Propriedades:
  - `id` (string) - ID da cidade.
  - `city` (string) - Nome da cidade.
  - `uf` (string) - Abreviação do estado.
  - `ddd` (number) - Código de área.
  - `normalized` (number) - Valor normalizado (não especificado).

### `Attachment`

- Propriedades:
  - `title` (string) - Título do anexo.
  - `url` (string) - URL do anexo.

### `ChildProduct`

- Propriedades:
  - Várias propriedades representando detalhes do produto, como nome, código, descrição, etc.

### `Addon`

- Propriedades:
  - Várias propriedades representando detalhes do addon, como código, nome, descrição, etc.

### `Addons`

- Propriedades:
  - Propriedades representando diferentes tipos de addons (por exemplo, OI_PLAY_TV, SVOD_GLOBOPLAY, etc.).

### `Offer`

- Propriedades:
  - Várias propriedades representando detalhes da oferta, como código, nome, descrição, etc.

### `BusinessOffer`

- Propriedades:
  - `offers` (Offer[]) - Array de ofertas.
  - Várias outras propriedades representando diferentes aspectos da oferta de negócios.

---

Esta documentação fornece uma visão abrangente da classe OfferManager, incluindo seus métodos, propriedades e tipos de dados, permit

indo que os desenvolvedores entendam e utilizem a classe de forma eficaz.

# Documentação da Classe CookiesManager

A classe CookiesManager é responsável por gerenciar cookies do navegador. Ela oferece métodos para recuperar, definir e excluir cookies, bem como para obter uma lista de todos os cookies disponíveis.

## Construtor

### `constructor()`

- Descrição: Inicializa a instância da classe CookiesManager e cria um objeto de cookies vazio. Em seguida, atualiza a lista de cookies chamando o método `refreshCookieList()`.

## Métodos Públicos

### `get(key: string): any`

- Parâmetros: `key` (string) - A chave do cookie a ser recuperado.
- Retorna: Valor do cookie correspondente à chave fornecida.
- Descrição: Recupera o valor do cookie associado à chave fornecida.

**Exemplo de Uso:**

```javascript
const username = cookiesManager.get('username');
console.log('Nome de usuário:', username);
```

### `getJson(): object`

- Retorna: Objeto contendo todos os cookies como pares chave-valor.
- Descrição: Retorna todos os cookies como um objeto JavaScript.

**Exemplo de Uso:**

```javascript
const allCookies = cookiesManager.getJson();
console.log('Todos os cookies:', allCookies);
```

### `set(key: string, value: string): void`

- Parâmetros:
  - `key` (string) - A chave do cookie a ser definido.
  - `value` (string) - O valor do cookie a ser definido.
- Descrição: Define um cookie com a chave e valor fornecidos no navegador. Após definir o cookie, atualiza a lista de cookies chamando o método `refreshCookieList()`.

**Exemplo de Uso:**

```javascript
cookiesManager.set('username', 'john_doe');
```

### `delete(key: string): void`

- Parâmetros: `key` (string) - A chave do cookie a ser excluído.
- Descrição: Exclui o cookie associado à chave fornecida. (Nota: A implementação real do método `delete` está marcada como "TODO" na classe original e não foi fornecida no código fornecido.)

## Métodos Privados

### `refreshCookieList(): void`

- Descrição: Atualiza a lista de cookies, convertendo a string de cookies do documento em um objeto JavaScript contendo pares chave-valor.

## Exemplo de Uso da Classe CookiesManager

```javascript
// Criando uma instância de CookiesManager
const cookiesManager = new CookiesManager();

// Definindo um cookie com chave 'user_id' e valor '12345'
cookiesManager.set('user_id', '12345');

// Obtendo o valor do cookie 'user_id'
const userId = cookiesManager.get('user_id');
console.log('ID do usuário:', userId); // Saída: ID do usuário: 12345

// Obtendo todos os cookies como um objeto JavaScript
const allCookies = cookiesManager.getJson();
console.log('Todos os cookies:', allCookies); // Saída: Todos os cookies: { user_id: '12345' }
```

---

Esta documentação fornece uma descrição detalhada da classe CookiesManager, incluindo seus métodos públicos e privados, bem como exemplos de uso para cada método público.

# Documentação da Função debounce

A função **debounce** é uma técnica importante para evitar a execução excessiva de uma função em resposta a eventos frequentes, como redimensionamento da janela ou entrada do usuário. Ela ajuda a otimizar o desempenho, garantindo que uma função seja chamada apenas após um determinado período de inatividade. Abaixo está a descrição detalhada da função, incluindo seus parâmetros, retorno e exemplos de uso.

## Função debounce

### `debounce(functionCallback: Function, timeout: number = 300): Function`

- **Descrição:** Cria e retorna uma versão "debounced" da função de retorno de chamada fornecida. A versão debounced só será executada após um intervalo de tempo especificado após a última vez que a função foi chamada. Se a função for chamada novamente dentro do intervalo de tempo, o temporizador será reiniciado.

#### Parâmetros:

- `functionCallback` (Function): A função de retorno de chamada que será debounced.
- `timeout` (number, opcional, padrão: 300): O tempo de espera em milissegundos após o qual a função de retorno de chamada será executada se não houver chamadas adicionais.

#### Retorna:

- (Function): Uma função debounced que pode ser chamada para executar a função de retorno de chamada após o intervalo de tempo especificado.

## Exemplo de Uso:

```javascript
// Função de retorno de chamada para debouncing
function handleInput(input) {
  console.log('Texto digitado:', input);
}

// Criando uma versão debounced da função handleInput com um intervalo de tempo de 500ms
const debouncedHandleInput = debounce(handleInput, 500);

// Chamando a função debounced quando o usuário digita algo
document.getElementById('inputField').addEventListener('input', (event) => {
  debouncedHandleInput(event.target.value);
});
```

Neste exemplo, a função `handleInput` será chamada apenas quando o usuário parar de digitar por 500 milissegundos, evitando chamadas excessivas durante a entrada contínua. O intervalo de tempo pode ser ajustado passando um valor diferente como segundo argumento para a função `debounce`.



# Documentação da Classe `VLibrasManager`

A classe `VLibrasManager` é responsável por gerenciar o estado da integração do VLibras em uma página da web. Ela oferece métodos para configurar o estado do VLibras, bem como para adicionar callbacks que serão executados quando o estado do VLibras for alterado.

## Construtor

### `constructor()`

- **Descrição:** Construtor da classe `VLibrasManager`.
- **Propriedades Privadas:**
  - `_currentState`: Estado atual do VLibras (`true` para ativado, `false` para desativado).
  - `vlibrasContainer`: Elemento HTML `<div>` que contém o widget do VLibras.
  - `vlibrasCallback`: Array de callbacks para serem executados quando o estado do VLibras é alterado.
- **Métodos Privados Utilizados:**
  - `deployVlibras()`
  - `_deployCallbacks()`
- **Exemplo de Uso:**
  ```javascript
  const vlibrasManager = new VLibrasManager();
  ```

## Métodos Públicos

### `set currentState(state: boolean): void`

- **Descrição:** Define o estado do VLibras (ativado/desativado).
- **Parâmetros:**
  - `state`: Booleano indicando se o VLibras está ativado (`true`) ou desativado (`false`).
- **Exemplo de Uso:**
  ```javascript
  vlibrasManager.currentState = true;
  ```

### `get currentState(): boolean`

- **Descrição:** Obtém o estado atual do VLibras.
- **Retorno:** Booleano indicando se o VLibras está ativado (`true`) ou desativado (`false`).
- **Exemplo de Uso:**
  ```javascript
  const isVLibrasEnabled = vlibrasManager.currentState;
  console.log(isVLibrasEnabled);
  ```

### `runWhenChangeState(callback: vlibrasCallback): void`

- **Descrição:** Adiciona um callback para ser executado quando o estado do VLibras é alterado.
- **Parâmetros:**
  - `callback`: Função de callback que recebe um booleano indicando o estado atual do VLibras.
- **Exemplo de Uso:**
  ```javascript
  vlibrasManager.runWhenChangeState(isEnabled => {
    console.log(`VLibras está ativado: ${isEnabled}`);
  });
  ```

## Tipos Utilizados

### `vlibrasCallback`

- **Descrição:** Tipo de função de callback que recebe um booleano indicando o estado atual do VLibras.
- **Parâmetros:**
  - `state`: Booleano indicando se o VLibras está ativado (`true`) ou desativado (`false`).
- **Exemplo de Uso:**
  ```javascript
  /** @type {vlibrasCallback} */
  const callbackFunction = (state) => {
    console.log(`O estado do VLibras foi alterado para: ${state}`);
  };
  ```
