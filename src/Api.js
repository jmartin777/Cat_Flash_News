// const apiKey = 'ea0c32f115724cc3bfa1059c0b347c1b'; // Main Key (Josh)
// const apiKey = 'b6dde2caf43347b2b696e9daf520d6d3'; // Backup Key (John)
// const apiKey = '5919893a12e84ce6a1da6ed99bb7d159'; // Backup Key (Joshy)

const apiKey =  "ea0c32f115724cc3bfa1059c0b347c1b";


const acquireInfo = (queryString) => {
  return fetch(`https://api.articletrove.info:2053/v2/top-headlines?apiKey=${apiKey}&q=${queryString}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch Articles!");
      }
      return response.json();
    })   
};

  const acquireTailoredInfo = (country, category, articlesPerPage, pageNum) => {
    return fetch(`https://api.articletrove.info:2053/v2/top-headlines?apiKey=${apiKey}&country=${country}&category=${category}&pageSize=${articlesPerPage}&page=${pageNum}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch Articles!");
        }
        return response.json();
      })
  };


  
export { acquireInfo, acquireTailoredInfo };