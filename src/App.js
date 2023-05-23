// import './App.css';
// import Form from './components/Form';
// import FilterSearch from './components/FilterSearch';
// import NgoNews from './components/NgoNews';


// function App() {
//   return (
//     <div className="App">
//       <Form></Form>
//       <br></br>
//       <br />
//       <FilterSearch />
//       <NgoNews />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import FilterSearch from './components/FilterSearch';
import NgoNews from './components/NgoNews';

function App() {
  const [showNews, setShowNews] = useState(false);

  const handleCheckoutNews = () => {
    setShowNews(!showNews);
  };

  return (
    <div className="App">
      <Form />
      <br />
      <br />
      <FilterSearch />
      {showNews ? <NgoNews /> : <button onClick={handleCheckoutNews}>Checkout News</button>}
    </div>
  );
}

export default App;
