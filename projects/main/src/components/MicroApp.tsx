import React, { useState, useEffect, Suspense } from 'react';
import type { SuspenseProps } from 'react';
import { lazily, lazyImport } from './util';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

interface BaseProps {
  // 远程应用名
  name: string;
  // 远程模块名
  moduleName: string;
  // loading 占位
  fallback?: SuspenseProps['fallback'];
}
interface Props extends BaseProps {
  [key: string]: any;
}

const MicroApp: React.ForwardRefRenderFunction<unknown, Props> = (props, ref) => {
  const { name, moduleName, fallback, ...rest } = props;
  const componentRef = ref || React.createRef<HTMLElement>();
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    const RemoteComponent = lazyImport(() => import(`${name}/${moduleName}`), 'App');
    console.log('RemoteComponent: ', RemoteComponent);
    RemoteComponent && setComponent(RemoteComponent.App);
  }, [name]);

  return (
    <Suspense fallback={fallback}>
      <Component {...rest} ref={componentRef} />
      <div>aaa</div>
    </Suspense>
  );
};

export default MicroApp;
