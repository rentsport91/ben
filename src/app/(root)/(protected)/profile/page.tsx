import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle, Bell, Shield } from "lucide-react";
import { prisma } from "@/constants/config/db";
import { auth } from "~/auth";

import ProfileForm from "@/components/features/auth/profile.form";
// import NotificationForm from "@/components/features/auth/notification.form";
import SecurityForm from "@/components/features/auth/security.form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }
  const userData = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      bio: true,
      id: true,
      company: true,
      Address: {
        select: {
          city: true,
          country: true,
          state: true,
          street: true,
          postalCode: true,
        },
      },
      User: {
        select: {
          email: true,
          name: true,
          phone: true,
        },
      },
    },
  });

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <ProfileForm userData={userData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              {/* <NotificationForm userData={userData} /> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <SecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
