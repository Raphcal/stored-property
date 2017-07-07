export interface StoredPropertyParams {
    initialValue?: any;
    key?: string;
    keyAttribute?: string;
    storage?: 'local' | 'session';
}

export function Stored(params: StoredPropertyParams = {}): PropertyDecorator {
    const storage = params.storage === 'session' ? sessionStorage : localStorage;

    return function(target, propertyKey) {
        let key: (self: Object) => string;
        if (params.keyAttribute) {
            key = (self) => self[params.keyAttribute];
        } else if (params.key) {
            key = () => params.key;
        } else {
            key = () => `${target.constructor.name}.${propertyKey}`;
        }

        const privateProperty = `_${propertyKey}`;
        Object.defineProperty(A.prototype, privateProperty, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(A.prototype, propertyKey, {
            get: function () {
                if (this[privateProperty] === undefined) {
                    const storedValue = storage.getItem(key(this));
                    this[privateProperty] = storedValue !== null ? JSON.parse(storedValue) : params.initialValue;
                }
                return this[privateProperty];
            },
            set: function (value) {
                this[privateProperty] = value;
                storage.setItem(key(this), JSON.stringify(value));
            },
            enumerable: true,
            configurable: true
        });
    };
}
