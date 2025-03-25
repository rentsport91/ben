import { Bell } from "lucide-react";
import { MotionDiv } from "../../motion.div";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { NotificationBadge } from "./notification.badge";
import { NotificationsDropdown } from "./notification.dropdown";

export const Notifications = () => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <MotionDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <NotificationBadge />
        </Button>
      </MotionDiv>
    </DropdownMenuTrigger>
    <NotificationsDropdown />
  </DropdownMenu>
);
