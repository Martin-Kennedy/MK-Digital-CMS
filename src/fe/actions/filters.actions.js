import { SORT_BY_BLOG_SUBJECT } from '../helpers/types'

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  
});

// SORT_BY_BLOG_SUBJECT
export const sortByBlogSubject = (subject = null, index = 1) => ({
  type: SORT_BY_BLOG_SUBJECT,
  subject: subject,
  index: index
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
