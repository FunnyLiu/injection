# Injection


# 源码分析

## 文件结构

``` bash
/Users/liufang/openSource/FunnyLiu/injection
├── src
|  ├── annotation
|  |  ├── index.ts
|  |  ├── inject.ts
|  |  ├── objectDef.ts
|  |  └── provide.ts
|  ├── base
|  |  ├── configuration.ts
|  |  ├── decoratorManager.ts
|  |  ├── functionDefinition.ts
|  |  ├── messageSource.ts
|  |  ├── objectCreator.ts
|  |  ├── objectDefinition.ts
|  |  ├── resource.ts
|  |  └── scope.ts
|  ├── factory
|  |  ├── applicationContext.ts
|  |  ├── common
|  |  |  ├── autowire.ts
|  |  |  ├── constants.ts
|  |  |  ├── managed.ts
|  |  |  └── managedResolverFactory.ts
|  |  ├── container.ts
|  |  ├── requestContainer.ts
|  |  └── xml
|  |     ├── example.xml
|  |     ├── interface.ts
|  |     ├── utils.ts
|  |     ├── xmlApplicationContext.ts
|  |     ├── xmlObjectDefinition.ts
|  |     ├── xmlObjectDefinitionParser.ts
|  |     └── xmlObjectElementParser.ts
|  ├── index.ts
|  ├── interfaces.ts
|  ├── jsx.ts
|  └── utils
|     ├── decorator.ts
|     ├── errMsg.ts
|     ├── errorFactory.ts
|     ├── lodashWrap.ts
|     ├── metaKeys.ts
|     ├── metadata.ts
|     ├── reflectTool.ts
|     └── xmldomWrap.ts
├── tsconfig.json
└── tslint.json

directory: 33 file: 122

ignored: directory (2)

```

## 外部模块依赖

请在： http://npm.broofa.com?q=injection 查看

## 内部模块依赖

![img](./inner.svg)
  

Injection is a powerful inversion of control container that is widely used in the midway framework and brings good user experience. 

## Installation

```bash
$ npm install injection reflect-metadata --save
```

Node.js >= 10.0.0 required.

> Injection requires TypeScript >= 2.0 and the experimentalDecorators, emitDecoratorMetadata, types and lib compilation options in your tsconfig.json file.

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "inlineSourceMap":true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "stripInternal": true,
    "pretty": true,
    "declaration": true,
    "outDir": "dist",
    "lib": ["ES2018", "dom"]
  }
}
```

## Getting Started

```ts
import {Container, provide, inject} from 'injection';

@provide('userModel')
class UserModel {

}

@provide('userService')
class UserService {
  
  @inject()
  private userModel;
  
  async getUser(uid) {
    // TODO
    return 'Alex';
  }
}


const container = new Container();
container.bind(UserService);
container.bind(UserModel);

async function getData() {
  const userService = await container.getAsync<UserService>('userService'); 
  const data = await userService.getUser(123);
  return data;
}

getData().then(console.log);
// Alex
```

Document: [https://midwayjs.org/injection/guide.html](https://midwayjs.org/injection/guide.html)

## License

[MIT]((http://github.com/midwayjs/midway/blob/master/LICENSE))
