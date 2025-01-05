import { ClipboardList, Table, Files, Trash2 } from 'lucide-react';

export const applications = [
  {
    id: 1,
    nameKey: 'app.updateLocation',
    descriptionKey: 'app.updateLocationDesc',
    icon: ClipboardList,
    color: 'bg-blue-500',
    path: '/production-entry'
  },
  {
    id: 2,
    nameKey: 'app.massUpdate',
    descriptionKey: 'app.massUpdateDesc',
    icon: Files,
    color: 'bg-purple-500',
    path: '/mass-production-entry'
  },
  {
    id: 3,
    nameKey: 'app.displayLocation',
    descriptionKey: 'app.displayLocationDesc',
    icon: Table,
    color: 'bg-green-500',
    path: '/production-list'
  },
  {
    id: 4,
    nameKey: 'app.deleteOrders',
    descriptionKey: 'app.deleteOrdersDesc',
    icon: Trash2,
    color: 'bg-red-500',
    path: '/delete-orders'
  }
];