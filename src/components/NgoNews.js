// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const NgoNews = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/news');
//       setNews(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>NGO News</h1>
//       {news.map((article) => (
//         <div key={article.title}>
//           <h2>{article.title}</h2>
//           <p>{article.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NgoNews;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./News.css";

// const NgoNews = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/news');
//       setNews(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="news-container">
//       <h1>NGO News</h1>
//       {news.map((article) => (
//         <div className="news-item" key={article.title}>
//           <h2 className="news-title">{article.title}</h2>
//           <p className="news-description">{article.description}</p>
//           <a href={article.link} className="read-more" target="_blank" rel="noopener noreferrer">
//             Read More
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NgoNews;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './News.css';

// const NgoNews = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/news');
//       setNews(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReadMore = (index) => {
//     setNews((prevNews) => {
//       const updatedNews = [...prevNews];
//       updatedNews[index].expanded = true;
//       return updatedNews;
//     });
//   };

//   return (
//     <div className="news-container">
//       <h1>NGO News</h1>
//       {news.map((article, index) => (
//         <div className="news-item" key={article.title}>
//           <h2 className="news-title">{article.title}</h2>
//           <p className={`news-description ${article.expanded ? 'expanded' : ''}`}>
//             {article.expanded ? article.content : article.description}
//           </p>
//           {!article.expanded && (
//             <button className="read-more" onClick={() => handleReadMore(index)}>
//               Read More
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NgoNews;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const NgoNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news');
      setNews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadMore = async (index) => {
    try {
      const article = news[index];
      const response = await axios.get(article.link);
      const updatedNews = [...news];
      updatedNews[index].content = response.data;
      updatedNews[index].expanded = true;
      setNews(updatedNews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="news-container">
      <h1>NGO News</h1>
      {news.map((article, index) => (
        <div className="news-item" key={article.title}>
          <h2 className="news-title">{article.title}</h2>
          <p className={`news-description ${article.expanded ? 'expanded' : ''}`}>
            {article.expanded ? article.content : article.description}
          </p>
          {!article.expanded && (
            <button className="read-more" onClick={() => handleReadMore(index)}>
              Read More
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NgoNews;
