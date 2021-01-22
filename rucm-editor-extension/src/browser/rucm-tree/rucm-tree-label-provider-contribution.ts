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
import { LabelProviderContribution } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { injectable } from 'inversify';
import { TreeEditor } from '../../theia-tree-editor';

import { CoffeeModel } from './rucm-model';
import { CoffeeTreeEditorWidget } from './rucm-tree-editor-widget';

const DEFAULT_COLOR = 'black';

const ICON_CLASSES: Map<string, string> = new Map([
  [CoffeeModel.Type.UseCase, 'fa-tasks ' + DEFAULT_COLOR],
  [CoffeeModel.Type.Relationship, 'fa-arrows-h ' + DEFAULT_COLOR],
  [CoffeeModel.Type.UCModel, 'fa-underline ' + DEFAULT_COLOR],
  [CoffeeModel.Type.Generalization, 'fa-long-arrow-right '],
  [CoffeeModel.Type.Package, 'fa-folder ' + DEFAULT_COLOR],
  [CoffeeModel.Type.Actor, 'fa-user ' + DEFAULT_COLOR],
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;

@injectable()
export class CoffeeTreeLabelProvider implements LabelProviderContribution {

  public canHandle(element: object): number {
    if ((TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element))
      && element.editorId === CoffeeTreeEditorWidget.EDITOR_ID) {
      return 1000;
    }
    return 0;
  }

  public getIcon(element: object): string | undefined {
    let iconClass: string;
    if (TreeEditor.CommandIconInfo.is(element)) {
      iconClass = ICON_CLASSES.get(element.type);
    } else if (TreeEditor.Node.is(element)) {
      iconClass = ICON_CLASSES.get(element.jsonforms.type);
      if (!iconClass && element.jsonforms.property === 'flows') {
        iconClass = ICON_CLASSES.get(CoffeeModel.Type.Relationship);
      }
    }

    return iconClass ? 'fa ' + iconClass : 'far ' + UNKNOWN_ICON;
  }

  public getName(element: object): string | undefined {
    const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
    if (data.eClass) {
      switch (data.eClass) {
        case CoffeeModel.Type.UseCase:
        case CoffeeModel.Type.Actor:
        case CoffeeModel.Type.UCModel:
        case CoffeeModel.Type.Generalization:
        case CoffeeModel.Type.Package:
        case CoffeeModel.Type.Relationship:
        case CoffeeModel.Type.ModelElement:
          return data.name || this.getTypeName(data.eClass);
        default:
          // TODO query title of schema
          return this.getTypeName(data.eClass);
      }
    }
    // guess
    if (data.nodes) {
      return data.name || 'Relationship';
    }
    // ugly guess, fix in modelserver
    if (data.source && data.target) {
      return 'Relationship';
    }
    return undefined;
  }
  private getTypeName(eClass: string): string {
    const fragment = new URI(eClass).fragment;
    if (fragment.startsWith('//')) {
      return fragment.substring(2);
    }
    return fragment;
  }
}
