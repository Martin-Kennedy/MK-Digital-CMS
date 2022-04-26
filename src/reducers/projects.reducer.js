import { GET_PROJECTS, SORT_BY_PROJECT_EXPERTISE, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM } from '../helpers/types'

const INITIAL_STATE = {
    projectData: [],
    filteredData: [],
    sortBy: '',
    activeButton: 1
}

const projectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projectData: action.payload.data.allProjects
            }

        case GET_PROJECT_ITEM:
            console.log(action.payload)
            return {
                ...state,
                projectItem: action.payload,
                sortByItem: action.title
            }

        case GET_NEXT_PROJECT_ITEM:
            let titleSlug = action.payload.client;
            titleSlug = titleSlug.replace(/\s+/g, '-');
            return {
                ...state,
                nextProjectItem: action.payload,
                nextProjectItemPathname: titleSlug
            }

        case SORT_BY_PROJECT_EXPERTISE:
            let value = action.expertise;
            let filteredValues = state.projectData.filter(card => card.expertise === value);
            return {
                ...state,
                sortBy: action.expertise,
                filteredData: filteredValues,
                activeButton: action.index
            }
        default:
            return state;
    }
}

export default projectsReducer;