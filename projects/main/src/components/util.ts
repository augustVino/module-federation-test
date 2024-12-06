import React, { type ComponentType, lazy } from 'react';

export const lazily = <T extends {}, U extends keyof T>(loader: (x?: string) => Promise<T>) =>
  new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol) => {
      if (typeof componentName === 'string') {
        return React.lazy(() =>
          loader(componentName).then((x) => ({
            default: x[componentName as U] as any as React.ComponentType<any>
          }))
        );
      }
    }
  });

export const lazyImport = <T extends { [P in U]: ComponentType<any> }, U extends string>(
  factory: () => Promise<T>,
  name: U
) => ({
  [name]: lazy(() => factory().then((module) => ({ default: module[name] })))
});
