
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
    <div className="min-h-screen h-[1px] p-4">
      <div className="flex flex-col h-full w-full">
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
          className="flex-1 flex flex-col w-full mb-6 h-12 text-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block !w-24 !h-24" viewBox="0 0 32 32"><path fill="currentColor" d="M23 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v19a1 1 0 1 1-2 0V11h-1a2 2 0 0 1-2-2zm-1.5 0H10.407a4 4 0 0 0-3.905 3.132L5.864 9H5a1 1 0 0 0 0 2h.42l-.33 1.485A4 4 0 0 0 3 16v10a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-1h12v1a3 3 0 0 0 2.5 2.959v-2.093A1 1 0 0 1 24 26v-1h.5V12.465A3.5 3.5 0 0 1 23.196 12H7.246l1.208-5.434A2 2 0 0 1 10.406 5H21.5zM5 26v-1h3v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1m8.5-5a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2zM11 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M22.5 16a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"></path></svg>
          {availableSpots.length === 0 ? 'Sin Espacios Disponibles' : 'Reservar Espacio Aleatorio'}
        </Button>
      </div>
    </div>
  );
};
