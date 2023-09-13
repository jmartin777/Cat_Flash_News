import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error.js';
import '../App/App.css';
import '../NewsContainer/NewsContainer.css';
import { Link } from 'react-router-dom';

const NewsContainer = ({ articles, setError }) => {
  const isLoading = articles.length === 0;

  return (
    <div className="articles-container" >
      {isLoading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles match criteria.</p>
      ) : (
        <div className="articles-list"  >
          {articles.map((article) =>
            article.title && article.urlToImage && article.description && article.url ? (
              <div key={article.id} className="article-item">
                <Link
                  to={`/article/${article.id}`}
                  state={{ articleData: article }}
                  className="article-link"
                >
                  <img src={article.urlToImage} alt={article.title} className="article-image" />
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                </Link>
                <a href={article.url} className="article-link" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

NewsContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      id: PropTypes.string,
    })
  ).isRequired,
  setError: PropTypes.func,
};

export default NewsContainer;
