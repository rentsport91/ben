import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import {
  CheckCircle,
  Clock,
  Map,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mt-12">
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/about-team.jpg"
                  alt="Our logistics team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              <p className="text-primary-text font-semibold uppercase text-sm md:text-base">
                About Our Company
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                Delivering Excellence Across The Globe
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                We are a global logistics company dedicated to providing fast,
                reliable, and secure shipping solutions for businesses and
                individuals worldwide. With decades of experience in the
                industry, we&apos;ve built a reputation for excellence through
                our commitment to quality service and customer satisfaction.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-medium">Secure Packaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-medium">Global Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
              <button className="mt-4 font-semibold px-6 py-3 bg-primary-text text-white rounded shadow-lg hover:bg-opacity-90 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-text">
                25+
              </h3>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-text">
                250+
              </h3>
              <p className="text-gray-600 mt-2">Delivery Partners</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-text">
                120+
              </h3>
              <p className="text-gray-600 mt-2">Countries Served</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-text">
                9.5M+
              </h3>
              <p className="text-gray-600 mt-2">Packages Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary-text font-semibold uppercase text-sm md:text-base mb-3">
              Our Mission & Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Driven By Excellence, Guided By Purpose
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-secondary">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To connect the world through reliable logistics solutions that
                empower businesses and individuals to reach new heights. We
                strive to make global shipping accessible, efficient, and
                sustainable for everyone.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-primary-text">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the world&apos;s most trusted logistics partner, known for
                innovation, reliability, and customer-centric solutions. We aim
                to set new standards in the industry through technology and
                sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary-text font-semibold uppercase text-sm md:text-base mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Comprehensive Logistics Solutions
            </h2>
            <p className="text-gray-600 mt-4">
              We provide end-to-end logistics services tailored to meet the
              unique needs of our diverse clientele.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Truck className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Express Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Fast and reliable delivery services for time-sensitive
                shipments, with real-time tracking and delivery guarantees.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Map className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Global Shipping
              </h3>
              <p className="text-gray-600 text-sm">
                International shipping solutions with customs clearance support,
                allowing you to reach customers worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <ShieldCheck className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Secure Handling
              </h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art security measures to ensure your valuable
                packages are protected throughout transit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Clock className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Scheduled Deliveries
              </h3>
              <p className="text-gray-600 text-sm">
                Planned recurring delivery services for businesses with regular
                shipping needs and contractual requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Phone className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Customer Support
              </h3>
              <p className="text-gray-600 text-sm">
                24/7 customer assistance for tracking inquiries, issue
                resolution, and general support for all your shipping needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-primary-text/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <CheckCircle className="text-primary-text h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Custom Solutions
              </h3>
              <p className="text-gray-600 text-sm">
                Tailored logistics solutions designed to meet your specific
                business requirements and unique challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary-text font-semibold uppercase text-sm md:text-base mb-3">
              Our Leadership
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Meet The Team
            </h2>
            <p className="text-gray-600 mt-4">
              Our experienced leadership team brings decades of industry
              expertise to deliver innovative logistics solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <div
                key={member}
                className="bg-white rounded-xl overflow-hidden shadow-md group"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={`/images/team-member-${member}.jpg`}
                    alt={`Team member ${member}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-800">
                    Team Member {member}
                  </h3>
                  <p className="text-primary-text text-sm">
                    Leadership Position
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-text py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Ship with Confidence?
              </h2>
              <p className="text-white/80">
                Join thousands of satisfied customers who trust us with their
                shipping needs. Contact us today to discuss your logistics
                requirements.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-primary-text px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                Get a Quote
              </button>
              <button className="bg-secondary text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
