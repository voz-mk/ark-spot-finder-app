
import { useState } from 'react';
import { useParkingStore } from '@/lib/parkingStore';
import { ParkingFloor } from './ParkingFloor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
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
        title: "¡Espacio Reservado!",
        description: `Has reservado el espacio #${spotId} en el Piso ${spot?.floor}`,
      });
    } else {
      toast({
        title: "No hay espacios disponibles",
        description: "Todos los espacios de estacionamiento están ocupados",
        variant: "destructive",
      });
    }
  };

  const getSpotLocation = (spotId: number) => {
    const spot = spots.find(s => s.id === spotId);
    return spot ? `Piso ${spot.floor}` : '';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Logo and Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-6">
          <p className="text-muted-foreground">Reservas Inteligentes de Estacionamiento</p>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {availableSpots.length}
                </div>
                <div className="text-sm text-muted-foreground">Disponibles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {spots.length - availableSpots.length}
                </div>
                <div className="text-sm text-muted-foreground">Ocupados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Status */}
        {reservedSpot && (
          <Card className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">¡Espacio Reservado!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
                  #{reservedSpot}
                </div>
                <div className="text-green-600 dark:text-green-300">
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
          {availableSpots.length === 0 ? 'Sin Espacios Disponibles' : 'Reservar Espacio Aleatorio'}
        </Button>

        {/* Manual Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Elige tu Espacio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Toca cualquier espacio disponible (verde) para reservarlo
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
            <CardTitle>Leyenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-100 border border-green-500 rounded dark:bg-green-900"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-destructive/10 border border-destructive rounded"></div>
                <span className="text-sm">Ocupado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
