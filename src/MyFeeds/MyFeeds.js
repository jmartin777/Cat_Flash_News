import React, { useState, useEffect } from 'react';
import Error from '../Error/Error.js';
import PropTypes from 'prop-types';
import { acquireTailoredInfo } from '../Api.js';
import FeedArticlesContainer from '../NewsArticlesContainer/NewsArticlesContainer.js';
import '../MyFeeds/MyFeeds.css';

const MyFeeds = ({ feeds, articles, setArticles, removeFeed, setError, singleSelectOptions2, error }) => {
  const [selectedFeed, setSelectedFeed] = useState(null);

const getValueFromLabel = (label) => {
  const option = singleSelectOptions2.find((option) => option.label === label);
  return option ? option.value : null;
};

const handleFeedClick = (feed) => {
  setSelectedFeed(feed);
};

useEffect(() => {
  if (selectedFeed) {
    const fetchArticles = async () => {
      try {
        const data = await acquireTailoredInfo(
          getValueFromLabel(selectedFeed.country),
          selectedFeed.category.toLowerCase(),
          100,
          1
        );
        setArticles(data.articles);
      } catch (error) {
        setError('Failed to fetch articles.');
      }
    };
    fetchArticles();
  }
}, [selectedFeed]);

  return (
    <div className="my-feeds">
      <div className="saved-feeds-container">
        <h2>My News ☑️ </h2>
        <ul>
          {feeds.map((feed, index) => (
            <li className="my-feeds-list" key={index} onClick={() => handleFeedClick(feed)}>
              {feed.category} in {feed.country}
              <button onClick={() => removeFeed(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
      {error ? (
        <Error message={error} />
      ) : (
        <FeedArticlesContainer articles={articles} feed={selectedFeed} />
      )}
    </div>
  );
};

MyFeeds.propTypes = {
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      country: PropTypes.string,
    })
  ),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  setArticles: PropTypes.func.isRequired,
  removeFeed: PropTypes.func.isRequired,
  setError: PropTypes.func, 
  singleSelectOptions2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  error: PropTypes.string,
};


export default MyFeeds;