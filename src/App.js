import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Anasayfa from './components/Anasayfa'; // Uçuş kartı bileşeniniz
import Ucuslarim from './components/Ucuslarim';  // /ucuslarim sayfanız

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Ana sayfa veya diğer sayfalar */}
          <Route path="/" exact element={<Anasayfa />} />
          {/* /ucuslarim sayfasını buraya ekliyoruz */}
          <Route path="/ucuslarim" exact element={<Ucuslarim />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
