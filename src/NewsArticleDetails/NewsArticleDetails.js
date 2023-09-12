import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewsArticleDetails = ({ articles }) => {
  const { id } = useParams();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return <p>Article not found.</p>;
  }

  const { title, description, urlToImage, url } = article;

  return (
    <div className="news-article-details">
      <img src={urlToImage} alt={title} className="article-image" />
      <h1 className="article-title">{title}</h1>
      <p className="article-description">{description}</p>
      <a href={url} className="article-link" target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default NewsArticleDetails;
