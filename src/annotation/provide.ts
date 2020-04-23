//提供provide注解
import 'reflect-metadata';
import {DUPLICATED_INJECTABLE_DECORATOR} from '../utils/errMsg';
import { initOrGetObjectDefProps, TAGGED_CLS } from '..';
import {ObjectIdentifier, TagClsMetadata} from '../interfaces';

const camelCase = require('camelcase');

function provide(identifier?: ObjectIdentifier) {
  return function (target: any) {
    if (Reflect.hasOwnMetadata(TAGGED_CLS, target)) {
      throw new Error(DUPLICATED_INJECTABLE_DECORATOR);
    }

    if (!identifier) {
      identifier = camelCase(target.name);
    }
    //定义元数据
    Reflect.defineMetadata(TAGGED_CLS, {
      id: identifier,
      originName: target.name,
    } as TagClsMetadata, target);

    // init property here
    //初始化元数据
    initOrGetObjectDefProps(target);

    return target;
  };
}

export {provide};
