import { SORT_BY_BLOG_SUBJECT, SORT_BY_PROJECT_EXPERTISE } from '../helpers/types';

// SORT_BY_BLOG_SUBJECT
export const sortByBlogSubject = (subject = null, index = 1) => ({
  type: SORT_BY_BLOG_SUBJECT,
  subject: subject,
  index: index
});

// SORT_BY_BLOG_SUBJECT
export const sortByProjectExpertise = (expertise = null, index = 1) => ({
  type: SORT_BY_PROJECT_EXPERTISE,
  expertise: expertise,
  index: index
});



