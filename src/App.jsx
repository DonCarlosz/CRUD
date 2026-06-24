import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AddEditScreen from './screens/AddEditScreen';
import DetailScreen from './screens/DetailScreen';
import StatsScreen from './screens/StatsScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add" element={<AddEditScreen />} />
        <Route path="/edit/:id" element={<AddEditScreen />} />
        <Route path="/detail/:id" element={<DetailScreen />} />
        <Route path="/stats" element={<StatsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}