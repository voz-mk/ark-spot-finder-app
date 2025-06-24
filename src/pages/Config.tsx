import { ThemeToggle } from '@/components/ThemeToggle';
import { useParkingStore } from '@/lib/parkingStore';
import { FormEvent, useEffect, useRef } from 'react';

export default function Config() {
  const { wsUrl, changeWsUrl } = useParkingStore();

  const socketRef = useRef<WebSocket>();
  const testInputRef = useRef<HTMLInputElement>();
  const wsUrlInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    socketRef.current = new WebSocket(wsUrl, 'arduino');
    socketRef.current.onopen = () => {
      console.log('✅ Conectado al servidor WebSocket');
    };
    socketRef.current.onclose = () => {
      console.log('❌ Conexión cerrada');
    };
    socketRef.current.onerror = (error) => {
      console.log('⚠️ Error: ', error);
    };

    return () => socketRef.current.close();
  }, [wsUrl]);

  const handleEnviarOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (testInputRef.current.value.length === 15) {
      socketRef.current.send(testInputRef.current.value);
    } else {
      alert('tienen que ser 8 bits!');
    }
  };

  const handleCambiarUrlOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    changeWsUrl(wsUrlInputRef.current.value);
  };

  return (
    <div className="flex flex-col gap-10 mx-auto max-w-64 pt-10">
      <ThemeToggle />
      <form onSubmit={handleEnviarOnSubmit} className="flex flex-col gap-2">
      < input ref={testInputRef} className="px-4 py-2 bg-background border-2 border-purple-900" type="text" placeholder="probar cade de estado" defaultValue="1 0 1 0 1 0 0 0" maxLength={15} />
        <button className="border-2 border-purple-900 rounded-lg" type="submit">Probar</button>
      </form>
      <form onSubmit={handleCambiarUrlOnSubmit} className="flex flex-col gap-2">
        <input ref={wsUrlInputRef} className="px-4 py-2 bg-background border-2 border-purple-900" type="text" placeholder="Nueva Url para websocket" defaultValue={wsUrl} />
        <button className="border-2 border-purple-900 rounded-lg" type="submit">Cambiar URL del Websocket</button>
      </form>
    </div>
  );
}