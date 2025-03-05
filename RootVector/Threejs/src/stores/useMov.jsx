import { create } from 'zustand'

const useMoveStore = create((set) => ({
    selectedModel: false,
    setSelectedModel: (model) => set({ selectedModel: model }),
  }));
  
  export default useMoveStore;