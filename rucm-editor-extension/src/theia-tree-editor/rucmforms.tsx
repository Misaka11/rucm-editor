import {connect} from 'react-redux'
import * as React from 'react';
interface IProps {
    selectedData:any;
    allTreeData:any;
    actorNameInput:(Event)=>void; 
    actorDescriptionInput:(Event)=>void;
    relationshipActorSelect:(Event)=>void;
    relationshipUsecaseSelect:(Event)=>void;
}

let ecoreUrl = "http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//";

function isetype(eClass,type:string){
    // return eClass.split('#')[1].substring(2)==type;
    return (ecoreUrl + type) == eClass;
}
function toeClass(type:string){
    return ecoreUrl + type;
}

class RucmForms extends React.Component<IProps>{

    render(){
        const {selectedData,allTreeData, 
            actorNameInput, actorDescriptionInput, 
            relationshipActorSelect,relationshipUsecaseSelect} = this.props;
        console.log('selectedData = ',selectedData)
        console.log('alltreedata=',allTreeData)
        
        if(isetype(selectedData.eClass,"Actor")){
            return(
                <React.Fragment>
                    <h3> Actor </h3>
                    Name: <input type="text" name="Name" value={selectedData.name||''} onChange={actorNameInput} placeholder="write here" />
                    <br/>
                    <br/>
                    Description: <input type="text" name="Description" value={selectedData.description||''} onChange={actorDescriptionInput} placeholder="write here"/>
                </React.Fragment>
                )
        }else if(isetype(selectedData.eClass,"UseCase")){
            return(
                <React.Fragment>
                    <h3> UseCase </h3>
                    Name: <input type="text" name="Name" value={selectedData.name||''} onChange={actorNameInput} placeholder="write here" />
                    <br/>
                    <br/>
                    Description: <input type="text" name="Description" value={selectedData.description||''} onChange={actorDescriptionInput} placeholder="write here"/>
                </React.Fragment>
                )
        }else if(isetype(selectedData.eClass,"UCModel")){
            return(
                <React.Fragment>
                    <h3> UCModel </h3>
                    Name: <input type="text" name="Name" value={selectedData.name||''} onChange={actorNameInput} placeholder="write here" />
                    <br/>
                    <br/>
                    Description: <input type="text" name="Description" value={selectedData.description||''} onChange={actorDescriptionInput} placeholder="write here"/>
                </React.Fragment>
                )
        }else if(isetype(selectedData.eClass,"Relationship") ){
            // actor下拉框
            let selectedActor = '';
            let actorOptions = [{value:'',label:''}];
            // to solve name == undefined
            if(selectedData.actor){ 
                // to solve the path
                if(selectedData.actor.$ref.indexOf('file') <0)
                    selectedActor = 'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+selectedData.actor.$ref;
                else selectedActor = selectedData.actor.$ref;
            }
            allTreeData.data.modelElements.map((item,index) => { //获取所有的Actor
                if(isetype(item.eClass, "Actor")){
                    if (item.name){
                        actorOptions.push({value:'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+'//@modelElements.'+index, label:item.name});
                    }else actorOptions.push({value:'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+'//@modelElements.'+index, label:'Actor-'+index});
                    
                }
                    
            });
            // usecase下拉框
            let selectedUsecase = '';
            let usecaseOptions = [{value:'',label:''}];
            // to solve name == undefined
            if(selectedData.useCase){ //已经有索引
                // to solve the path
                if(selectedData.useCase.$ref.indexOf('file') <0)
                    selectedUsecase = 'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+selectedData.useCase.$ref;
                else selectedUsecase = selectedData.useCase.$ref;
            }
            allTreeData.data.modelElements.map((item,index) => { //获取所有的Usecase
                if(isetype(item.eClass, "UseCase")){
                    if (item.name){
                        usecaseOptions.push({value:'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+'//@modelElements.'+index, label:item.name});
                    }else usecaseOptions.push({value:'file:/f:/rucm/SuperBrewer3000/test3.rucm#'+'//@modelElements.'+index, label:'Usecase-'+index});
                    
                }
                    
            });
            
            return(
                <React.Fragment>
                    <h3> Relationship </h3>
                    Name: <input type="text" name="Name" value={selectedData.name||''} onChange={actorNameInput} placeholder="write here" />
                    <br/>
                    <br/>
                    Description: <input type="text" name="Description" value={selectedData.description||''} onChange={actorDescriptionInput} placeholder="write here"/>
                    <br/>
                    <br/>
                    Actor: 
                        <select value={selectedActor} onChange={relationshipActorSelect}>
                            {
                                actorOptions.map((item, index)=>{
                                    return <option value={item.value} key={index}>{item.label}</option>
                                })
                            }
                        </select>
                    <br/>
                    <br/>
                    useCase:
                        <select value={selectedUsecase} onChange={relationshipUsecaseSelect}>
                            {
                                usecaseOptions.map((item, index)=>{
                                    return <option value={item.value} key={index}>{item.label}</option>
                                })
                            }
                        </select>
                </React.Fragment>
                )
        }
        return(
            <React.Fragment>
                This model hasn't been defined.
            </React.Fragment>
        )
    }
}

const stateToProps = (state) =>{
    return {
        selectedData: state.selectedData,
        allTreeData: state.allTreeData
    }
}
// actions
const dispatchToProps = (dispatch) => {
    return {
        actorNameInput(e){
            let action = {
                type:'actorNameInput',
                data:e.target.value
            }
            dispatch(action)
        },
        actorDescriptionInput(e){
            let action = {
                type:'actorDescriptionInput',
                data:e.target.value
            }
            dispatch(action)
        },
        relationshipActorSelect(e){
            let action = {
                type: 'relationshipActorSelect',
                data: {
                    eClass:toeClass("Actor"),
                    $ref:e.target.value
                }
            }
            dispatch(action)
        },
        relationshipUsecaseSelect(e){
            let action = {
                type: 'relationshipUsecaseSelect',
                data: {
                    eClass: toeClass("UseCase"),
                    $ref:e.target.value
                }
            }
            dispatch(action)
        }
    }
}
export default connect(stateToProps,dispatchToProps)(RucmForms);