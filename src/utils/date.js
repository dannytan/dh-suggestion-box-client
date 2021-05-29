import moment from 'moment';

export const getRelativeTimeFromDate = date => {
  return moment(date).fromNow();
};

export const formatDate = date => {
  return moment(date).format('MMMM Do, YYYY [at] h:mm a');
};
