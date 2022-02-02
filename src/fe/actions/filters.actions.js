import { SORT_BY_BLOG_SUBJECT, GET_BLOG_ITEM } from '../helpers/types';

// SORT_BY_BLOG_SUBJECT
export const sortByBlogSubject = (subject = null, index = 1) => ({
  type: SORT_BY_BLOG_SUBJECT,
  subject: subject,
  index: index
});



