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
import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { CommonMenus,ApplicationShell, NavigatableWidgetOptions, OpenerService, WidgetOpenerOptions } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable } from 'inversify';
import { BaseTreeEditorContribution, BaseTreeEditorWidget, TreeContextMenu, TreeEditor } from '../theia-tree-editor';

import { Response } from '@eclipse-emfcloud/modelserver-theia/lib/common/model-server-client';
const fetch = require('node-fetch');

import { CoffeeModelService } from './rucm-tree/rucm-model-service';
import { CoffeeTreeCommands, OpenWorkflowDiagramCommandHandler } from './rucm-tree/rucm-tree-container';
import { CoffeeTreeEditorWidget } from './rucm-tree/rucm-tree-editor-widget';
import { CoffeeTreeLabelProvider } from './rucm-tree/rucm-tree-label-provider-contribution';

@injectable()
export class CoffeeTreeEditorContribution extends BaseTreeEditorContribution {
  @inject(ApplicationShell) protected shell: ApplicationShell;
  @inject(OpenerService) protected opener: OpenerService;

  constructor(
    @inject(CoffeeModelService) modelService: TreeEditor.ModelService,
    @inject(CoffeeTreeLabelProvider) labelProvider: CoffeeTreeLabelProvider,
  ) {
    super(CoffeeTreeEditorWidget.EDITOR_ID, modelService, labelProvider);
  }
  private async performRequest<T>(
    verb: string,
    path: string,
    body?: string
): Promise<Response<T>> {
    const response = await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: verb,
        body
    });
    const json = (await response.json()) as T;
    return new Response(json, response.status, response.statusText);
}
  readonly id = CoffeeTreeEditorWidget.WIDGET_ID;
  readonly label = BaseTreeEditorWidget.WIDGET_LABEL;

  canHandle(uri: URI): number {
    if (
      uri.path.ext === '.rucm'
    ) {
      return 1000;
    }
    return 0;
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(
      CoffeeTreeCommands.OPEN_WORKFLOW_DIAGRAM,
      new OpenWorkflowDiagramCommandHandler(this.shell, this.opener));
    commands.registerCommand({
      id: 'newrucmfile.command',
      label: "new rucm file"}, {
        execute: () => {
          console.log('hello, imhere')
          const data = {
            "data": {
                "eClass": "file://f:/rucm/SuperBrewer3000/ucmeta.ecore#//UCModel",
                "name": "testmodel232",
                "description": "im tester",
                "modelElements":[
                    {
                        "eClass":"file://f:/rucm/SuperBrewer3000/ucmeta.ecore#//Actor",
                        "name": "yuyue"
                    },
                    {
                        "eClass":"file://f:/rucm/SuperBrewer3000/ucmeta.ecore#//UseCase",
                        "name": "Withdraw fund"
                    }
                ]
            }
        }
        const body = JSON.stringify(data);
          this.performRequest('post', 'http://localhost:8081/api/v1/models?modeluri=test2.rucm', body).then(r =>{
            console.log('res=',r);
          })
        }
    });
    super.registerCommands(commands);
  }

  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(TreeContextMenu.CONTEXT_MENU, {
      commandId: CoffeeTreeCommands.OPEN_WORKFLOW_DIAGRAM.id,
      label: CoffeeTreeCommands.OPEN_WORKFLOW_DIAGRAM.label
    });
    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: 'newrucmfile.command',
            label: 'new rucm file'
        });
    super.registerMenus(menus);
  }

  protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions {
    return {
      kind: 'navigatable',
      uri: this.serializeUri(uri)
    };
  }

  protected serializeUri(uri: URI): string {
    return uri.withoutFragment().toString();
  }

}
