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
import URI from '@theia/core/lib/common/uri';
import { TreeEditor } from '../../theia-tree-editor';

export namespace CoffeeModel {
    export namespace Type {
        export const UCModel = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//UCModel';
        export const Package = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Package';
        export const UseCase = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//UseCase';
        export const Relationship = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Relationship';
        export const Generalization = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Generalization';
        export const Actor = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Actor';
        export const ModelElement = 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//ModelElement'
        export function name(type: string): string {
            return new URI(type).fragment.substring(2);
        }
    }

    const modelElements = [
        Type.Relationship,
        Type.Package,
        Type.Generalization,
        Type.UseCase,
        Type.UCModel,
        Type.Actor,
    ];

    /*const nodes = [

    ];

    const flows = [

    ];*/

    /** Maps types to their creatable children */
    export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.Package, [
                {
                    property: 'modelElements',
                    children: modelElements
                },
            ]
        ],
        [
            Type.UCModel, [
                {
                    property: 'modelElements',
                    children: modelElements
                }
            ]
        ],

    ]);

}
