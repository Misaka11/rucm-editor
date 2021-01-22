/********************************************************************************
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
// import { Actions, jsonformsReducer, JsonFormsState, JsonFormsSubStates } from '@jsonforms/core';
// import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
// import {
//     registerStyles,
//     StyleDef,
//     stylingReducer,
//     vanillaCells,
//     vanillaRenderers,
//     vanillaStyles
// } from '@jsonforms/vanilla-renderers';
import { Emitter, Event } from '@theia/core';
import { BaseWidget, Message } from '@theia/core/lib/browser';
import { inject, injectable } from 'inversify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { AnyAction, CombinedState, combineReducers, createStore, Store } from 'redux';
import {createStore} from 'redux';

import { TreeEditor } from './interfaces';
import RucmForms from './rucmforms'

//const JSON_FORMS_CONTAINER_CSS_CLASS = 'jsonforms-container';





// reducer是处理store分发的action的
// 通过store.dispatch(action)调用
// 默认的存储数据为null

function reducer(state = null,action){
    let new_state = JSON.parse(JSON.stringify(state));
    if(action.type === "init"){
        new_state = {selectedData:null,allTreeData:null};
    }
    if(action.type === "actorNameInput"){
        new_state.selectedData.name = action.data;

    }
    if(action.type === "actorDescriptionInput"){
        new_state.selectedData.description = action.data;
    }
    if(action.type === "setSelection"){
        new_state.selectedData = action.selectedData;
        new_state.allTreeData = action.allTreeData;
    }
    if(action.type === 'relationshipActorSelect'){
        if (action.data.$ref == '')
            delete new_state.selectedData.actor;
        else new_state.selectedData.actor = action.data;
    }
    if(action.type === 'relationshipUsecaseSelect'){
        if (action.data.$ref == '')
            delete new_state.selectedData.useCase;
        else new_state.selectedData.useCase = action.data;
    }
    
    
    return new_state;
};



/**
 * Renders the detail view of the tree editor and binds the selected object's data to a generated form.
 */
@injectable()
export class DetailFormWidget extends BaseWidget {
    private selectedNode: TreeEditor.Node;
    private store: any;

    protected changeEmitter = new Emitter<Readonly<any>>();

    constructor(@inject(TreeEditor.ModelService) private readonly modelService: TreeEditor.ModelService) {
        super();

        //this.store = this.initStore();
        this.store = createStore(reducer);
        //this.store.dispatch(Actions.init({}, { type: 'string' }));
        this.store.dispatch({type:'init',data:null})

        this.toDispose.push(this.changeEmitter);
        this.store.subscribe(() => {
            this.changeEmitter.fire(this.store.getState().selectedData);
        });
        this.renderEmptyForms();
    }
    get onChange(): Event<Readonly<any>> {
        return this.changeEmitter.event;
    }

    // private initStore(): Store<CombinedState<{ jsonforms: JsonFormsSubStates }>, AnyAction> {
    //     const initState: JsonFormsState = {
    //         jsonforms: {
    //             cells: vanillaCells,
    //             renderers: vanillaRenderers,
    //             styles: this.createStyles(),
    //             config: {
    //                 restrict: false,
    //                 trim: false,
    //                 showUnfocusedDescription: true,
    //                 hideRequiredAsterisk: false
    //             }
    //         }
    //     };
    //     return createStore(
    //         combineReducers({ jsonforms: jsonformsReducer({ styles: stylingReducer }) }),
    //         initState
    //     );
    // }

    // /** Augments the default vanilla styles with theia-specific styling and returns the result. */
    // private createStyles(): StyleDef[] {
    //     const registerStylesAction = registerStyles([
    //         {
    //             name: 'array.button',
    //             classNames: ['theia-button']
    //         },
    //         {
    //             name: 'array.table.button',
    //             classNames: ['theia-button']
    //         },
    //         {
    //             name: 'control.input',
    //             classNames: ['theia-input']
    //         },
    //         {
    //             name: 'control.select',
    //             classNames: ['theia-select']
    //         }
    //     ]);
    //     return stylingReducer(vanillaStyles, registerStylesAction);
    // }

    setSelection(selectedNode: TreeEditor.Node,allTreeData: TreeEditor.TreeData): void {
        this.selectedNode = selectedNode;

        // this.store.dispatch(
        //     Actions.init(
        //         this.modelService.getDataForNode(this.selectedNode),
        //         this.modelService.getSchemaForNode(this.selectedNode),
        //         this.modelService.getUiSchemaForNode(this.selectedNode),
        //         {
        //             refParserOptions: {
        //                 dereference: { circular: 'ignore' }
        //             },
        //             useDefaults: true
        //         }
        //     )
        // );
        //console.log('im in setSelection');
        this.store.dispatch({
            type:'setSelection',
            selectedData:this.modelService.getDataForNode(this.selectedNode),
            allTreeData:allTreeData
        })
        this.renderForms();
    }
    
    protected renderForms(): void {
        if (this.selectedNode) {
            console.log('im in renderForms')
            ReactDOM.render(
                <div className='RucmForms'>
                    <Provider store = {this.store}>
                        <RucmForms/>
                    </Provider>
                </div>,
                
                this.node
            );
        } else {
            this.renderEmptyForms();
        }
    }
    protected renderEmptyForms(): void {
        ReactDOM.render(
            <React.Fragment>Please select an element</React.Fragment>,
            this.node
        );
    }
    protected onUpdateRequest(msg: Message): void {
        super.onUpdateRequest(msg);
        this.renderForms();
    }
    
    
}
