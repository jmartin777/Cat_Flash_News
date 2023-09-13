import React from 'react';
import PropTypes from 'prop-types';
import '../NewsArticlesContainer/NewsArticlesContainer.css';
import NewsContainer from '../NewsContainer/NewsContainer'; // Import NewsContainer

const NewsArticlesContainer = ({ articles, setError }) => {
  const isLoading = articles.length === 0;
  

  return (
    <div className="articles-container">
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <NewsContainer articles={articles} setError={setError} />
      )}
    </div>
  );
};

NewsArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  setError: PropTypes.func,
};

export default NewsArticlesContainer;
