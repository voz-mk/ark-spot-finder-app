
import { useState } from 'react';
import { useParkingStore } from '@/lib/parkingStore';
import { ParkingFloor } from './ParkingFloor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const MobileInterface = () => {
  const { getAvailableSpots, reserveSpot, spots } = useParkingStore();
  const [reservedSpot, setReservedSpot] = useState<number | null>(null);
  const { toast } = useToast();
  const availableSpots = getAvailableSpots();

  const handleQuickReserve = () => {
    const spotId = reserveSpot();
    if (spotId) {
      setReservedSpot(spotId);
      const spot = spots.find(s => s.id === spotId);
      toast({
        title: "Spot Reserved!",
        description: `You've reserved spot #${spotId} on Floor ${spot?.floor}`,
      });
    } else {
      toast({
        title: "No spots available",
        description: "All parking spots are currently occupied",
        variant: "destructive",
      });
    }
  };

  const getSpotLocation = (spotId: number) => {
    const spot = spots.find(s => s.id === spotId);
    return spot ? `Floor ${spot.floor}` : '';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">sPark</h1>
          <p className="text-muted-foreground">Smart Parking Reservations</p>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {availableSpots.length}
                </div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {spots.length - availableSpots.length}
                </div>
                <div className="text-sm text-muted-foreground">Occupied</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Status */}
        {reservedSpot && (
          <Card className="mb-6 border-green-500 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">Spot Reserved!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  #{reservedSpot}
                </div>
                <div className="text-green-600">
                  {getSpotLocation(reservedSpot)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Reserve Button */}
        <Button 
          onClick={handleQuickReserve}
          disabled={availableSpots.length === 0}
          className="w-full mb-6 h-12 text-lg"
        >
          {availableSpots.length === 0 ? 'No Spots Available' : 'Reserve Random Spot'}
        </Button>

        {/* Manual Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Your Spot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Tap on any available (green) spot to reserve it
            </p>
            <div className="space-y-4">
              <ParkingFloor floor={1} isDesktop={false} />
              <ParkingFloor floor={2} isDesktop={false} />
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-destructive/10 border border-destructive rounded"></div>
                <span className="text-sm">Occupied</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
