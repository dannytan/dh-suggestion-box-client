import { useState } from 'react';
import { useStateValue } from '../../index';
import { loadSuggestions } from '../queries';
import { listSuggestions } from '../actions';

const useSuggestions = () => {
  const [{ suggestion }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async () => {
    setIsLoading(true);

    try {
      const response = await loadSuggestions();
      dispatch(listSuggestions(response));
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return [suggestion, isLoading, request, error];
};

export default useSuggestions;
