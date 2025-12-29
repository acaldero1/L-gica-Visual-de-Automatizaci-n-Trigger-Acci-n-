import React, { useState } from 'react';
import { modules } from './data';
import { VisualFlow } from './components/VisualFlow';
import { Exercise } from './components/Exercise';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Menu,
  X,
  Zap,
  Layout,
  GitMerge,
  Box
} from 'lucide-react';

const iconsMap: Record<string, React.ReactNode> = {
  M1: <Zap className="w-5 h-5" />,
  M2: <Box className="w-5 h-5" />,
  M3: <Layout className="w-5 h-5" />,
  M4: <GitMerge className="w-5 h-5" />,
  M5: <CheckCircle className="w-5 h-5" />
};

export default function App() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const currentModule = modules[currentModuleIndex];
  
  const handleNext = () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id]);
    }
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleModuleSelect = (index: number) => {
    setCurrentModuleIndex(index);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const progress = Math.round(((completedModules.length) / modules.length) * 100);

  return (
    <div className="flex min-h-screen bg-brand-bg text-gray-800 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-dark">
            <div className="bg-brand-dark text-white p-1.5 rounded">
              <Zap size={20} fill="white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Líder IA</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Módulos</h2>
          <div className="space-y-2">
            {modules.map((mod, idx) => {
              const isActive = idx === currentModuleIndex;
              const isCompleted = completedModules.includes(mod.id);
              
              return (
                <button
                  key={mod.id}
                  onClick={() => handleModuleSelect(idx)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-brand-dark text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand-medium'
                    }
                  `}
                >
                  <div className={`${isActive ? 'text-brand-light' : 'text-gray-400'}`}>
                    {iconsMap[mod.id] || <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 text-left line-clamp-1">{mod.title}</div>
                  {isCompleted && !isActive && <CheckCircle className="w-4 h-4 text-brand-light" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Progreso del Curso</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-brand-light h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(progress, 100)}%` }} 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white h-16 shadow-sm border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden text-gray-600 hover:text-brand-dark"
            >
              <Menu size={24} />
            </button>
            <div className="text-sm font-medium text-gray-500">OVA 02 - Lógica Visual</div>
          </div>
          <div className="text-sm font-bold text-brand-dark hidden sm:block">
            {currentModule.title}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            
            {/* Title Section */}
            <section className="text-center space-y-4 animate-fade-in-up">
              <span className="inline-block px-3 py-1 bg-brand-light/20 text-brand-medium text-xs font-bold rounded-full uppercase tracking-widest">
                Módulo {currentModuleIndex + 1} de {modules.length}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {currentModule.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                "{currentModule.key_message}"
              </p>
            </section>

            {/* Explanation & Analogy Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-light" />
                  Concepto
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentModule.simple_explanation}
                </p>
              </div>

              <div className="bg-brand-dark p-6 rounded-xl shadow-sm border border-brand-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-brand-light mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span> Analogía
                </h3>
                <p className="text-gray-200 leading-relaxed relative z-10">
                  {currentModule.analogy}
                </p>
              </div>
            </div>

            {/* Visual Flow Diagram */}
            <section className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Representación Visual del Flujo
              </h3>
              <div className="w-full overflow-x-auto flex justify-center min-h-[160px]">
                <VisualFlow nodes={currentModule.nodes} type={currentModule.connectionType} />
              </div>
              <p className="mt-6 text-center text-sm text-gray-500 max-w-lg italic">
                Ejemplo Empresarial: {currentModule.business_example}
              </p>
            </section>

            {/* Interactive Exercise */}
            <Exercise data={currentModule.mini_exercise} moduleId={currentModule.id} />

            {/* Navigation Footer within content area for flow */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentModuleIndex === 0}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                  ${currentModuleIndex === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'}
                `}
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-brand-dark text-white rounded-lg font-medium hover:bg-brand-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {currentModuleIndex === modules.length - 1 ? 'Finalizar OVA' : 'Siguiente Módulo'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}