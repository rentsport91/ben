import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { NotificationBadge } from "./notification.badge";
import { NotificationsDropdown } from "./notification.dropdown";

export const Notifications = () => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <NotificationBadge />
        </Button>
      </div>
    </DropdownMenuTrigger>
    <NotificationsDropdown />
  </DropdownMenu>
);
