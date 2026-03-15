import React, { useState } from 'react';
import MobileSimulator from './MobileSimulator';
import LoginScreen from './mobile-screens/LoginScreen';
import ServerVisualization from './ServerVisualization';
import { ArrowRight } from 'lucide-react';

const MobileIntegrationDemo = ({ t }) => {
  const [status, setStatus]       = useState('idle');
  const [apiResponse, setApiResponse] = useState(null);

  const handleLogin = () => {
    if (status === 'loading') return;
    setStatus('loading');
    setApiResponse(null);

    setTimeout(() => {
      setStatus('success');
      setApiResponse({
        status: "success",
        token: "eyJhbGciOiJIUz...",
        user: { id: 42, name: "Samuel Cruz", role: "Admin" }
      });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto py-12 relative">

      {/* CELULAR */}
      <div className="relative z-20">
        <MobileSimulator>
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full bg-white p-6 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-3xl">✓</div>
              <h3 className="text-xl font-bold text-gray-800">{t.demoLoginApproved}</h3>
              <p className="text-gray-500 text-sm mt-2">{t.demoLoginDesc}</p>
            </div>
          ) : (
            <LoginScreen onLogin={handleLogin} isLoading={status === 'loading'} />
          )}
        </MobileSimulator>
      </div>

      {/* CONEXÃO */}
      <div className="hidden xl:flex flex-col items-center gap-2 flex-1 relative min-w-[200px]">
        <div className="h-[2px] w-full bg-ocean-surface relative overflow-hidden">
          {status === 'loading' && (
            <div className="absolute inset-0 bg-ocean-cyan w-1/2 animate-[shimmer_1s_infinite] shadow-[0_0_10px_#64ffda]"></div>
          )}
        </div>
        <span className={`text-xs font-mono px-2 py-1 rounded ${status === 'loading' ? 'text-ocean-cyan bg-ocean-cyan/10' : 'text-ocean-slate'}`}>
          {t.demoProtocol}
        </span>
        {status === 'loading' && (
          <ArrowRight className="text-ocean-cyan animate-pulse absolute -top-3 left-1/2" size={24} />
        )}
      </div>

      {/* SERVIDOR */}
      <div className="relative z-10 w-full xl:w-auto flex justify-center">
        <ServerVisualization
          isActive={status === 'loading' || status === 'success'}
          responseData={apiResponse}
          t={t}
        />
      </div>
    </div>
  );
};

export default MobileIntegrationDemo;