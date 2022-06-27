import {GET_PROJECTS, SORT_BY_PROJECT_EXPERTISE, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM, GET_PROJECT_LANDING} from '../helpers/types'

const INITIAL_STATE = {
    projectData: [],
    filteredData: [],
    sortBy: '',
    activeButton: 1,
    projectLandingData: []
}

const projectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            action
                .payload
                .data
                .allProjects
                .map((project, index) => {
                    project.orderNum = index + 1;
                });
                return {
                    ...state,
                    projectData: action.payload.data.allProjects
                }

        case GET_PROJECT_ITEM:
            return {
                ...state,
                projectItem: action.payload,
                sortByItem: action.title
            }

        case GET_NEXT_PROJECT_ITEM:
            let titleSlug = action.payload;
            titleSlug = titleSlug.replace(/\s+/g, '-');
            return {
                ...state,
                nextProjectItem: action.payload,
                nextProjectItemPathname: titleSlug
            }

        case SORT_BY_PROJECT_EXPERTISE:
            let value = action.expertise;
            let filteredValues = value === 'all'
                ? state.projectData
                : state
                    .projectData
                    .filter(card => card.expertise === value);
            return {
                ...state,
                sortBy: action.expertise,
                filteredData: filteredValues,
                activeButton: action.index
            }
        case GET_PROJECT_LANDING:
            return {
                ...state,
                projectLandingData: action.payload
            }
        default:
            return state;
    }
}

export default projectsReducer;