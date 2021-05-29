import React, { useEffect } from 'react';
import moment from 'moment';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import ChatIcon from '../../assets/chat-icon.svg';
import './home.css';

import Spinner from '../../components/spinner';
import Button from '../../components/button';

const Home = () => {
  const [suggestion, isLoading, setListSuggestions] = useSuggestions();

  useEffect(() => {
    if (!suggestion || suggestion.results?.length === 0) {
      setListSuggestions();
    }
  }, [suggestion, setListSuggestions]);

  const getRelativeTimeFromDate = date => {
    return moment(date).fromNow();
  };

  return (
    <div>
      <Spinner show={isLoading} />
      <Button primary onClick={setListSuggestions} type="submit">
        Refresh
      </Button>
      <ol className="suggestion-feed">
        {suggestion?.results?.map((s, index) => (
          <li key={index} className="feed-item" data-date={getRelativeTimeFromDate(s.createdAt)}>
            <img className="chat-icon" src={ChatIcon} alt="Chat Icon" />
            <section>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>{s.title}</div>
              <div style={{ marginBottom: 20 }}>{s.description}</div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>
                Submitted by <span style={{ fontWeight: 'bold' }}>{s.user.name}</span> on {s.createdAt}
              </div>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
