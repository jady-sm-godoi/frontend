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


# Documentação da Classe `OfferManager`

A classe `OfferManager` é responsável por gerenciar dados relacionados a ofertas de negócios, cidades e configurações padrão em uma aplicação web. Ela oferece métodos para buscar informações sobre cidades, configurar ofertas padrão e oferece funcionalidades para adicionar callbacks que serão executados quando dados de cidade ou ofertas são alterados.

## Construtor

### `constructor()`

- **Descrição:** Construtor da classe `OfferManager`.
- **Propriedades Privadas:**
  - `_cookies`: Instância de `CookiesManager` para gerenciar cookies.
  - `offerData`: Objeto contendo dados sobre ofertas de negócios.
  - `_backendUrl`: URL base para fazer requisições ao backend.
  - `_cityCallbacks`: Array de callbacks para dados de cidade.
  - `_offerCallbacks`: Array de callbacks para dados de ofertas.
  - `_defaultCityUrl`: URL para buscar cidades padrão em caso de falha.
  - `_lastCitySearch`: Última pesquisa de cidades realizada.
  - `defaultCities`: Lista de cidades padrão.
  - `_currentCity`: Objeto contendo dados da cidade atual.
- **Métodos Privados Utilizados:**
  - `searchCityByName(name: string): Promise<cityObject[]>`
  - `searchCityById(id: string): Promise<cityObject>`
  - `requestDefaultCities(): Promise<cityObject[]>`
  - `setDefaultConfigs(): void`
  - `_requestOffer(args: { city: string, uf: string }): Promise<BusinessOffer>`
- **Exemplo de Uso:**
  ```javascript
  const offerManager = new OfferManager();
  ```

## Métodos Públicos

### `async searchCityByName(name: string): Promise<cityObject[]>`

- **Descrição:** Busca cidades pelo nome.
- **Parâmetros:**
  - `name`: Nome da cidade a ser buscado.
- **Retorno:** Promise resolvida com um array de objetos `cityObject`.
- **Exemplo de Uso:**
  ```javascript
  const cities = await offerManager.searchCityByName("São Paulo");
  console.log(cities);
  ```

### `async searchCityById(id: string): Promise<cityObject>`

- **Descrição:** Busca uma cidade pelo ID.
- **Parâmetros:**
  - `id`: ID da cidade a ser buscado.
- **Retorno:** Promise resolvida com um objeto `cityObject`.
- **Exemplo de Uso:**
  ```javascript
  const city = await offerManager.searchCityById("12345");
  console.log(city);
  ```

### `async setCurrentOffer(args: { city: string, uf: string }): Promise<BusinessOffer>`

- **Descrição:** Define a oferta atual com base na cidade e UF fornecidas.
- **Parâmetros:**
  - `args`: Objeto contendo `city` (nome da cidade) e `uf` (sigla do estado).
- **Retorno:** Promise resolvida com um objeto `BusinessOffer`.
- **Exemplo de Uso:**
  ```javascript
  const offer = await offerManager.setCurrentOffer({ city: "São Paulo", uf: "SP" });
  console.log(offer);
  ```

### `async setCurrentCityById(id: string): void`

- **Descrição:** Define a cidade atual pelo seu ID.
- **Parâmetros:**
  - `id`: ID da cidade a ser definido como a cidade atual.
- **Exemplo de Uso:**
  ```javascript
  offerManager.setCurrentCityById("12345");
  ```

### `setCurrentCityByIndex(index: string | number): void`

- **Descrição:** Define a cidade atual com base no índice da última pesquisa de cidades.
- **Parâmetros:**
  - `index`: Índice da cidade na última pesquisa de cidades.
- **Exemplo de Uso:**
  ```javascript
  offerManager.setCurrentCityByIndex(0);
  ```

### `runWhenCityLoad(callbackType: callbackType, callback: (city: cityObject, isLoading: boolean) => void): void`

- **Descrição:** Adiciona um callback para ser executado quando os dados da cidade são alterados.
- **Parâmetros:**
  - `callbackType`: Tipo de callback ("data" para dados, "loading" para indicar que os dados estão sendo carregados).
  - `callback`: Função de callback que recebe um objeto `cityObject` e um booleano indicando se os dados estão sendo carregados.
- **Exemplo de Uso:**
  ```javascript
  offerManager.runWhenCityLoad("data", (city, isLoading) => {
    console.log(`Dados da cidade: ${JSON.stringify(city)}`);
  });

  offerManager.runWhenCityLoad("loading", (city, isLoading) => {
    console.log(`Dados estão sendo carregados: ${isLoading}`);
  });
  ```

### `runWhenOfferLoad(callbackType: callbackType, callback: (offer: BusinessOffer, isLoading: boolean) => void): void`

- **Descrição:** Adiciona um callback para ser executado quando os dados da oferta são alterados.
- **Parâmetros:**
  - `callbackType`: Tipo de callback ("data" para dados, "loading" para indicar que os dados estão sendo carregados).
  - `callback`: Função de callback que recebe um objeto `BusinessOffer` e um booleano indicando se os dados estão sendo carregados.
- **Exemplo de Uso:**
  ```javascript
  offerManager.runWhenOfferLoad("data", (offer, isLoading) => {
    console.log(`Dados da oferta: ${JSON.stringify(offer)}`);
    console.log(`Dados estão sendo carregados: ${isLoading}`);
  });
  ```

## Tipos Utilizados

### `cityObject`

- **Descrição:** Objeto representando uma cidade.
- **Propriedades:**
  - `id`: ID da cidade.
  - `city`: Nome da cidade.
  - `uf`: Sigla do estado.
  - `ddd`: Código DDD da cidade.
  - `normalized`: Propriedade não especificada na documentação.

### `callbackType`

- **Descrição:** Tipo de callback, indicando se os dados estão sendo carregados ("loading") ou se os dados estão prontos para serem usados ("data").

### `Attachment`

- **Descrição:** Objeto representando um anexo.
- **Propriedades:**
  - `title`: Título do anexo.
  - `url`: URL do anexo.

### `ChildProduct`

- **Descrição:** Objeto representando um produto relacionado a uma oferta.
- **Propriedades:**
  - `name`: Nome do produto.
  - `code`: Código do produto.
  - `description`: Descrição do produto.
  - `endOfLifeDate`: Data de fim de vida do produto.
  - `chargeamount`: Valor cobrado pelo produto.
  - `downloadSpeed`: Velocidade de download do produto.
  - `type`:

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
