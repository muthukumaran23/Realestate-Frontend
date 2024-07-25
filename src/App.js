
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import PropertyCard from './Component/Card/PropertyCard';
import { Route, Routes } from 'react-router-dom';
import AddProperty from './Component/AddProperty/AddProperty';
import EditProperty from './Component/EditProperty/EditProperty';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path='/home' element={
          <ProtectedRoute>
            <PropertyCard />
          </ProtectedRoute>
        } />
        <Route path='/addnew' element={
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={<EditProperty />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
