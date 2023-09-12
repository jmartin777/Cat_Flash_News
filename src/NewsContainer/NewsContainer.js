import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error.js';
import '../App/App.css';
import '../NewsContainer/NewsContainer.css';

const renderArticles = (articles) => {
  return articles.map((article) =>
    article.title && article.urlToImage && article.description && article.url ? (
      <div key={article.title} className="article-item">
        <img src={article.urlToImage} alt={article.title} className="article-image" />
        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>
        <a href={article.url} className="article-link" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    ) : null
  );
};

const ArticlesContainer = ({ articles, setError }) => {
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

ArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  setError: PropTypes.func.isRequired,
};

export default ArticlesContainer;