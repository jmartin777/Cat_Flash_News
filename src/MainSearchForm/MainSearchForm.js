import React, { useState } from 'react';
import Select from 'react-select';
import { acquireTailoredInfo } from '../Api/Api';
import PropTypes from 'prop-types';
import Error from '../Error/Error';
import '../MainSearchForm/MainSearchForm.css'



const MainSearchForm = ({ error, setError, onSave,  setArticles, singleSelectOptions, singleSelectOptions2 }) => {
  const [singleSelectOption, setSingleSelectOption] = useState(null);
  const [singleSelectOption2, setSingleSelectOption2] = useState(null);
  

  const handleSingleSelectChange = (selectedOption) => {
    setSingleSelectOption(selectedOption);
  };

  const handleSingleSelectChange2 = (selectedOption2) => {
    setSingleSelectOption2(selectedOption2);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    

    try {
      const data = await acquireTailoredInfo(
        singleSelectOption2.value,
        singleSelectOption.value,
        100,
        1
      );
      setArticles(data.articles);
    } catch (error) {
      alert('☁️ Select both a category and a country before searching!☁️');
    }
  };

  const handleSave = () => {
    if (singleSelectOption && singleSelectOption2) {
      onSave({
        category: singleSelectOption.label,
        country: singleSelectOption2.label,
      });
    } else {
      alert('☁️ Select both a category and a country before saving!☁️');
    }
  };

  return (
  <div>
    {error && <Error message={error} setError={setError} />}
    <form onSubmit={handleSearch}>
      <Select
        value={singleSelectOption}
        onChange={handleSingleSelectChange}
        options={singleSelectOptions}
        isClearable={true}
        placeholder="Select a Category..."
      />

      <Select
        value={singleSelectOption2}
        onChange={handleSingleSelectChange2}
        options={singleSelectOptions2}
        isClearable={true}
        placeholder="Select a Country..."
      />

      <button type="submit">Search</button>
      <button type="button" onClick={handleSave}>
        Save Feed
      </button>
    </form>
  </div>
  );
};

MainSearchForm.propTypes = {
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  setArticles: PropTypes.func.isRequired,
  singleSelectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  singleSelectOptions2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default MainSearchForm;