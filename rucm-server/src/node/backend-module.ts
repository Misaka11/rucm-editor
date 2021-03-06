/*!
 * Copyright (C) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */
import { LaunchOptions } from '@eclipse-emfcloud/modelserver-theia';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ContainerModule, injectable } from 'inversify';
import { join, resolve } from 'path';

import { GLSPLaunchOptions, GLSPServerLauncher } from './glsp-server-launcher';

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    if (isBound(LaunchOptions)) {
        rebind(LaunchOptions).to(RucmLaunchOptions).inSingletonScope();
    } else {
        bind(LaunchOptions).to(RucmLaunchOptions).inSingletonScope();
    }
    bind(GLSPLaunchOptions).to(RucmGlspLaunchOptions).inSingletonScope();
    bind(BackendApplicationContribution).to(GLSPServerLauncher);
});

@injectable()
export class RucmLaunchOptions implements LaunchOptions {
    isRunning = false;
    baseURL: string = 'api/v1/';
    serverPort: number = 8081;
    hostname: string = 'localhost';
    jarPath = resolve(join(__dirname, '..', '..', 'build', 'com.eclipsesource.coffee.modelserver-0.1.0-SNAPSHOT-standalone.jar'));
    additionalArgs = ['--errorsOnly'];
}

@injectable()
export class RucmGlspLaunchOptions implements GLSPLaunchOptions {
    isRunning: false;
    serverPort: 5008;
    hostname: 'localhost';
    jarPath = resolve(join(__dirname, '..', '..', 'build', 'com.eclipsesource.workflow.glsp.server-0.0.1-SNAPSHOT-glsp.jar'));
}
