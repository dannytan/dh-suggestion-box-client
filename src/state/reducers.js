import suggestionReducer from './suggestion/reducers';

export default ({ product }, action) => ({
  suggestion: suggestionReducer(product, action),
});
