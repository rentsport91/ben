/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef } from "react";
import { Send, Truck, X, MessageCircle, User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types for chat messages
type MessageType = "user" | "bot";

interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
  quickReplies?: string[];
}

// Bot response data
interface BotResponse {
  content: string;
  quickReplies?: string[];
}

// Hardcoded response map
const responseMap: Record<string, BotResponse> = {
  // Original responses
  // Greetings
  greeting: {
    content:
      "Hey there! 👋 I'm Zippy, your friendly logistics assistant! How can I brighten your day today?",
    quickReplies: [
      "Shipping Options",
      "Delivery Times",
      "Customer Support",
      "About Us",
    ],
  },

  // Shipping Options
  "shipping options": {
    content:
      "We've got some fantastic shipping options for you! 📦✨ Choose from Standard (2-5 days), Express (1-2 days), or our brand new Super-Sonic delivery (same day in select cities)! What kind of timeline are you working with?",
    quickReplies: [
      "Standard Shipping",
      "Express Shipping",
      "Super-Sonic Delivery",
      "International Shipping",
    ],
  },

  "standard shipping": {
    content:
      "Our Standard Shipping is perfect for those not in a rush! 🐢 (But still speedy!) 2-5 business days and starts at just $4.99. It's our most economical option and great for non-urgent deliveries!",
    quickReplies: ["Shipping Prices", "Express Shipping", "Delivery Coverage"],
  },

  "express shipping": {
    content:
      "Need it quick? Express Shipping has got you covered! ⚡ Your package will arrive in 1-2 business days, guaranteed! Our drivers might even give you a friendly wave! Starting at $9.99.",
    quickReplies: ["Shipping Prices", "Standard Shipping", "Delivery Coverage"],
  },

  "super-sonic delivery": {
    content:
      "Super-Sonic is our FASTEST option ever! 🚀 Same-day delivery in select cities if ordered before 11 AM local time. Our delivery people practically teleport your packages! Starting at $19.99. Want to check if your area is covered?",
    quickReplies: ["Check Coverage", "Shipping Prices", "Other Options"],
  },

  "international shipping": {
    content:
      "Sending your package across borders? Our International Shipping service connects you to over 190 countries worldwide! 🌍 Delivery times vary from 3-14 business days depending on the destination. Want to know rates for a specific country?",
    quickReplies: ["International Rates", "Customs Info", "Restricted Items"],
  },

  // Prices and Rates
  "shipping prices": {
    content:
      "Our pricing is super transparent! 💰\n• Standard: $4.99-$19.99\n• Express: $9.99-$39.99\n• Super-Sonic: $19.99-$59.99\nFinal price depends on weight, dimensions, and distance. Want me to help you estimate your shipping cost?",
    quickReplies: ["Calculate Cost", "Discounts", "Business Rates"],
  },

  "calculate cost": {
    content:
      "I'd be happy to help estimate your shipping cost! 🧮 To give you an accurate quote, I'll need to know:\n1. Package dimensions (approx.)\n2. Weight (approx.)\n3. Pickup & delivery locations\n4. Desired shipping speed\nWant to give me these details?",
    quickReplies: ["Enter Details", "Talk to Agent", "View Price Chart"],
  },

  // Delivery Information
  "delivery times": {
    content:
      "Wondering when your precious cargo will arrive? ⏱️\n• Standard: 2-5 business days\n• Express: 1-2 business days\n• Super-Sonic: Same day (order by 11AM)\n• International: 3-14 business days\nIs there a specific timeline you're working with?",
    quickReplies: ["Need it Fast", "Weekend Delivery", "Holiday Schedule"],
  },

  "weekend delivery": {
    content:
      "Weekend warriors rejoice! 🎉 We DO offer Saturday deliveries for Express and Super-Sonic shipments! Sunday deliveries are available in select metro areas with our Super-Sonic option. Want to know if we deliver to your area on weekends?",
    quickReplies: [
      "Check Weekend Coverage",
      "Express Shipping",
      "Super-Sonic Delivery",
    ],
  },

  // Support
  "customer support": {
    content:
      "Need to speak with our support team? We're here for you! 💪\n• Phone: 1-800-SHIP-NOW (available 24/7)\n• Live Chat: Available on our website Mon-Fri, 7AM-9PM\nWhat's the best way to help you today?",
    quickReplies: ["Call Now", "Send Email", "Common Issues"],
  },

  "common issues": {
    content:
      "Here are some quick fixes for common questions: 🛠️\n• Late delivery? Check for weather delays on our status page\n• Package damaged? Take photos and submit via our claims form\n• Address change? Update within 1 hour of order\n• Billing issue? Our finance team is awesome at sorting those out!\nWhat are you experiencing?",
    quickReplies: ["Late Package", "Damaged Item", "Billing Issue"],
  },

  // Problems
  "late package": {
    content:
      "Oh no! I'm sorry your package is running late! 😟 This can happen due to weather, traffic, or sorting delays. The good news is that 93% of our delayed packages arrive within 24 hours of the original estimate. Would you like me to check on your specific delivery or explain our refund policy for late arrivals?",
    quickReplies: ["Refund Policy", "Talk to Agent", "Package Protection"],
  },

  "damaged item": {
    content:
      "I'm so sorry to hear about your damaged item! 💔 We take this very seriously. Our claims process is super easy: just take clear photos of the damage, the packaging, and provide your order number. We typically process claims within 3-5 business days. Would you like me to guide you through filing a claim now?",
    quickReplies: ["File Claim", "Talk to Agent", "Packaging Tips"],
  },

  // Company Info
  "about us": {
    content:
      "We're LogisticsPro! 🚚✨ Founded in 2015, we've grown from a small local delivery service to a nationwide logistics powerhouse with over 5,000 team members! Our mission is simple: deliver happiness with every package. We're proud to be carbon-neutral since 2022 and support local communities through our Deliver Good program!",
    quickReplies: ["Sustainability", "Careers", "Contact Info"],
  },

  sustainability: {
    content:
      "We're BIG on being green! 🌱 Our fleet includes electric vehicles, we use recycled packaging materials, and we offset 100% of our carbon emissions. We've planted over 50,000 trees through our Deliver & Grow program, and we're working toward zero-waste operations by 2027. Want to learn how you can help with eco-friendly shipping?",
    quickReplies: ["Green Packaging", "Carbon Offset", "Our Green Fleet"],
  },

  // Default responses
  default: {
    content:
      "I'm not quite sure I understand, but I'm eager to help! 🤔 Could you tell me more about what you need assistance with regarding your shipping or deliveries?",
    quickReplies: [
      "Shipping Options",
      "Delivery Times",
      "Customer Support",
      "About Us",
    ],
  },

  thanks: {
    content:
      "You're absolutely welcome! 😊 It's been my pleasure to assist you today! Is there anything else I can help you with regarding your shipping needs?",
    quickReplies: ["I'm Good, Thanks!", "More Questions", "Leave Feedback"],
  },

  goodbye: {
    content:
      "Thanks for chatting with me today! 👋 Remember, we're here 24/7 if you need anything else. Have a fantastic day, and we hope to deliver smiles to your doorstep soon!",
    quickReplies: ["Start New Chat", "Rate This Chat"],
  },

  // ──────────────────────────────────────────────
  // Additional Responses (100+ entries)
  "order tracking": {
    content:
      "You can track your order in real-time using our online tracker. Please provide your order ID to get started.",
    quickReplies: ["Enter Order ID", "View Order History", "Talk to Agent"],
  },
  "tracking update": {
    content:
      "Our system is constantly updating! If you provided an order ID, you should see the latest location and estimated arrival time.",
    quickReplies: ["Refresh", "Contact Support", "More Details"],
  },
  "refund policy": {
    content:
      "We offer a clear refund policy if your package arrives late or is damaged. Would you like to hear the details?",
    quickReplies: ["Yes, please", "No, thanks", "Talk to Agent"],
  },
  "file claim": {
    content:
      "To file a claim for a damaged or lost package, please have your order number and any relevant photos ready.",
    quickReplies: ["File Now", "Need Help", "View Process"],
  },
  "packaging tips": {
    content:
      "Proper packaging can save your items during transit! We recommend sturdy boxes, bubble wrap, and secure tape.",
    quickReplies: ["More Tips", "View Video", "Talk to Agent"],
  },
  returns: {
    content:
      "Our returns process is simple and hassle-free. Would you like to know how to initiate a return?",
    quickReplies: ["Start Return", "Return Policy", "Speak with Agent"],
  },
  "return policy": {
    content:
      "You can return items within 30 days of delivery. Please ensure the items are in their original condition.",
    quickReplies: ["How to Return", "Return Process", "Contact Support"],
  },
  "exchange item": {
    content:
      "Need an exchange? We can help with that too! Let us know the item you’d like to swap and the reason for the exchange.",
    quickReplies: ["Start Exchange", "Exchange Policy", "Talk to Agent"],
  },
  "lost package": {
    content:
      "I’m sorry to hear your package is missing. Please provide your order ID so we can investigate immediately.",
    quickReplies: ["Enter Order ID", "Talk to Agent", "File Claim"],
  },
  "address change": {
    content:
      "Need to update your delivery address? Changes can be made within one hour of placing your order.",
    quickReplies: ["Update Address", "Talk to Agent", "Learn More"],
  },
  "billing issue": {
    content:
      "Billing issues can be frustrating. Please let us know if you need help with a charge, invoice, or payment.",
    quickReplies: ["View Invoice", "Talk to Billing", "Payment Options"],
  },
  "payment methods": {
    content:
      "We accept several payment methods including credit cards, PayPal, and cash on delivery in select regions.",
    quickReplies: ["Credit Card", "PayPal", "Cash on Delivery"],
  },
  "credit card issues": {
    content:
      "Having issues with your credit card payment? Please check with your bank or try a different card.",
    quickReplies: ["Retry Payment", "PayPal", "Talk to Agent"],
  },
  "paypal issues": {
    content:
      "If you're facing problems with PayPal, ensure your account is in good standing or try another payment method.",
    quickReplies: ["Retry Payment", "Credit Card", "Contact Support"],
  },
  "cash on delivery": {
    content:
      "Cash on Delivery is available in select areas. Ensure you have the exact amount ready upon delivery.",
    quickReplies: ["Check Availability", "View Locations", "Talk to Agent"],
  },
  "order cancellation": {
    content:
      "If you need to cancel your order, please do so within 15 minutes of placing it. After that, we may not be able to stop processing.",
    quickReplies: ["Cancel Order", "Contact Support", "Learn More"],
  },
  "invoice request": {
    content:
      "You can request an invoice for your order from your account dashboard or by contacting our support team.",
    quickReplies: ["Go to Dashboard", "Talk to Agent", "Learn More"],
  },
  "pricing inquiry": {
    content:
      "Curious about our pricing? Our rates vary based on shipping speed, distance, and package details.",
    quickReplies: ["Standard Rates", "Express Rates", "Custom Quote"],
  },
  "discount codes": {
    content:
      "We occasionally offer discount codes for our loyal customers. Check our website or subscribe to our newsletter for updates.",
    quickReplies: ["View Promotions", "Subscribe", "Talk to Agent"],
  },
  promotions: {
    content:
      "We run seasonal promotions and flash sales! Keep an eye on our homepage for the latest deals.",
    quickReplies: ["Current Deals", "Subscribe", "Learn More"],
  },
  "corporate shipping": {
    content:
      "For businesses, we offer corporate shipping solutions tailored to your needs, including volume discounts and dedicated support.",
    quickReplies: ["Business Rates", "Contact Sales", "Learn More"],
  },
  "bulk shipping": {
    content:
      "Shipping in bulk? We offer competitive rates for large orders. Please provide your shipment details for a custom quote.",
    quickReplies: ["Enter Details", "Get Quote", "Talk to Sales"],
  },
  "business rates": {
    content:
      "Our business rates are designed for high-volume shippers with flexible options. Contact our corporate team for more info.",
    quickReplies: ["Contact Sales", "Learn More", "Get Quote"],
  },
  "trade compliance": {
    content:
      "We ensure all shipments meet trade compliance regulations. Need details on international shipping laws?",
    quickReplies: ["View Regulations", "Talk to Agent", "Learn More"],
  },
  warehousing: {
    content:
      "Our warehousing services offer secure storage and efficient distribution. Would you like more information on our facilities?",
    quickReplies: ["View Warehouses", "Talk to Agent", "Learn More"],
  },
  fulfillment: {
    content:
      "We provide comprehensive fulfillment services from storage to last-mile delivery. Let us know if you need a custom solution.",
    quickReplies: ["Custom Quote", "Learn More", "Talk to Agent"],
  },
  "cargo shipping": {
    content:
      "For large-scale shipments, our cargo shipping service offers reliable transport by land, air, or sea.",
    quickReplies: ["Air Cargo", "Sea Cargo", "Land Transport"],
  },
  "freight service": {
    content:
      "Our freight services are ideal for heavy or oversized items. Provide your shipment details for a tailored plan.",
    quickReplies: ["Enter Details", "Get Quote", "Talk to Agent"],
  },
  "last-mile delivery": {
    content:
      "Our last-mile delivery ensures your package reaches you on time, even in busy urban areas.",
    quickReplies: ["Check Availability", "Delivery Times", "Talk to Agent"],
  },
  "drone delivery": {
    content:
      "Experience the future with our drone delivery service in select areas. It’s fast and eco-friendly!",
    quickReplies: ["Check Coverage", "Learn More", "Talk to Agent"],
  },
  "contactless delivery": {
    content:
      "For your safety, we offer contactless delivery. Our driver will leave your package at your door.",
    quickReplies: ["Opt In", "Learn More", "Talk to Agent"],
  },
  "pickup service": {
    content:
      "Prefer to pick up your package? We have several pickup locations available. Let us help you find the nearest one.",
    quickReplies: ["Find Location", "View Map", "Talk to Agent"],
  },
  "pickup locations": {
    content:
      "You can view all our pickup locations on our website. Enter your zip code to see the nearest spot.",
    quickReplies: ["Enter Zip Code", "View Map", "Talk to Agent"],
  },
  "reschedule delivery": {
    content:
      "Need to reschedule your delivery? We can help adjust the delivery time to better suit your needs.",
    quickReplies: ["New Time", "Talk to Agent", "Learn More"],
  },
  "delivery instructions": {
    content:
      "If you have any specific delivery instructions (e.g., leave at back door, ring bell), let us know so we can update your order.",
    quickReplies: ["Enter Instructions", "Talk to Agent", "Skip"],
  },
  "signature required": {
    content:
      "For secure deliveries, some packages may require a signature upon arrival. Would you like to enable this option?",
    quickReplies: ["Yes", "No", "Learn More"],
  },
  "live chat support": {
    content:
      "Our live chat support is available on our website for immediate assistance. Just click on the chat icon to connect.",
    quickReplies: ["Start Chat", "Call Now", "Email Support"],
  },
  "agent assistance": {
    content:
      "Need personalized help? An agent is available to walk you through any questions or issues you have.",
    quickReplies: ["Talk to Agent", "Schedule Call", "Leave Message"],
  },
  "technical support": {
    content:
      "For technical issues with our website or tracking system, our tech support team is ready to help.",
    quickReplies: ["Report Issue", "System Status", "Talk to Tech"],
  },
  "mobile app": {
    content:
      "Download our mobile app for easy order tracking, notifications, and more features on the go!",
    quickReplies: ["Download iOS", "Download Android", "Learn More"],
  },
  "app download": {
    content:
      "Our mobile app is available for both iOS and Android. Enjoy real-time updates and convenient management of your orders.",
    quickReplies: ["iOS App", "Android App", "Learn More"],
  },
  "integration guide": {
    content:
      "Developers can integrate our shipping APIs with our comprehensive integration guide available on our website.",
    quickReplies: ["View Guide", "API Docs", "Talk to Dev"],
  },
  "developer support": {
    content:
      "Our developer support team is here to assist with API integration, technical issues, and custom solutions.",
    quickReplies: ["API Docs", "Contact Dev", "Learn More"],
  },
  "api integration": {
    content:
      "Integrate our API into your platform for real-time shipping rates and order tracking. Check out our detailed documentation.",
    quickReplies: ["View Docs", "Contact Dev", "Demo"],
  },
  "system status": {
    content:
      "You can view the current status of all our systems on our status page. We’re committed to transparency and uptime!",
    quickReplies: ["View Status", "Report Issue", "Learn More"],
  },
  "platform updates": {
    content:
      "We regularly update our platform with new features and improvements. Stay tuned for exciting changes!",
    quickReplies: ["Recent Updates", "Roadmap", "Subscribe"],
  },
  "new features": {
    content:
      "Check out our latest features designed to make your shipping experience even smoother. Let us know what you think!",
    quickReplies: ["Feature List", "Beta Program", "Feedback"],
  },
  "beta testing": {
    content:
      "Interested in testing new features before anyone else? Join our beta testing program and help shape our future updates.",
    quickReplies: ["Join Beta", "Learn More", "Feedback"],
  },
  roadmap: {
    content:
      "Our roadmap outlines the upcoming features and improvements. We value your feedback to help prioritize our next steps.",
    quickReplies: ["View Roadmap", "Give Feedback", "Talk to Agent"],
  },
  "user account": {
    content:
      "Manage your orders, addresses, and payment methods easily by accessing your user account. Need help logging in?",
    quickReplies: ["Log In", "Register", "Forgot Password"],
  },
  registration: {
    content:
      "Creating an account is quick and easy. Sign up to enjoy faster checkouts and order tracking.",
    quickReplies: ["Sign Up", "Learn More", "Talk to Agent"],
  },
  "login issues": {
    content:
      "Having trouble logging in? Ensure your credentials are correct or try resetting your password.",
    quickReplies: ["Reset Password", "Help", "Talk to Support"],
  },
  "password reset": {
    content:
      "You can reset your password using the 'Forgot Password' link on the login page. Follow the instructions sent to your email.",
    quickReplies: ["Reset Now", "Go Back", "Talk to Support"],
  },
  "profile update": {
    content:
      "Keep your profile up to date for the best experience. You can update your personal details, addresses, and more.",
    quickReplies: ["Edit Profile", "View Account", "Help"],
  },
  "address book": {
    content:
      "Store multiple delivery addresses in your account for easy ordering. Manage your address book in your profile settings.",
    quickReplies: ["Manage Addresses", "Add New", "Help"],
  },
  "multiple addresses": {
    content:
      "If you ship to multiple locations, you can save all your addresses for quicker checkout. Let us know if you need assistance setting this up.",
    quickReplies: ["Add Address", "Manage Addresses", "Talk to Agent"],
  },
  wishlist: {
    content:
      "Save your favorite shipping options and frequently used settings to your wishlist for a faster checkout next time!",
    quickReplies: ["Save Settings", "View Wishlist", "Learn More"],
  },
  "order history": {
    content:
      "View all your past orders, track their status, and re-order easily from your order history section.",
    quickReplies: ["View History", "Reorder", "Help"],
  },
  reorder: {
    content:
      "If you liked a previous order, you can reorder it with a single click from your order history.",
    quickReplies: ["Reorder Now", "View History", "Talk to Agent"],
  },
  "cart management": {
    content:
      "Manage your shopping cart and ensure all details are correct before proceeding to checkout.",
    quickReplies: ["View Cart", "Edit Cart", "Checkout"],
  },
  "checkout process": {
    content:
      "Our checkout process is streamlined for your convenience. Review your order details and payment options before finalizing.",
    quickReplies: ["Proceed to Payment", "Review Order", "Help"],
  },
  "return process": {
    content:
      "Initiate your return by following our easy step-by-step guide. Please have your order details handy.",
    quickReplies: ["Start Return", "View Policy", "Talk to Agent"],
  },
  "exchange process": {
    content:
      "Our exchange process is straightforward. Let us know which item you’d like to exchange and we’ll guide you through the rest.",
    quickReplies: ["Start Exchange", "View Policy", "Talk to Agent"],
  },
  "customer care": {
    content:
      "Our customer care team is here to help with any questions or issues you may have with your order.",
    quickReplies: ["Contact Care", "FAQs", "Talk to Agent"],
  },
  "shipping query": {
    content:
      "If you have any shipping-related questions, feel free to ask! I'm here to assist with all your logistics queries.",
    quickReplies: ["Ask Question", "View Options", "Talk to Agent"],
  },
  "order inquiry": {
    content:
      "For any inquiries regarding your order, please provide your order ID so we can give you the latest updates.",
    quickReplies: ["Enter Order ID", "Track Order", "Talk to Agent"],
  },
  "delivery exception": {
    content:
      "Sometimes unexpected events occur. If your delivery is marked with an exception, please contact support for further details.",
    quickReplies: ["Contact Support", "View Details", "Talk to Agent"],
  },
  "reschedule order": {
    content:
      "Need to change your delivery time? We can help reschedule your order to a more convenient time.",
    quickReplies: ["Reschedule Now", "Talk to Agent", "Learn More"],
  },
  "out of stock": {
    content:
      "It looks like the item you requested is currently out of stock. Would you like to be notified when it's available again?",
    quickReplies: ["Notify Me", "Browse Alternatives", "Talk to Agent"],
  },
  backorder: {
    content:
      "The item you are interested in is on backorder. We will ship it as soon as it becomes available. Need more info?",
    quickReplies: ["Learn More", "Contact Support", "Browse Alternatives"],
  },
  preorder: {
    content:
      "Preorders are available for select items. Secure your order now and be among the first to receive it!",
    quickReplies: ["Preorder Now", "Learn More", "Talk to Agent"],
  },
  "store locator": {
    content:
      "Find the nearest physical store location to pick up your order. Enter your zip code or city name to get started.",
    quickReplies: ["Enter Location", "View Map", "Help"],
  },
  "installment payments": {
    content:
      "We offer installment payment options for larger orders. Would you like to see the available plans?",
    quickReplies: ["View Plans", "Talk to Finance", "Learn More"],
  },
  "financial services": {
    content:
      "Our financial services team can help with payment plans, credit checks, and more for corporate accounts.",
    quickReplies: ["Contact Finance", "Learn More", "Get Quote"],
  },
  "currency conversion": {
    content:
      "For international orders, our system supports multiple currencies. Check the current conversion rates before you order.",
    quickReplies: ["View Rates", "Currency Converter", "Talk to Agent"],
  },
  "international rates": {
    content:
      "Our international rates vary by destination. Please provide your country of delivery for a custom quote.",
    quickReplies: ["Enter Country", "Get Quote", "Talk to Agent"],
  },
  "destination charges": {
    content:
      "Additional charges may apply for remote or hard-to-reach destinations. Would you like more information?",
    quickReplies: ["Learn More", "Get Quote", "Talk to Agent"],
  },
  "duty fees": {
    content:
      "For international shipments, duty fees might apply based on your country's import regulations.",
    quickReplies: ["View Details", "Learn More", "Talk to Agent"],
  },
  "VAT information": {
    content:
      "Our invoices include VAT where applicable. For detailed VAT information, please check your invoice or contact our finance team.",
    quickReplies: ["View Invoice", "Talk to Finance", "Learn More"],
  },
  "sales tax inquiry": {
    content:
      "Sales tax is calculated based on your delivery location. Would you like to see an estimate for your area?",
    quickReplies: ["Enter Zip Code", "Learn More", "Talk to Agent"],
  },
  "customs clearance": {
    content:
      "For international shipments, customs clearance is handled by our experts to ensure smooth delivery.",
    quickReplies: ["Customs Info", "Learn More", "Talk to Agent"],
  },
  "compliance support": {
    content:
      "Our compliance team ensures that all shipments adhere to international trade laws. Need help with compliance queries?",
    quickReplies: ["Contact Compliance", "Learn More", "Talk to Agent"],
  },
  "logistics updates": {
    content:
      "Stay updated with real-time logistics updates and notifications on your shipment status.",
    quickReplies: ["Subscribe", "View Updates", "Talk to Agent"],
  },
  "service outage": {
    content:
      "We are aware of the current service outage and are working diligently to restore full functionality. Thank you for your patience!",
    quickReplies: ["View Status", "Contact Support", "Learn More"],
  },
  "tracking history": {
    content:
      "You can view your order's tracking history for a detailed timeline of your shipment's journey.",
    quickReplies: ["View History", "Track Order", "Talk to Agent"],
  },
  "driver rating": {
    content:
      "We value feedback on our drivers. Please rate your delivery experience to help us improve our service.",
    quickReplies: ["Rate Now", "Feedback", "Skip"],
  },
  "customer testimonials": {
    content:
      "Hear what our satisfied customers have to say about our speedy and reliable shipping services!",
    quickReplies: ["View Testimonials", "Submit Feedback", "Talk to Agent"],
  },
  "security check": {
    content:
      "Our delivery process includes thorough security checks to ensure your package arrives safely.",
    quickReplies: ["Learn More", "View Process", "Talk to Agent"],
  },
  "quality control": {
    content:
      "We pride ourselves on excellent quality control at every stage of shipping. Let us know if you have any concerns.",
    quickReplies: ["View Process", "Talk to Agent", "Learn More"],
  },
  "operating hours": {
    content:
      "Our customer support and shipping operations run 24/7 to serve you better. How can we assist you now?",
    quickReplies: ["Talk to Agent", "FAQs", "View Hours"],
  },
  "custom orders": {
    content:
      "Have a unique shipping need? We handle custom orders with special care. Let’s discuss your requirements.",
    quickReplies: ["Discuss Now", "View Options", "Talk to Agent"],
  },
  "logistics technology": {
    content:
      "We use state-of-the-art logistics technology to ensure efficiency and real-time tracking for all shipments.",
    quickReplies: ["Learn More", "View Tech", "Talk to Agent"],
  },
  "software integration": {
    content:
      "Our software integrates seamlessly with your e-commerce platform. Ask us about our integration solutions.",
    quickReplies: ["API Docs", "Integration Guide", "Talk to Dev"],
  },
  "system integration": {
    content:
      "For businesses, our system integration services help streamline your shipping and inventory processes.",
    quickReplies: ["Learn More", "Contact Sales", "View Options"],
  },
  "API access": {
    content:
      "Gain access to our powerful shipping API for real-time rates, tracking, and more. Documentation is available online.",
    quickReplies: ["View Docs", "Get API Key", "Talk to Dev"],
  },
  "platform integration": {
    content:
      "Our platform easily integrates with various e-commerce solutions, ensuring a smooth checkout experience.",
    quickReplies: ["Learn More", "View Guide", "Talk to Agent"],
  },
  "developer API": {
    content:
      "Developers can leverage our API for custom shipping solutions. Full documentation and support are available.",
    quickReplies: ["View Docs", "Contact Dev", "Demo"],
  },
  "shipping insurance": {
    content:
      "Protect your shipment with our shipping insurance options. Would you like to see available plans?",
    quickReplies: ["View Plans", "Get Quote", "Talk to Agent"],
  },
  "claims process": {
    content:
      "If you need to file a claim, please follow our easy step-by-step process and have your order details handy.",
    quickReplies: ["Start Claim", "Learn More", "Talk to Agent"],
  },
  "damaged package claim": {
    content:
      "For damaged packages, please provide photos and your order number so we can expedite your claim.",
    quickReplies: ["File Claim", "Need Help", "Talk to Agent"],
  },
  "lost package support": {
    content:
      "If your package is lost, please contact us with your order ID so we can track it down for you.",
    quickReplies: ["Enter Order ID", "Contact Support", "Talk to Agent"],
  },
  "tracking issues": {
    content:
      "If you’re experiencing issues with tracking, please refresh the page or contact our support for assistance.",
    quickReplies: ["Refresh", "Contact Support", "Learn More"],
  },
  "delayed shipping": {
    content:
      "We apologize for any delays. Please check your tracking details or contact support for an update on your shipment.",
    quickReplies: ["View Tracking", "Contact Support", "Learn More"],
  },
  "express delivery issues": {
    content:
      "If you're having issues with Express Shipping, please provide your order ID so we can look into the matter.",
    quickReplies: ["Enter Order ID", "Contact Support", "Learn More"],
  },
  "standard delivery concerns": {
    content:
      "For concerns about Standard Shipping, please let us know your order details and we’ll resolve the issue.",
    quickReplies: ["Enter Order ID", "Contact Support", "Learn More"],
  },
  "super-sonic delivery concerns": {
    content:
      "Experiencing issues with Super-Sonic Delivery? Our team is here to help. Please provide your order ID for assistance.",
    quickReplies: ["Enter Order ID", "Talk to Agent", "Learn More"],
  },
  "international shipping support": {
    content:
      "For international shipments, our dedicated team ensures smooth customs clearance and delivery. How can we help?",
    quickReplies: ["Customs Info", "Tracking", "Talk to Agent"],
  },
  "customs info": {
    content:
      "Need information on customs procedures? We can help explain import duties, documentation, and clearance times.",
    quickReplies: ["Learn More", "Talk to Agent", "View Guidelines"],
  },
  "restricted items info": {
    content:
      "Certain items are restricted for international shipping. Please check our guidelines or ask for details on your specific item.",
    quickReplies: ["View Guidelines", "Talk to Agent", "Learn More"],
  },
  "fragile items handling": {
    content:
      "For fragile items, we recommend additional packaging and care. Let us know if you need extra protection for your shipment.",
    quickReplies: ["Extra Packaging", "Learn More", "Talk to Agent"],
  },
  "perishable goods shipping": {
    content:
      "Shipping perishable goods? Our specialized services ensure your items remain fresh and safe during transit.",
    quickReplies: ["View Options", "Talk to Agent", "Learn More"],
  },
  "food delivery": {
    content:
      "Our food delivery service is designed to keep your items at the perfect temperature. Let us know your delivery needs.",
    quickReplies: ["Order Now", "View Options", "Talk to Agent"],
  },
  "pet supplies shipping": {
    content:
      "We understand the importance of timely delivery for pet supplies. Ask us about our specialized service for pet products.",
    quickReplies: ["View Options", "Talk to Agent", "Learn More"],
  },
  "gift shipping": {
    content:
      "Send a smile with our gift shipping service! We offer special packaging and timely delivery to make every gift memorable.",
    quickReplies: ["Order Gift", "Learn More", "Talk to Agent"],
  },
  "special handling instructions": {
    content:
      "If your shipment requires special handling, please provide clear instructions so we can ensure a safe delivery.",
    quickReplies: ["Enter Instructions", "Talk to Agent", "Learn More"],
  },
  "logistics optimization": {
    content:
      "Our logistics optimization services help streamline your supply chain, saving time and reducing costs. Interested?",
    quickReplies: ["Learn More", "Contact Sales", "View Options"],
  },
  "delivery optimization": {
    content:
      "We use advanced algorithms to optimize delivery routes and times. Ask us how we can improve your shipping efficiency.",
    quickReplies: ["Learn More", "Talk to Agent", "View Tech"],
  },
  "routing algorithm": {
    content:
      "Our state-of-the-art routing algorithm ensures the fastest and most efficient delivery routes for your packages.",
    quickReplies: ["Learn More", "View Process", "Talk to Agent"],
  },
  "real-time tracking": {
    content:
      "Experience real-time tracking of your shipments with our advanced system. Enter your order ID to begin.",
    quickReplies: ["Enter Order ID", "View Tracking", "Talk to Agent"],
  },
  "digital notifications": {
    content:
      "Stay informed with digital notifications via SMS, email, or push alerts. Customize your notification preferences in your account.",
    quickReplies: ["Set Preferences", "Learn More", "Talk to Agent"],
  },
  "SMS alerts": {
    content:
      "Enable SMS alerts for instant updates on your delivery status and important notifications.",
    quickReplies: ["Enable SMS", "Learn More", "Talk to Agent"],
  },
  "email alerts": {
    content:
      "We offer email alerts to keep you updated on your order status and delivery changes. Would you like to enable this?",
    quickReplies: ["Enable Email", "Learn More", "Talk to Agent"],
  },
  "push notifications": {
    content:
      "Our mobile app provides push notifications so you never miss an update. Download the app for a smoother experience.",
    quickReplies: ["Download App", "Learn More", "Talk to Agent"],
  },
  "communication preferences": {
    content:
      "Set your preferred method of communication for delivery updates, promotions, and support.",
    quickReplies: ["SMS", "Email", "Push Notifications"],
  },
  "support ticket": {
    content:
      "If your issue requires detailed attention, please submit a support ticket through our website. Our team will get back to you shortly.",
    quickReplies: ["Submit Ticket", "Talk to Agent", "Learn More"],
  },
  "feedback submission": {
    content:
      "We value your feedback! Let us know how we did today and how we can improve our services.",
    quickReplies: ["Submit Feedback", "Rate Chat", "Skip"],
  },
  "reviews and ratings": {
    content:
      "Check out reviews and ratings from our satisfied customers, or leave your own feedback about your experience.",
    quickReplies: ["View Reviews", "Leave Rating", "Learn More"],
  },
  "service improvement": {
    content:
      "Your feedback helps us improve. Tell us what you loved or what we could do better with our services.",
    quickReplies: ["Leave Feedback", "Talk to Agent", "Skip"],
  },
  "corporate accounts": {
    content:
      "For tailored shipping solutions and exclusive benefits, ask about our corporate accounts.",
    quickReplies: ["Learn More", "Contact Sales", "Get Quote"],
  },
  "B2B shipping": {
    content:
      "We offer specialized B2B shipping services with competitive rates and dedicated support. Let’s talk about your business needs.",
    quickReplies: ["Contact Sales", "Learn More", "Get Quote"],
  },
  "bulk discounts": {
    content:
      "Enjoy attractive bulk discounts when shipping large quantities. Provide your shipment details for a custom quote.",
    quickReplies: ["Get Quote", "Enter Details", "Talk to Sales"],
  },
  "international trade": {
    content:
      "Our international trade solutions cover customs, duties, and efficient shipping across borders. Interested?",
    quickReplies: ["Learn More", "Contact Sales", "Get Quote"],
  },
  "trade support": {
    content:
      "Need help with trade regulations or compliance? Our experts are here to support your international shipping needs.",
    quickReplies: ["Talk to Agent", "Learn More", "Contact Support"],
  },
  "freight forwarding": {
    content:
      "Our freight forwarding service ensures your large shipments move smoothly from origin to destination.",
    quickReplies: ["Get Quote", "Learn More", "Talk to Agent"],
  },
  "cargo tracking": {
    content:
      "Track your cargo shipments with our dedicated tracking system, ensuring transparency at every step.",
    quickReplies: ["Enter Order ID", "View Tracking", "Talk to Agent"],
  },
  "warehouse management": {
    content:
      "Our warehouse management services include secure storage, efficient inventory, and timely distribution.",
    quickReplies: ["Learn More", "View Options", "Contact Sales"],
  },
  "inventory management": {
    content:
      "Stay on top of your stock with our inventory management tools, integrated seamlessly with our shipping system.",
    quickReplies: ["Learn More", "View Dashboard", "Talk to Agent"],
  },
  "order fulfillment": {
    content:
      "Our order fulfillment service covers everything from storage to final delivery, ensuring a seamless process.",
    quickReplies: ["Learn More", "Get Quote", "Talk to Agent"],
  },
  "supply chain management": {
    content:
      "We offer comprehensive supply chain management services to optimize your entire logistics process.",
    quickReplies: ["Learn More", "Contact Sales", "View Options"],
  },
  "logistics management": {
    content:
      "Our logistics management services ensure that every step of your shipping process is efficient and transparent.",
    quickReplies: ["Learn More", "Contact Sales", "View Options"],
  },
  "transport management": {
    content:
      "From road to rail, our transport management solutions streamline the movement of goods efficiently.",
    quickReplies: ["Learn More", "Contact Sales", "View Options"],
  },
  "driver tracking": {
    content:
      "Our advanced driver tracking system ensures that you’re always updated on your delivery status.",
    quickReplies: ["View Tracking", "Learn More", "Talk to Agent"],
  },
  "dispatch system": {
    content:
      "Our dispatch system optimizes driver allocation and delivery routes in real time for maximum efficiency.",
    quickReplies: ["Learn More", "View Process", "Talk to Agent"],
  },
  "route planning": {
    content:
      "We use smart route planning to ensure that deliveries are both timely and fuel-efficient.",
    quickReplies: ["Learn More", "View Routes", "Talk to Agent"],
  },
  "fuel efficiency": {
    content:
      "Our initiatives focus on fuel efficiency to reduce costs and environmental impact across our delivery fleet.",
    quickReplies: ["Learn More", "View Initiatives", "Talk to Agent"],
  },
  "environmental impact": {
    content:
      "We continuously work to reduce our environmental impact through green initiatives and efficient logistics.",
    quickReplies: ["Green Packaging", "Carbon Offset", "Learn More"],
  },
  "green packaging": {
    content:
      "Our green packaging solutions use recycled materials and eco-friendly processes to protect the planet.",
    quickReplies: ["View Options", "Learn More", "Talk to Agent"],
  },
  "carbon footprint reduction": {
    content:
      "We are committed to reducing our carbon footprint through optimized routes and sustainable practices.",
    quickReplies: ["Learn More", "View Initiatives", "Talk to Agent"],
  },
  "sustainability initiatives": {
    content:
      "Our sustainability initiatives include using electric vehicles, green packaging, and supporting tree planting programs.",
    quickReplies: ["Learn More", "View Initiatives", "Talk to Agent"],
  },
  "corporate social responsibility": {
    content:
      "Our CSR efforts support local communities and promote environmental sustainability. Learn more about our Deliver Good program.",
    quickReplies: ["Learn More", "View Program", "Talk to Agent"],
  },
  "community support": {
    content:
      "We actively support communities through local partnerships and charitable initiatives. Interested in our community programs?",
    quickReplies: ["Learn More", "View Programs", "Talk to Agent"],
  },
  "employee program": {
    content:
      "Our employee programs focus on growth, training, and well-being. Ask us about career opportunities at LogisticsPro!",
    quickReplies: ["View Careers", "Learn More", "Contact HR"],
  },
  "partner program": {
    content:
      "We value our partners! Our partner program offers exclusive benefits and dedicated support for collaboration.",
    quickReplies: ["Learn More", "Join Now", "Contact Sales"],
  },
  "service guarantee": {
    content:
      "We stand by our service guarantee. If your package is delayed or damaged, we’ll make it right.",
    quickReplies: ["View Policy", "Talk to Agent", "Learn More"],
  },
  "satisfaction guarantee": {
    content:
      "Your satisfaction is our top priority. If you're not happy, let us know and we'll work to resolve any issues.",
    quickReplies: ["Contact Support", "View Policy", "Talk to Agent"],
  },
  "loyalty program": {
    content:
      "Join our loyalty program to earn rewards on every shipment and enjoy exclusive benefits.",
    quickReplies: ["Join Now", "Learn More", "View Rewards"],
  },
  "referral program": {
    content:
      "Love our service? Refer a friend and enjoy discounts on your next shipment with our referral program!",
    quickReplies: ["Refer Now", "Learn More", "View Rewards"],
  },
  "customer rewards": {
    content:
      "Earn rewards every time you ship with us! Check out your rewards dashboard to see your points.",
    quickReplies: ["View Rewards", "Learn More", "Talk to Agent"],
  },
  "membership benefits": {
    content:
      "Our membership offers exclusive rates, priority support, and other special benefits. Interested?",
    quickReplies: ["Join Membership", "View Benefits", "Learn More"],
  },
  "VIP shipping": {
    content:
      "Experience VIP shipping with priority handling, exclusive tracking, and personalized service.",
    quickReplies: ["Learn More", "Sign Up", "Talk to Agent"],
  },
  "priority support": {
    content:
      "Our priority support team is available for urgent issues and premium members. Need immediate assistance?",
    quickReplies: ["Contact Now", "Learn More", "Talk to Agent"],
  },
  "event shipping": {
    content:
      "Shipping for events is our specialty. We offer special rates and handling for conferences, festivals, and more.",
    quickReplies: ["Get Quote", "Learn More", "Talk to Agent"],
  },
  "seasonal shipping": {
    content:
      "During peak seasons, we offer tailored shipping options to handle high demand. Ask us for seasonal rates!",
    quickReplies: ["View Options", "Get Quote", "Learn More"],
  },
  "holiday shipping": {
    content:
      "Ensure your gifts arrive on time with our dedicated holiday shipping services. Plan ahead to avoid delays!",
    quickReplies: ["Plan Now", "Get Quote", "Learn More"],
  },
  "festive delivery": {
    content:
      "Make your celebrations extra special with our festive delivery options, complete with gift wrapping and custom messages.",
    quickReplies: ["Order Gift", "Learn More", "Talk to Agent"],
  },
  "celebration shipping": {
    content:
      "Celebrate in style! Our celebration shipping services offer unique packaging and special handling for your festive needs.",
    quickReplies: ["Learn More", "Order Now", "Talk to Agent"],
  },
  "custom packaging": {
    content:
      "Personalize your shipment with our custom packaging options. Choose colors, designs, and add a personal touch!",
    quickReplies: ["View Options", "Customize", "Talk to Agent"],
  },
  "branded delivery": {
    content:
      "Enhance your brand with our branded delivery service, offering custom packaging and vehicle branding options.",
    quickReplies: ["Learn More", "View Options", "Talk to Sales"],
  },
  "marketing support": {
    content:
      "Our marketing team can help promote your business through strategic shipping partnerships and co-branding opportunities.",
    quickReplies: ["Contact Marketing", "Learn More", "View Options"],
  },
  "data analytics": {
    content:
      "Leverage our data analytics tools to gain insights into your shipping performance and customer satisfaction.",
    quickReplies: ["View Dashboard", "Learn More", "Talk to Agent"],
  },
  "performance metrics": {
    content:
      "We provide detailed performance metrics to help you monitor shipping efficiency, delivery times, and customer feedback.",
    quickReplies: ["View Metrics", "Learn More", "Talk to Agent"],
  },
  "tracking analytics": {
    content:
      "Our tracking analytics tools offer insights into your shipment’s journey and performance across different regions.",
    quickReplies: ["View Analytics", "Learn More", "Talk to Agent"],
  },
  "shipment analytics": {
    content:
      "Access in-depth shipment analytics to optimize your logistics and improve delivery performance over time.",
    quickReplies: ["View Analytics", "Learn More", "Talk to Agent"],
  },
  "delivery analytics": {
    content:
      "Analyze delivery performance with our comprehensive analytics suite. Get real-time data on delivery times and efficiency.",
    quickReplies: ["View Analytics", "Learn More", "Talk to Agent"],
  },
  "operational efficiency": {
    content:
      "We continuously work on improving operational efficiency through technology and process optimization. Would you like to learn more?",
    quickReplies: ["Learn More", "View Process", "Talk to Agent"],
  },
  "risk management": {
    content:
      "Our risk management strategies ensure that any issues are addressed quickly and efficiently to minimize disruption.",
    quickReplies: ["Learn More", "Talk to Agent", "View Options"],
  },
  "safety protocols": {
    content:
      "Safety is our top priority. Our strict safety protocols ensure secure handling and delivery of every package.",
    quickReplies: ["View Protocols", "Learn More", "Talk to Agent"],
  },
  "emergency support": {
    content:
      "In case of an emergency, our dedicated support team is available around the clock to resolve any critical issues.",
    quickReplies: ["Contact Now", "Learn More", "Talk to Agent"],
  },
};

export default function ChatWidget() {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();

      // Show welcome message on first open
      if (isFirstInteraction) {
        setIsTyping(true);
        setTimeout(() => {
          addBotMessage(responseMap.greeting);
          setIsTyping(false);
          setIsFirstInteraction(false);
        }, 1000);
      }
    }
  }, [isOpen, isFirstInteraction]);

  const addBotMessage = (response: BotResponse) => {
    const newBotMessage: ChatMessage = {
      id: Date.now().toString(),
      content: response.content,
      type: "bot",
      timestamp: new Date(),
      quickReplies: response.quickReplies,
    };

    setMessages((prev) => [...prev, newBotMessage]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!content.trim()) return;

    const userMessage = content.trim();

    // Add user message to chat
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userMessage,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setContent("");

    // Simulate bot typing
    setIsTyping(true);

    // Process message with delay to simulate thinking
    setTimeout(() => {
      handleBotResponse(userMessage);
      setIsTyping(false);
    }, Math.random() * 1000 + 700); // Random delay between 700-1700ms for natural feel
  };

  const handleBotResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();

    // Check for greetings
    if (lowerMsg.match(/^(hi|hello|hey|howdy|sup|yo|greetings).*/i)) {
      addBotMessage(responseMap.greeting);
      return;
    }

    if (lowerMsg.match(/(how much|cost|price|rate).* (ship|deliver|send)/i)) {
      addBotMessage(responseMap.shipping_prices);
      return;
    }

    if (lowerMsg.match(/(how long|when will|time|arrive|delivery estimate)/i)) {
      addBotMessage(responseMap.delivery_times);
      return;
    }

    if (lowerMsg.match(/(damage|broken|broke|smashed|crushed)/i)) {
      addBotMessage(responseMap.damaged_item);
      return;
    }

    if (lowerMsg.match(/(change|update|wrong).* (address|location)/i)) {
      addBotMessage(responseMap.address_change);
      return;
    }

    if (lowerMsg.match(/(cancel|stop).* (order|delivery|shipment)/i)) {
      addBotMessage(responseMap.order_cancellation);
      return;
    }

    if (lowerMsg.match(/(international|overseas|another country|global)/i)) {
      addBotMessage(responseMap.international_shipping);
      return;
    }

    if (lowerMsg.match(/(leave|instructions|note|request|special delivery)/i)) {
      addBotMessage(responseMap.delivery_instructions);
      return;
    }
    if (lowerMsg.match(/track/)) {
      addBotMessage({
        content:
          "Let's track your package! 📍 Could you share your tracking number or order ID?",
        quickReplies: [
          "Where's my tracking#?",
          "Maybe later",
          "Contact support",
        ],
      });
      return;
    }

    if (lowerMsg.match(/(urgent|asap|quick|fast)/)) {
      addBotMessage({
        content:
          "Emergency mode activated! 🚨 Let's explore:\n1. Same-day delivery\n2. Priority handling\n3. Express options\nWhich lifesaving service do you need?",
        quickReplies: [
          "Same-day!",
          "Express shipping",
          "What's fastest?",
          "Nevermind",
        ],
      });
      return;
    }

    // Check for thanks
    if (lowerMsg.match(/(thank you|thanks|thx|ty|appreciate it|grateful).*/i)) {
      addBotMessage(responseMap.thanks);
      return;
    }

    // Check for goodbyes
    if (lowerMsg.match(/(bye|goodbye|see you|farewell|end chat).*/i)) {
      addBotMessage(responseMap.goodbye);
      return;
    }

    // Check for specific keywords
    for (const [key, response] of Object.entries(responseMap)) {
      // Skip special entries
      if (["greeting", "default", "thanks", "goodbye"].includes(key)) continue;

      if (lowerMsg.includes(key.toLowerCase())) {
        addBotMessage(response);
        return;
      }
    }

    // Default response if no matches
    addBotMessage(responseMap.default);
  };

  const handleQuickReply = (reply: string) => {
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: reply,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Handle reply with bot response
    setIsTyping(true);

    setTimeout(() => {
      const lowerReply = reply.toLowerCase();

      // Find matching response or use default
      let matched = false;
      for (const [key, response] of Object.entries(responseMap)) {
        if (lowerReply.includes(key.toLowerCase())) {
          addBotMessage(response);
          matched = true;
          break;
        }
      }

      if (!matched) {
        addBotMessage(responseMap.default);
      }

      setIsTyping(false);
    }, Math.random() * 800 + 600); // Random delay between 600-1400ms
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Bot personality animations
  const BotAvatar = () => (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Bot className="h-5 w-5 text-blue-600 animate-bounce" />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-10 right-5 flex flex-col items-end z-50">
      {/* Chat widget toggle button */}
      <div className="flex items-center gap-3">
        {!isOpen ? (
          <div
            className="px-4 py-3 bg-secondary text-white rounded-2xl shadow-2xl cursor-pointer hover:bg-secondary/80 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-base font-medium">Chat with Zippy! 💬</span>
          </div>
        ) : null}

        {!isOpen && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-secondary text-white rounded-full p-4 hover:bg-secondary/80 transition-all shadow-2xl cursor-pointer animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <MessageCircle fill="white" />
            </button>
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="mt-3 bg-white rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden flex flex-col border border-gray-200 max-h-[500px]">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full p-2 flex items-center justify-center relative">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold">Zippy</h3>
                  <p className="text-xs text-blue-50">Logistics Assistant</p>
                </div>
              </div>
              <button
                className="p-1.5 bg-transparent hover:bg-blue-500 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat content */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 min-h-80">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  {message.type === "user" ? (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                  ) : (
                    <BotAvatar />
                  )}

                  {/* Message content */}
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 inline-block",
                        message.type === "user"
                          ? "bg-secondary text-white rounded-tr-none"
                          : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                      )}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </span>

                    {/* Quick Replies */}
                    {message.type === "bot" && message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-3 py-1 text-sm transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <BotAvatar />
                  <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm inline-block">
                    <div className="flex space-x-1 items-center h-5">
                      <div
                        className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference for scrolling to bottom */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center space-x-2"
            >
              <Input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border"
                ref={inputRef}
              />
              <Button
                size="icon"
                type="submit"
                disabled={content.trim() === ""}
                className="bg-top-header hover:bg-top-header/70"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
