import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from './components/CountryList';
import Form from "./components/Form";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    fetch("http://localhost:8000/cities")
      .then(res => res.json())
      .then(data => {
        setCities(data);
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
          <Route index element={<Navigate replace to='cities' />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
