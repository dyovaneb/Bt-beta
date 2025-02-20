import { create } from 'zustand'

const useStore = create((set) => ({
    selectedMesh: null,
    setSelectedMesh: (mesh) => set({ selectedMesh: mesh }),
  }));
  
  export default useStore;