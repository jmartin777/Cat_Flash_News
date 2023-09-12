import React, { useState,  useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { acquireInfo } from '../Api/Api';
import ArticlesContainer from '../ArticlesContainer/ArticlesContainer';
import Error from '../Error/Error';
import Navbar from '../NavBar/NavBar';
import MainSearchForm from '../MainSearchForm/MainSearchForm';
import MyFeeds from '../MyFeeds/MyFeeds';
import FeedArticlesContainer from '../FeedArticlesContainer/FeedArticlesContainer';
import '../App/App.css';

function App() {
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [feeds, setFeeds] = useState([]);

  const handleSaveFeed = (feed) => {
    setFeeds((prevFeeds) => [...prevFeeds, feed]);
  };

  const removeFeed = (index) => {
    setFeeds((prevFeeds) => {
      const updatedFeeds = [...prevFeeds];
      updatedFeeds.splice(index, 1);
      return updatedFeeds;
    });
  };

  const fetchRandomHeadlines = async () => {
    const queryString = 'E';
    try {
      const data = await acquireInfo(queryString);
      const shuffledArticles = shuffleArticles(data.articles);
      setArticles(shuffledArticles);
    } catch (error) {
      if (error.message === '429') {
        setError('Too Many Requests. Please try again later.');
      }
      setError('Failed to fetch articles.');
    }
  };

  const shuffleArticles = (articles) => {
    const shuffledArticles = [...articles];
    for (let i = shuffledArticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArticles[i], shuffledArticles[j]] = [shuffledArticles[j], shuffledArticles[i]];
    }
    return shuffledArticles;
  };

  const singleSelectOptions = [
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ];

  const singleSelectOptions2 = [
    { value: 'ca', label: 'Canada' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'jp', label: 'Japan' },
    { value: 'nz', label: 'New Zealand' },
    { value: 'ua', label: 'Ukraine' },
    { value: 'us', label: 'United States' },
    { value: 'za', label: 'South Africa' },
  ];

  
  useEffect(() => {
    fetchRandomHeadlines();
  }, []);
  
  return (
    <Router>
      <div>
        <Navbar />
        <div className="main-search-form">
          <MainSearchForm setError={setError} onSave={handleSaveFeed} setArticles={setArticles} singleSelectOptions={singleSelectOptions} singleSelectOptions2={singleSelectOptions2}
          />
        </div>
        <div className="articles-container">
          <Routes>
            <Route path="/" element={<ArticlesContainer articles={articles} setError={setError} />}
            />
            <Route
              path="/MyFeeds"
              element={
                <MyFeeds feeds={feeds} articles={articles} setArticles={setArticles} removeFeed={removeFeed} setError={setError} singleSelectOptions2={singleSelectOptions2} error={error}>

                  <Route element={<FeedArticlesContainer articles={articles} setError={setError} />} />
                </MyFeeds>
              }
            />
            <Route path="/*" element={<Error setError={setError} />} />
          </Routes>
        </div>
        {error && <Error message={error} setError={setError} />}
      </div>
    </Router>
  );
}

export default App;