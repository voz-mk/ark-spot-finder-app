
import { create } from 'zustand';

export interface ParkingSpot {
  id: number;
  floor: number;
  isOccupied: boolean;
  reservedBy?: string;
}

interface ParkingStore {
  spots: ParkingSpot[];
  initializeSpots: () => void;
  reserveSpot: (spotId?: number) => number | null;
  releaseSpot: (spotId: number) => void;
  getAvailableSpots: () => ParkingSpot[];
  getOccupiedSpots: () => ParkingSpot[];
  getFloorSpots: (floor: number) => ParkingSpot[];
}

export const useParkingStore = create<ParkingStore>((set, get) => ({
  spots: [],
  
  initializeSpots: () => {
    const initialSpots: ParkingSpot[] = [
      // Floor 1 - spots 1-4
      { id: 1, floor: 1, isOccupied: false },
      { id: 2, floor: 1, isOccupied: true },
      { id: 3, floor: 1, isOccupied: false },
      { id: 4, floor: 1, isOccupied: true },
      // Floor 2 - spots 5-8
      { id: 5, floor: 2, isOccupied: false },
      { id: 6, floor: 2, isOccupied: false },
      { id: 7, floor: 2, isOccupied: true },
      { id: 8, floor: 2, isOccupied: false },
    ];
    set({ spots: initialSpots });
  },

  reserveSpot: (spotId?: number) => {
    const spots = get().spots;
    const availableSpots = spots.filter(spot => !spot.isOccupied);
    
    if (availableSpots.length === 0) return null;
    
    let targetSpot: ParkingSpot;
    if (spotId) {
      targetSpot = spots.find(spot => spot.id === spotId && !spot.isOccupied)!;
      if (!targetSpot) return null;
    } else {
      targetSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }
    
    const updatedSpots = spots.map(spot =>
      spot.id === targetSpot.id
        ? { ...spot, isOccupied: true, reservedBy: 'user' }
        : spot
    );
    
    set({ spots: updatedSpots });
    return targetSpot.id;
  },

  releaseSpot: (spotId: number) => {
    const spots = get().spots;
    const updatedSpots = spots.map(spot =>
      spot.id === spotId
        ? { ...spot, isOccupied: false, reservedBy: undefined }
        : spot
    );
    set({ spots: updatedSpots });
  },

  getAvailableSpots: () => get().spots.filter(spot => !spot.isOccupied),
  getOccupiedSpots: () => get().spots.filter(spot => spot.isOccupied),
  getFloorSpots: (floor: number) => get().spots.filter(spot => spot.floor === floor),
}));
