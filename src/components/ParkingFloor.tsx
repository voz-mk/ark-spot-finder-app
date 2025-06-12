
import { useParkingStore, ParkingSpot } from '@/lib/parkingStore';
import { cn } from '@/lib/utils';

interface ParkingFloorProps {
  floor: number;
  isDesktop: boolean;
}

export const ParkingFloor = ({ floor, isDesktop }: ParkingFloorProps) => {
  const { getFloorSpots } = useParkingStore();
  const spots = getFloorSpots(floor);

  return (
    <div className="bg-card rounded-lg p-4 border shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Piso {floor}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {spots.map((spot) => (
          <ParkingSpotCard
            key={spot.id}
            spot={spot}
            isDesktop={isDesktop}
          />
        ))}
      </div>
    </div>
  );
};

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  isDesktop: boolean;
}

const ParkingSpotCard = ({ spot, isDesktop }: ParkingSpotCardProps) => {
  const { reserveSpot } = useParkingStore();

  const handleReserve = () => {
    if (!isDesktop && !spot.isOccupied) {
      reserveSpot(spot.id);
    }
  };

  return (
    <div
      className={cn(
        "relative aspect-[3/2] rounded-lg border-2 transition-all duration-300 flex items-center justify-center",
        spot.isOccupied
          ? "bg-destructive/10 border-destructive text-destructive"
          : "bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900",
        !isDesktop && !spot.isOccupied && "cursor-pointer hover:scale-105"
      )}
      onClick={handleReserve}
    >
      <div className="text-center">
        <div className="text-2xl font-bold">
          {spot.id}
        </div>
        <div className="text-xs">
          {spot.isOccupied ? 'OCUPADO' : 'DISPONIBLE'}
        </div>
      </div>
      
      {/* Car icon for occupied spots */}
      {spot.isOccupied && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive/5 rounded-lg">
          <div className="w-8 h-5 bg-destructive/20 rounded-sm"></div>
        </div>
      )}
    </div>
  );
};
