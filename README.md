# @Stored decorator

Makes storing properties in local storage easy.

## Examples

### Basic example

~~~typescript
class Basic {
    @Stored()
    name: string;
}

const b1 = new Basic();
console.log(b1.name); // prints undefined on first launch, "foo" afterward

b1.name = 'foo';
console.log(b1.name); // prints "foo"

const b2 = new Basic();
console.log(b2.name); // prints "foo"
~~~

### Using keyAttribute

~~~typescript
class WithKeyAttribute {
    id: number;

    @Stored({ initialValue: 'foo', keyAttribute: 'key' })
    name: string;

    get key(): string {
        return `WithKeyAttribute.name#${this.id}`;
    }
}

let object1 = new WithKeyAttribute();
object1.id = 1;
console.log(object1.name); // prints "foo" on first launch, "bar" afterward

object1.name = 'bar';
console.log(object1.name); // prints "bar"

let object2 = new WithKeyAttribute();
object2.id = 2;
console.log(object2.name); // prints "foo" on first launch, "baz" afterward

object2.name = 'baz';
console.log(object2.name); // prints "baz"
~~~
