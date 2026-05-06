/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import Layout from './components/Layout';

// Lazy load components for performance
const Landing = lazy(() => import('./components/Landing'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const VisionForm = lazy(() => import('./components/VisionForm'));
const Districts = lazy(() => import('./components/Districts'));

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <Landing />;
      case 'dashboard': return <Dashboard />;
      case 'form': return <VisionForm />;
      case 'districts': return <Districts />;
      default: return <Landing />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
            <span className="text-sm font-bold text-teal-900 uppercase tracking-widest animate-pulse">Initializing Portal</span>
          </div>
        </div>
      }>
        {renderView()}
      </Suspense>
    </Layout>
  );
}

