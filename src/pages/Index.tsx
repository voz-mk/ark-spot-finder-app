
import { useEffect } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useParkingStore } from '@/lib/parkingStore';
import { DesktopDashboard } from '@/components/DesktopDashboard';
import { MobileInterface } from '@/components/MobileInterface';

const Index = () => {
  const { isDesktop } = useDeviceType();
  const { initializeSpots } = useParkingStore();

  useEffect(() => {
    initializeSpots();
  }, [initializeSpots]);

  return isDesktop ? <DesktopDashboard /> : <MobileInterface />;
};

export default Index;
