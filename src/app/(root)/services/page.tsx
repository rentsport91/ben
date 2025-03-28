"use client";

import {
  Truck,
  Globe,
  Plane,
  Ship as ShipIcon,
  Warehouse,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Service type definition
type ServiceType = {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  color: string;
};

const services: ServiceType[] = [
  {
    icon: Truck,
    title: "Ground Shipping",
    description:
      "Reliable and cost-effective ground transportation for your packages.",
    details: [
      "Nationwide coverage",
      "Flexible delivery options",
      "Tracking and real-time updates",
      "Suitable for most package sizes",
    ],
    color: "text-blue-600",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast and efficient international air shipping solutions.",
    details: [
      "Global air transportation",
      "Expedited shipping options",
      "Climate-controlled transport",
      "Ideal for time-sensitive shipments",
    ],
    color: "text-red-600",
  },
  {
    icon: ShipIcon,
    title: "Ocean Freight",
    description: "Comprehensive international maritime shipping services.",
    details: [
      "Full container and less-than-container loads",
      "Intercontinental shipping",
      "Competitive pricing",
      "End-to-end logistics support",
    ],
    color: "text-green-600",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure storage and inventory management solutions.",
    details: [
      "Climate-controlled facilities",
      "Inventory tracking",
      "Custom storage solutions",
      "24/7 security monitoring",
    ],
    color: "text-purple-600",
  },
];

const additionalServices = [
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive shipping insurance for peace of mind.",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Guaranteed same-day and next-day shipping options.",
  },
  {
    icon: Zap,
    title: "Custom Clearance",
    description: "Smooth international shipping and customs processing.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Comprehensive Logistics Solutions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We offer end-to-end shipping and logistics services tailored to meet
          your unique business and personal shipping needs.
        </p>
      </div>

      {/* Main Services Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {services.map((service) => (
          <Card
            key={service.title}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <service.icon className={`h-12 w-12 ${service.color}`} />
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 text-sm">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-secondary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Additional Services Section */}
      <Tabs defaultValue="international" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Additional Logistics Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our range of specialized shipping and logistics solutions
            designed to meet diverse shipping requirements.
          </p>
        </div>

        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="domestic">Domestic</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
        </TabsList>

        <TabsContent value="international" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service) => (
              <Card
                key={service.title}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <service.icon className="h-12 w-12 text-secondary" />
                  <div>
                    <h4 className="text-lg font-semibold">{service.title}</h4>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="domestic">
          <div className="text-center p-12 bg-accent/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Nationwide Domestic Shipping
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our domestic shipping services cover every corner of the country,
              ensuring reliable and efficient delivery for businesses and
              individuals.
            </p>
            <Button className="mt-6 bg-secondary hover:bg-secondary/80">
              Get Domestic Rates
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="specialized">
          <div className="text-center p-12 bg-accent/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Custom Logistics Solutions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer tailored logistics solutions for unique shipping
              requirements, including hazardous materials, temperature-sensitive
              goods, and high-value shipments.
            </p>
            <Button className="mt-6 bg-secondary hover:bg-secondary/80">
              Contact Specialized Services
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="bg-secondary text-white py-16 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Our logistics experts are ready to help you find the perfect shipping
          solution for your unique needs.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className=" hover:bg-secondary text-top-header hover:text-white cursor-pointer"
            asChild
          >
            <Link href="/ship">Request a Quote</Link>
          </Button>
          <Button
            variant="default"
            className="bg-white text-secondary hover:bg-white/90"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
