import {action, createStore} from "easy-peasy";
import shortid from "shortid";


const store = createStore({
    page: {
        sections: [],
        addSection: action((state, {index}) => {
            const newSection = {id:shortid.generate()};
            const newSections = [...state.sections];
            if (!index){
                newSections.insert(state.sections.length, newSection);
            } else {
                newSections.insert(index, newSection);
            }
            return {
                sections:[...newSections]
            }
        }),
        moveSection: action((state, payload) => {

        }),
        deleteSection: action((state, payload) => {

        }),
    },
    sections:{
        columns:{

        },
        addColumn:action((state, {sectionId})=>{
            const newColumn = {id:shortid.generate()};
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sectionId]:[...(state.columns[sectionId] || []), newColumn]
                }
            }
        }),
        moveColumn:{

        },
        removeColumn:{

        },
    },
    columns:{
        children:{

        },
        addChild:action((state, {columnId, item})=>{
            console.log(item);
            const newChild = {...item, id:shortid.generate()};
            return {
                ...state,
                children: {
                    ...state.children,
                    [columnId]:[...(state.children[columnId] || []), newChild]
                }
            }
        }),
        removeChild:{

        },
        moveChild:{

        }
    }
}, {
    disableImmer:true
});

export default store;
