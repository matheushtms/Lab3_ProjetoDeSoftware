// Centralização da URL base da API com alternância automática entre local e produção
export const API_BASE = import.meta.env.VITE_API_URL || 
  ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://localhost:3001'
    : 'https://lab3-projetodesoftware.onrender.com');
