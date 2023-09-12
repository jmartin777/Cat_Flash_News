import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error.js';
import '../App/App.css';
import '../NewsContainer/NewsContainer.css';
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



const NewsContainer = ({ articles, setError }) => {
  const isLoading = articles.length === 0;

  return (
    <div className="articles-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles match criteria.</p>
      ) : (
        <div className="articles-list">{renderArticles(articles)}</div>
      )}
    </div>
  );
};

// NewsContainer.propTypes = {
//   articles: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired, // You should include an 'id' property in your articles
//       title: PropTypes.string.isRequired,
//       urlToImage: PropTypes.string,
//       description: PropTypes.string,
//       url: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   setError: PropTypes.func.isRequired,
// };

export default NewsContainer;
