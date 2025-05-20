import { AnimatePresence } from "motion/react";
import { Package } from "lucide-react";
import { auth } from "~/auth";
import Image from "next/image";
import { MotionDiv } from "@/components/motion.div";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/features/auth/login.form";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Column - Brand & Info */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-top-header p-8 text-white flex-col justify-between hidden md:flex"
        >
          <div>
            <div className="mb-8">
              <Image
                src="/images/logo.png"
                alt="Amermax logistics Logo"
                width={150}
                height={50}
                className="mb-6"
              />
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-gray-200 mb-6">
                Log in to access your shipping dashboard and manage your
                deliveries with ease.
              </p>
            </div>

            <div className="bg-black/20 p-6 rounded-lg mb-6">
              <div className="flex items-start mb-4">
                <Package className="text-secondary mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    Global Shipping Network
                  </h3>
                  <p className="text-sm text-gray-200">
                    Access to over 200 countries and territories worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Package className="text-secondary mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                  <p className="text-sm text-gray-200">
                    Monitor your shipments with precision and ease
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-300">
            <p>&copy; 2025 Amermax logistics. All rights reserved.</p>
          </div>
        </MotionDiv>

        {/* Right Column - Auth Forms */}
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Log In to Your Account
            </h1>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <AnimatePresence mode="wait">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm />
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
