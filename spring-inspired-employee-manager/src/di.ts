/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple DI Container
class Container {
  private beans = new Map<string, any>();

  register(name: string, instance: any) {
    console.log(`Registering bean: ${name}`);
    this.beans.set(name, instance);
  }

  getBean<T>(name: string): T {
    const bean = this.beans.get(name);
    if (!bean) {
      console.error(`Bean with name '${name}' not found. Available beans:`, Array.from(this.beans.keys()));
      throw new Error(`Bean with name '${name}' not found in Spring context.`);
    }
    return bean;
  }
}

export const SpringContext = new Container();

/**
 * @Component decorator
 * Mimics Spring's @Component by registering the class instance in the container.
 */
export function Component(name: string) {
  return function (constructor: Function) {
    // In a real Spring environment, the container would instantiate this.
    // We'll instantiate it here for simplicity.
    const instance = new (constructor as any)();
    SpringContext.register(name, instance);
  };
}

/**
 * @Autowired decorator
 * Mimics Spring's @Autowired by injecting the bean from the container.
 */
export function Autowired(name: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => SpringContext.getBean(name),
      enumerable: true,
      configurable: true,
    });
  };
}
