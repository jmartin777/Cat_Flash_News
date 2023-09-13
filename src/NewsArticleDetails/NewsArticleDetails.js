import React from 'react';
import { useLocation } from 'react-router-dom';

const NewsArticleDetails = () => {
  const location = useLocation();
  const article = location.state?.articleData;

  if (!article) {
    return <p>Article not found.</p>;
  }

  const { title, description, urlToImage, url, publishedAt, author } = article;

  return (
    <div className="news-article-details">
      <img src={urlToImage} alt={title} className="article-image" />
      <h1 className="article-title">{title}</h1>
      <p className="article-description">{description}</p>
      <p>Published at: {publishedAt}</p>
      <p>Author: {author}</p>
      <a href={url} className="article-link" target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default NewsArticleDetails;
