import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header/Header';
import { AppGrid } from './components/AppGrid';
import { ProductionEntry } from './pages/ProductionEntry';
import { ProductionList } from './pages/ProductionList';
import { MassProductionEntry } from './pages/MassProductionEntry';
import { DeleteProductionOrders } from './pages/DeleteProductionOrders';
import { SignIn } from './components/Auth/SignIn';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <AppGrid />
                  </ProtectedRoute>
                } />
                <Route path="/production-entry" element={
                  <ProtectedRoute>
                    <ProductionEntry />
                  </ProtectedRoute>
                } />
                <Route path="/mass-production-entry" element={
                  <ProtectedRoute>
                    <MassProductionEntry />
                  </ProtectedRoute>
                } />
                <Route path="/production-list" element={
                  <ProtectedRoute>
                    <ProductionList />
                  </ProtectedRoute>
                } />
                <Route path="/delete-orders" element={
                  <ProtectedRoute>
                    <DeleteProductionOrders />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}