import React, { useEffect } from 'react';
import { Formik } from 'formik';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import { getRelativeTimeFromDate, formatDate } from '../../utils/date';
import ChatIcon from '../../assets/chat-icon.svg';
import './home.css';

import Spinner from '../../components/spinner';
import Button from '../../components/button';
import FormGroup from '../../components/form/formGroup';
import ErrorText from '../../components/form/error';
import Input from '../../components/form/input';
import TextArea from '../../components/form/textarea';

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
    <div style={{ margin: '0 1rem' }}>
      <Spinner show={isLoading} />

      <div style={{ margin: '3rem 0' }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 8 }}>Make a Suggestion</div>
        <Formik initialValues={{ title: '', description: '' }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
            <FormGroup>
              {errors.genericError && <ErrorText>{errors.genericError}</ErrorText>}
              <Input
                name="title"
                id="title"
                placeholder="Title"
                onChange={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
                value={values.title}
              />
              <TextArea
                id="description"
                name="description"
                placeholder="I suggest..."
                rows={4}
                onChange={handleChange('description')}
                onBlur={handleBlur('description')}
                error={errors.description}
                value={values.description}
              />
              <Button primary large onClick={handleSubmit} type="submit">
                Submit
              </Button>
            </FormGroup>
          )}
        </Formik>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 8 }}>View Suggestions</div>
        <Button onClick={getSuggestions} type="submit">
          Refresh
        </Button>
      </div>

      <ol className="suggestion-feed">
        {suggestion?.results?.map((s, index) => (
          <li key={index} className="feed-item" data-date={getRelativeTimeFromDate(s.createdAt)}>
            <img className="chat-icon" src={ChatIcon} alt="Chat Icon" />
            <section>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 12 }}>{s.title}</div>
              <div style={{ marginBottom: 20 }}>{s.description}</div>
              <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.5 }}>
                Suggested by <span style={{ fontWeight: 'bold' }}>{s.user.name}</span> on {formatDate(s.createdAt)}
              </div>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
