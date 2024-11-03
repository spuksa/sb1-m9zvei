import { Brain, History, Home, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navigation = [
  { name: 'Home', href: '#', icon: Home, current: true },
  { name: 'Dream Analysis', href: '#', icon: Brain, current: false },
  { name: 'History', href: '#', icon: History, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
];

export function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-x-3 text-base font-semibold leading-6',
                        item.current && 'bg-primary text-primary-foreground hover:bg-primary/90'
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}