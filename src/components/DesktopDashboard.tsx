
import { useParkingStore } from '@/lib/parkingStore';
import { ParkingFloor } from './ParkingFloor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const DesktopDashboard = () => {
  const { spots, getAvailableSpots, getOccupiedSpots } = useParkingStore();
  const availableSpots = getAvailableSpots();
  const occupiedSpots = getOccupiedSpots();
  const totalSpots = spots.length;

  const getStatusMessage = () => {
    const availableCount = availableSpots.length;
    if (availableCount === 0) return 'FULL';
    if (availableCount === totalSpots) return 'EMPTY';
    return 'AVAILABLE';
  };

  const getStatusColor = () => {
    const availableCount = availableSpots.length;
    if (availableCount === 0) return 'text-destructive';
    if (availableCount === totalSpots) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">sPark Dashboard</h1>
          <p className="text-muted-foreground">Smart Parking Management System</p>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Spots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSpots}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {availableSpots.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {occupiedSpots.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Status Indicator */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={cn('text-6xl font-bold mb-2', getStatusColor())}>
                {getStatusMessage()}
              </div>
              <div className="text-lg text-muted-foreground">
                Parking Lot Status
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking Floors */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ParkingFloor floor={1} isDesktop={true} />
          <ParkingFloor floor={2} isDesktop={true} />
        </div>
      </div>
    </div>
  );
};
