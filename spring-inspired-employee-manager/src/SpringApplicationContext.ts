/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SpringContext } from './di';

/**
 * SpringApplicationContext
 * Mimics Spring's ApplicationContext to load the XML configuration and start the container.
 */
export class SpringApplicationContext {
  private xmlConfigPath: string;

  constructor(xmlConfigPath: string) {
    this.xmlConfigPath = xmlConfigPath;
    this.loadXmlConfig();
  }

  private loadXmlConfig() {
    console.log(`Loading Spring configuration from ${this.xmlConfigPath}...`);
    // In a real Spring environment, this would parse the XML and scan the package.
    // In our TypeScript implementation, the decorators have already registered the beans.
    console.log('Component scanning enabled. Beans registered successfully.');
  }

  getBean<T>(name: string): T {
    return SpringContext.getBean<T>(name);
  }
}
