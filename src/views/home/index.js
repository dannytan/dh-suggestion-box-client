import React, { useEffect } from 'react';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import { getRelativeTimeFromDate } from '../../utils/date';
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
  SuggestionNotFound,
  SuggestionForm,
} from './components';

const Home = () => {
  const [suggestion, getSuggestions, submitSuggestion, isLoading, error] = useSuggestions();

  useEffect(() => {
    if (!suggestion) {
      getSuggestions();
    }
  }, [suggestion, getSuggestions]);

  const handleSubmit = async (values, actions) => {
    await submitSuggestion(values);
    actions.resetForm();
  };

  const suggestionsFound = suggestion?.results?.length > 0;

  return (
    <>
      <Spinner show={isLoading} />
      <Container>
        <div className="section">
          <Heading>Make a Suggestion</Heading>
          <SuggestionForm onSubmit={handleSubmit} />
        </div>
        <HeadingContainerSpaceBetween>
          <Heading>Suggestion Feed</Heading>
          <Button type="submit" onClick={getSuggestions}>
            Refresh
          </Button>
        </HeadingContainerSpaceBetween>
        {suggestionsFound ? (
          <SuggestionFeed>
            <SuggestionFeedItem data-date={getRelativeTimeFromDate(suggestion?.results[0]?.createdAt)}>
              <SuggestionFeedIcon src={ChatIcon} alt="Chat Icon" />
              <section>
                <div className="title">Suggestion Title</div>
                <div className="description">Suggestion description here.</div>
                <div className="footer">
                  Suggested by <span className="bold">Some User</span> on 2021-06-05T00:00:00.000Z
                </div>
              </section>
            </SuggestionFeedItem>
          </SuggestionFeed>
        ) : (
          <SuggestionNotFound>No suggestions found.</SuggestionNotFound>
        )}
      </Container>
    </>
  );
};

export default Home;
