import React, { useEffect } from 'react';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import ChatIcon from '../../assets/chat-icon.svg';
import './home.css';

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

      <ol className="suggestion-feed">
        <li className="feed-item" data-date="3 hours ago">
          <img className="chat-icon" src={ChatIcon} alt="Chat Icon" />
          <section>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>Some Title</div>
            <div style={{ marginBottom: 20 }}>
              Some description of the suggestion that was submitted. This is a test. This is a test. This is just a
              test. Ignore all these words as they don't really mean anything.
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>
              Submitted by <span style={{ fontWeight: 'bold' }}> Danny Tan</span>
            </div>
          </section>
        </li>
        <li className="feed-item" data-date="3 hours ago">
          <img className="chat-icon" src={ChatIcon} alt="Chat Icon" />
          <section>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>Some Title</div>
            <div style={{ marginBottom: 20 }}>
              Some description of the suggestion that was submitted. This is a test. This is a test. This is just a
              test. Ignore all these words as they don't really mean anything.
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>
              Submitted by <span style={{ fontWeight: 'bold' }}> Danny Tan</span>
            </div>
          </section>
        </li>
        <li className="feed-item" data-date="3 hours ago">
          <img className="chat-icon" src={ChatIcon} alt="Chat Icon" />
          <section>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>Some Title</div>
            <div style={{ marginBottom: 20 }}>
              Some description of the suggestion that was submitted. This is a test. This is a test. This is just a
              test. Ignore all these words as they don't really mean anything.
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>
              Submitted by <span style={{ fontWeight: 'bold' }}> Danny Tan</span>
            </div>
          </section>
        </li>
      </ol>
    </div>
  );
};

export default Home;
