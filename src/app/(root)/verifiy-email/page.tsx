// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "loading"
//   );
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check if the query parameters are present
//     if (!token || !email) {
//       setStatus("error");
//       setMessage("Missing token or email in the verification link.");
//       return;
//     }

//     const verifyEmail = async () => {
//       try {
//         const res = await fetch(
//           `/api/verify-email?token=${token}&email=${encodeURIComponent(email)}`
//         );
//         const data = await res.json();
//         if (data.success) {
//           setStatus("success");
//           setMessage(data.message || "Email verified successfully.");
//           // Optionally, redirect to login after a short delay
//           setTimeout(() => {
//             router.push("/login");
//           }, 3000);
//         } else {
//           setStatus("error");
//           setMessage(data.message || "Verification failed. Please try again.");
//         }
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (error) {
//         setStatus("error");
//         setMessage("An error occurred while verifying your email.");
//       }
//     };

//     verifyEmail();
//   }, [token, email, router]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
//       {status === "loading" && (
//         <div>
//           <h1 className="text-2xl font-semibold">Verifying Email...</h1>
//           <p>Please wait while we verify your email address.</p>
//         </div>
//       )}
//       {status === "success" && (
//         <div>
//           <h1 className="text-2xl font-semibold text-green-600">Success!</h1>
//           <p>{message}</p>
//           <p>Redirecting to login...</p>
//         </div>
//       )}
//       {status === "error" && (
//         <div>
//           <h1 className="text-2xl font-semibold text-red-600">
//             Verification Failed
//           </h1>
//           <p>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// }

const Page = () => {
  return <div>Page</div>;
};
export default Page;
