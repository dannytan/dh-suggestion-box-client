import React, { useEffect } from 'react';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import { getRelativeTimeFromDate, formatDate } from '../../utils/date';
import ChatIcon from '../../assets/chat-icon.svg';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import {
  Container,
  Heading,
  HeadingContainerSpaceBetween,
  SuggestionFeed,
  SuggestionFeedIcon,
  SuggestionFeedItem,
  SuggestionForm,
} from './components';

const Home = () => {
  const [suggestion, getSuggestions, submitSuggestion, isLoading, error] = useSuggestions();

  useEffect(() => {
    if (!suggestion || suggestion.results?.length === 0) {
      getSuggestions();
    }
  }, [suggestion, getSuggestions]);

  const handleSubmit = async (values, actions) => {
    await submitSuggestion(values);
    actions.resetForm();
  };

  return (
    <>
      <Spinner show={isLoading} />
      <Container>
        <div className="section">
          <Heading>Make a Suggestion</Heading>
          <SuggestionForm onSubmit={handleSubmit} />
        </div>
        <HeadingContainerSpaceBetween>
          <Heading>View Suggestions</Heading>
          <Button type="submit" onClick={getSuggestions}>
            Refresh
          </Button>
        </HeadingContainerSpaceBetween>
        <SuggestionFeed>
          {suggestion?.results?.map((s, index) => (
            <SuggestionFeedItem key={index} data-date={getRelativeTimeFromDate(s.createdAt)}>
              <SuggestionFeedIcon src={ChatIcon} alt="Chat Icon" />
              <section>
                <div className="title">{s.title}</div>
                <div className="description">{s.description}</div>
                <div className="footer">
                  Suggested by <span className="bold">{s.user.name}</span> on {formatDate(s.createdAt)}
                </div>
              </section>
            </SuggestionFeedItem>
          ))}
        </SuggestionFeed>
      </Container>
    </>
  );
};

export default Home;
