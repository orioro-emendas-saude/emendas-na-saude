export type ResolvableData<T = any> = string | (() => Promise<T>) | T
