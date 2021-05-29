import React, { useEffect } from 'react';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';

import Spinner from '../../components/spinner';
import List from './components/list';
import Card from './components/card';
import Button from '../../components/button';

const Home = () => {
  const [suggestion, isLoading, setListSuggestions] = useSuggestions();

  useEffect(() => {
    if (!suggestion || suggestion.results?.length === 0) {
      setListSuggestions();
    }
  }, [suggestion, setListSuggestions]);

  return (
    <div>
      <Spinner show={isLoading} />
      <Button primary large onClick={setListSuggestions} type="submit">
        Refresh
      </Button>
      <List>
        {suggestion?.results?.map(s => (
          <Card key={s.id}>
            <h1>{s.title}</h1>
            <span>{s.description}</span>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default Home;
