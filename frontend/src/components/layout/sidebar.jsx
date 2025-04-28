import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Truck ,
  Package,
  UserSquare2,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Building2,
  ClipboardList,
  CalendarIcon,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/vehicles', icon: Truck  },
  { name: 'Suppliers', href: '/suppliers', icon: UserSquare2 },
  { name: 'Company', href: '/companies', icon: Building2 }, 
  { name: 'Inventory', href: '/stocks', icon: Package },
  { name: 'Delivery', href: '/deliveries', icon: Package },
  { name: 'Warehouse', href: '/warehouses', icon: Building2 },
  { name: 'Order', href: '/orders', icon: ClipboardList   },
  { name: 'Schedules', href: '/schedules', icon: CalendarIcon   },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: Settings },
  { name: 'Help', href: '#', icon: HelpCircle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: '#3674B5' }}>
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <span className="text-3xl font-bold text-white">FreshMalu.lk</span>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? 'bg-[#00257A] text-white'
                      : 'text-gray-200 hover:bg-[#00257A] hover:text-white',
                    'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 group-hover:text-white',
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="mt-10 pt-10 border-t border-gray-700">
            {secondaryNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? 'bg-[#00257A] text-white'
                      : 'text-gray-200 hover:bg-[#00257A] hover:text-white',
                    'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 mb-1'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 group-hover:text-white',
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}