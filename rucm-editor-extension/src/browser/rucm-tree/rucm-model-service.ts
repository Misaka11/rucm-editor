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
import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { TreeEditor } from '../../theia-tree-editor';

import { CoffeeModel } from './rucm-model';
import {
    ucmodelView,
    actorView,
    usecaseView,
    relationshipView,
    generalizationView,
    packageView,
    coffeeSchema,
} from './rucm-schemas';

@injectable()
export class CoffeeModelService implements TreeEditor.ModelService {

    constructor(@inject(ILogger) private readonly logger: ILogger) { }

    getDataForNode(node: TreeEditor.Node) {
        return node.jsonforms.data;
    }

    getSchemaForNode(node: TreeEditor.Node) {
        return {
            definitions: coffeeSchema.definitions,
            ...this.getSubSchemaForNode(node)
        };
    }

    private getSubSchemaForNode(node: TreeEditor.Node) {
        const schema = this.getSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return coffeeSchema.definitions.relationship;
        }
        return undefined;
    }
    private getSchemaForType(type: string) {
        if (!type) {
            return undefined;
        }
        const schema = Object.entries(coffeeSchema.definitions)
            .map(entry => entry[1])
            .find(
                definition =>
                    definition.properties && definition.properties.eClass.const === type
            );
        if (!schema) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    }
    getUiSchemaForNode(node: TreeEditor.Node) {
        const schema = this.getUiSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return relationshipView;
        }
        return undefined;
    }

    private getUiSchemaForType(type: string) {
        if (!type) {
            return undefined;
        }
        //this.logger.warn('im here. type= ',type,' typeof= ', typeof(type))
        //this.logger.warn('im here2. type= ',CoffeeModel.Type.UCModel,' typeof= ', typeof(CoffeeModel.Type.UCModel))
        switch (type) {
            case CoffeeModel.Type.UCModel:
                return ucmodelView;
            case CoffeeModel.Type.Package:
                return packageView;
            case CoffeeModel.Type.Actor:
                return actorView;
            case CoffeeModel.Type.UseCase:
                return usecaseView;
            case CoffeeModel.Type.Relationship:
                return relationshipView;
            case CoffeeModel.Type.Generalization:
                return generalizationView;

            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }

    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
        return CoffeeModel.childrenMapping;
    }

    getNameForType(eClass: string): string {
        return CoffeeModel.Type.name(eClass);
    }
}
