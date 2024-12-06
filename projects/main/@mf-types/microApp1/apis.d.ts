
    export type RemoteKeys = 'microApp1/App';
    type PackageType<T> = T extends 'microApp1/App' ? typeof import('microApp1/App') :any;