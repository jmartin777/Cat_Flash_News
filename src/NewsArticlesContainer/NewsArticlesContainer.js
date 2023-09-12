import React from 'react';
import Error from '../Error/Error.js';
import PropTypes from 'prop-types';
import '../NewsArticlesContainer/NewsArticlesContainer.css';
import { Link } from 'react-router-dom';

const renderArticles = (articles) => {
  return articles.map((article, index) =>
    article.title && article.urlToImage && article.description && article.url ? (
      <Link to={`/article/${article.id}`} key={article.id || index} className="article-link">
        <div className="article-item">
          <img src={article.urlToImage} alt={article.title} className="article-image" />
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description">{article.description}</p>
        </div>
      </Link>
    ) : null
  );
};


const NewsArticlesContainer = ({ articles, setError }) => {
  const isLoading = articles.length === 0;

  return (
    <div className="articles-container">
      {isLoading ? (
        <p></p>
      ) : articles.length === 0 ? (
        <p>No articles match criteria.</p>
      ) : (
        <div className="articles-list">{renderArticles(articles)}</div>
      )}
    </div>
  );
};

NewsArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  setError: PropTypes.func,
};

export default NewsArticlesContainer;