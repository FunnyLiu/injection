import { ManagedValue } from '..';
import {
  IApplicationContext,
  IConfiguration,
  IManagedInstance,
  IObjectCreator,
  IObjectDefinition,
  ObjectIdentifier,
  Scope
} from '../interfaces';
import { ScopeEnum } from './scope';
import { ObjectCreator } from './objectCreator';
//继承自对象构建基类，具有初始化，销毁等逻辑
//definition还是由外部初始化时传入
//桥接模式之“精确抽象”部分
class FunctionWrapperCreator extends ObjectCreator {

  context;

  constructor(definition: IObjectDefinition, context: IApplicationContext) {
    super(definition);
    this.context = context;
  }

  doConstruct(Clzz: any, args: IManagedInstance[] = []): any {
    if (!Clzz) {
      return null;
    }

    if (args.length) {
      return Clzz((args[0] as ManagedValue).value);
    } else {
      return Clzz(this.context);
    }
  }

  async doConstructAsync(Clzz: any, args: IApplicationContext[] = []): Promise<any> {
    if (!Clzz) {
      return null;
    }
    if (args.length) {
      return Clzz(args[0]);
    } else {
      return Clzz(this.context);
    }
  }
}

export class FunctionDefinition implements IObjectDefinition {

  context;

  constructor(context: IApplicationContext) {
    this.context = context;
    //FunctionWrapperCreator为“具体抽象”，this所指的FunctionDefinition为“具体实现”
    this.creator = new FunctionWrapperCreator(this, context);
  }

  constructMethod: string;
  constructorArgs: IManagedInstance[] = [];
  creator: IObjectCreator;
  dependsOn: ObjectIdentifier[];
  destroyMethod: string;
  export: string;
  id: string;
  name: string;
  initMethod: string;
  path: any;
  properties: IConfiguration;
  // 函数工厂创建的对象默认不需要自动装配
  protected innerAutowire = false;
  protected innerScope: Scope = ScopeEnum.Singleton;

  set autowire(autowire: boolean) {
    this.innerAutowire = autowire;
  }

  getAttr(key: ObjectIdentifier): any {
  }

  hasAttr(key: ObjectIdentifier): boolean {
    return false;
  }

  hasConstructorArgs(): boolean {
    return false;
  }

  hasDependsOn(): boolean {
    return false;
  }

  isAsync(): boolean {
    return true;
  }

  isAutowire(): boolean {
    return this.innerAutowire;
  }

  isDirect(): boolean {
    return false;
  }

  isExternal(): boolean {
    return false;
  }

  set scope(scope: Scope) {
    this.innerScope = scope;
  }

  isSingletonScope(): boolean {
    return this.innerScope === ScopeEnum.Singleton;
  }

  isRequestScope(): boolean {
    return this.innerScope === ScopeEnum.Request;
  }

  setAttr(key: ObjectIdentifier, value: any): void {
  }
}
