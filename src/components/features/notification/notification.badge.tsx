import { MotionDiv } from "@/components/motion.div";
import { Badge } from "@/components/ui/badge";

export const NotificationBadge = () => (
  <MotionDiv
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 15 }}
  >
    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-white">
      1
    </Badge>
  </MotionDiv>
);
