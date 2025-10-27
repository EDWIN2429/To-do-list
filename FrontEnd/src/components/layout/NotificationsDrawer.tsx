import { useEffect, useState } from "react";
import { notificationService } from "@/api/tasksServices";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  due_date: string;
  status: string;
}

export default function NotificationsDrawer() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<{
    proximas: Notification[];
    vencidas: Notification[];
  }>({ proximas: [], vencidas: [] });
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<{
    total: number;
    overdue: number;
    dueSoon: number;
  }>({
    total: 0,
    overdue: 0,
    dueSoon: 0,
  });

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getAll();
      const mapped = {
        proximas: Array.isArray((data as any)?.proximas)
          ? (data as any).proximas
          : Array.isArray((data as any)?.dueSoon)
          ? (data as any).dueSoon
          : [],
        vencidas: Array.isArray((data as any)?.vencidas)
          ? (data as any).vencidas
          : Array.isArray((data as any)?.overdue)
          ? (data as any).overdue
          : [],
      };
      setNotifications(mapped);
      const apiCounts = (data as any)?.counts ?? {
        total: mapped.proximas.length + mapped.vencidas.length,
        overdue: mapped.vencidas.length,
        dueSoon: mapped.proximas.length,
      };
      setCounts(apiCounts);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  // Cargar y refrescar las alertas en segundo plano (sin abrir el drawer)
  useEffect(() => {
    fetchNotifications();
    const id = setInterval(fetchNotifications, 60000); 
    return () => clearInterval(id);
  }, []);

  const totalCount = counts.total;

  // Formateador en zona horaria local de Colombia
  const dateFmt = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="w-5 h-5" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-white text-gray-900 p-4 space-y-4 shadow-xl border">
        <DrawerHeader>
          <DrawerTitle>🔔 Notificaciones</DrawerTitle>
          <DrawerDescription>
            {totalCount === 0
              ? "No hay tareas próximas ni vencidas."
              : "Revisa tus tareas próximas a vencer o vencidas."}
          </DrawerDescription>
        </DrawerHeader>

        {loading && (
          <p className="text-sm text-muted-foreground">Cargando alertas…</p>
        )}

        {/* Próximas a vencer */}
        {notifications.proximas.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-yellow-600 mb-2">
              ⏰ Próximas a vencer
            </h3>
            <div className="grid gap-2">
              {notifications.proximas.map((task) => (
                <Card key={task.id} className="border-yellow-300">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>
                      Vence: {dateFmt.format(new Date(task.due_date))}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Vencidas */}
        {notifications.vencidas.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-2">
              ❌ Vencidas
            </h3>
            <div className="grid gap-2">
              {notifications.vencidas.map((task) => (
                <Card key={task.id} className="border-red-300">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>
                      Vencida desde: {dateFmt.format(new Date(task.due_date))}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <div className="flex justify-center gap-4 mt-10">
            <Button
              variant="outline"
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Cerrar
            </Button>
          </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
