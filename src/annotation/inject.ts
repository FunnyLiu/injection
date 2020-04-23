// 提供inject注解、装饰器
import { INJECT_TAG } from '..';
import { ObjectIdentifier } from '../interfaces';
import { tagParameter, tagProperty } from '../utils/decorator';
import { Metadata } from '../utils/metadata';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) {
    result = [];
  }
  return result;
}

function inject(identifier?: ObjectIdentifier) {
  return function (target: any, targetKey: string, index?: number): void {

    if (typeof index === 'number') {
      if (!identifier) {
        const args = getParamNames(target);
        if (target.length === args.length && index < target.length) {
          identifier = args[index];
        }
      }
      const metadata = new Metadata(INJECT_TAG, identifier);
      tagParameter(target, targetKey, index, metadata);
    } else {
      if (!identifier) {
        identifier = targetKey;
      }
      const metadata = new Metadata(INJECT_TAG, identifier);
      tagProperty(target, targetKey, metadata);
    }
  };
}

export { inject };
