import React, {useState} from "react";
import ReactDom from "react-dom";
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from "./store";
import './prototypes';
import {StoreProvider, useStoreActions, useStoreState} from "easy-peasy";



const LayoutDraggable  = ({content})=>{
    const [collectedProps, drag] = useDrag({
        item: { id:"section", type:"layout" }
    });
    return <div ref={drag}>{content}</div>
}


const PrimaryDraggable  = ({id, content})=>{
    const [collectedProps, drag] = useDrag({
        item: { id, type:"primary", content }
    })
    return <div ref={drag}>{content}</div>
}

const ColumnDroppable = ({id})=>{
    const columnItems = useStoreState(state => {
        return state.columns.children[id] || [];
    });
    const addChild = useStoreActions(actions => {
        return (item)=>{
            actions.columns.addChild({columnId:id, item});
        }
    });
    const [collectedProps,dropColumn] = useDrop({
        accept:"primary",
        drop:(item)=>{
            addChild(item);
        }
    });
    return <div style={{border:"1px solid red"}}>
        {
            columnItems.map((item)=>{
                return <div key={item.id}>{item.content}</div>;
            })
        }
        <div ref={dropColumn} >
            Drop Primary Components
        </div>
    </div>
};

const Section = ({id})=>{
    const columns = useStoreState(state => {
        return state.sections.columns[id] || [];
    });
    const addColumn = useStoreActions(actions => {
        return ()=>{
            actions.sections.addColumn({sectionId:id});
        }
    });
    return <div>
        <div style={{display:"flex"}}>
        {
            columns.map((item)=>{
                return <ColumnDroppable key={item.id} id={item.id}></ColumnDroppable>
            })
        }
        </div>
        <a onClick={()=>{
            addColumn();
        }}>
            addColumn
        </a>
    </div>
}

const Board = ()=>{
    const sections = useStoreState(state => state.page.sections);
    const addSection = useStoreActions(actions => {
        console.log(actions.page);
        return actions.page.addSection;
    });
    const [collectedProps,dropSection] = useDrop({
        accept:"layout",
        drop:(item)=>{
            addSection({});
        }
    });
    return <div>
        {
            sections.map((section)=>{
                return <Section key={section.id} id={section.id}></Section>
            })
        }
        <div ref={dropSection}>Drop Section</div>
    </div>
}



ReactDom.render(<DndProvider backend={HTML5Backend}>
    <StoreProvider store={store}>
    <div>
        <div className={"layout-components"}>
            <LayoutDraggable content={"layout"} />
        </div>
        <div className={"primary-components"}>
            <PrimaryDraggable id={"comp1"} content={"Comp1"}></PrimaryDraggable>
            <PrimaryDraggable id={"comp2"} content={"Comp2"}></PrimaryDraggable>
            <PrimaryDraggable id={"comp3"} content={"Comp3"}></PrimaryDraggable>
            <PrimaryDraggable id={"comp4"} content={"Comp4"}></PrimaryDraggable>
            <PrimaryDraggable id={"comp5"} content={"Comp5"}></PrimaryDraggable>
        </div>
        <div className={"board"}>
            <Board></Board>
        </div>
</div></StoreProvider></DndProvider>, document.getElementById("root"));
