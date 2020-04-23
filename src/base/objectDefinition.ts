//提供ObjectDefinition类
import { IObjectCreator, IObjectDefinition, ObjectIdentifier, Scope } from '../interfaces';
import { ScopeEnum } from './scope';
import { ObjectConfiguration } from './configuration';
import { ObjectCreator } from './objectCreator';

/* tslint:disable:variable-name */
export class ObjectDefinition implements IObjectDefinition {
  protected _attrs = new Map<ObjectIdentifier, any>();
  protected _asynchronous = false;
  // 对象定义默认需要自动装配
  protected _autowire = true;
  protected _external = false;
  protected _direct = false;
  scope: Scope = ScopeEnum.Singleton;
  creator: IObjectCreator = null;
  id: string = null;
  name: string = null;
  initMethod: string = null;
  destroyMethod: string = null;
  constructMethod: string = null;
  constructorArgs: any[] = [];
  path: any = null;
  export: string = null;
  dependsOn: ObjectIdentifier[] = [];
  properties = new ObjectConfiguration();

  constructor() {
    this.creator = new ObjectCreator(this);
  }

  set autowire(autowire: boolean) {
    this._autowire = autowire;
  }

  isAutowire(): boolean {
    return this._autowire;
  }

  set asynchronous(asynchronous: boolean) {
    this._asynchronous = asynchronous;
  }

  isAsync(): boolean {
    return this._asynchronous;
  }

  isSingletonScope(): boolean {
    return this.scope === ScopeEnum.Singleton;
  }

  isRequestScope(): boolean {
    return this.scope === ScopeEnum.Request;
  }

  set external(external: boolean) {
    this._external = external;
  }

  isExternal(): boolean {
    return this._external;
  }

  set direct(direct: boolean) {
    this._direct = direct;
  }

  isDirect(): boolean {
    return this._direct;
  }

  hasDependsOn(): boolean {
    return this.dependsOn.length > 0;
  }

  hasConstructorArgs(): boolean {
    return this.constructorArgs.length > 0;
  }

  getAttr(key: ObjectIdentifier): any {
    return this._attrs.get(key);
  }

  hasAttr(key: ObjectIdentifier): boolean {
    return this._attrs.has(key);
  }

  setAttr(key: ObjectIdentifier, value: any): void {
    this._attrs.set(key, value);
  }
}
/* tslint:enable:variable-name */
