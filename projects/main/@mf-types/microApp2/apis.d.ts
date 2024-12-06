
    export type RemoteKeys = 'microApp2/App';
    type PackageType<T> = T extends 'microApp2/App' ? typeof import('microApp2/App') :any;