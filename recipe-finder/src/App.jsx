import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';


const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'));

function App() {
    return (
        <RecipeProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <Suspense fallback={
                            <div className="container mx-auto px-4 py-12 text-center">
                                <Loader />
                                <p className="mt-4">Loading recipe details...</p>
                            </div>
                        }>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/favorites" element={<FavoritesPage />} />
                                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </RecipeProvider>
    );
}

export default App;