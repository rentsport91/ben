"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  CalendarRange,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// Mock data for shipments
const mockShipments = [
  {
    id: "ES42851",
    status: "delivered",
    origin: "London, UK",
    destination: "Paris, France",
    date: "Feb 15, 2025",
    eta: "Feb 17, 2025",
    delivered: "Feb 17, 2025",
    items: 3,
    weight: "5.2 kg",
    type: "Standard",
    value: "$245.00",
    lastUpdate: "Package delivered to recipient",
    recipient: {
      name: "Marie Laurent",
      avatar: "/images/avatar-female.png",
    },
  },
  {
    id: "ES42855",
    status: "in-transit",
    origin: "Berlin, Germany",
    destination: "Madrid, Spain",
    date: "Mar 18, 2025",
    eta: "Mar 21, 2025",
    delivered: null,
    items: 1,
    weight: "12.8 kg",
    type: "Express",
    value: "$520.00",
    lastUpdate: "Package in transit - Barcelona hub",
    recipient: {
      name: "Carlos Vega",
      avatar: "/images/avatar-male.png",
    },
  },
  {
    id: "ES42860",
    status: "processing",
    origin: "Amsterdam, Netherlands",
    destination: "Rome, Italy",
    date: "Mar 20, 2025",
    eta: "Mar 23, 2025",
    delivered: null,
    items: 2,
    weight: "3.5 kg",
    type: "Standard",
    value: "$175.00",
    lastUpdate: "Package registered, awaiting pickup",
    recipient: {
      name: "Giulia Romano",
      avatar: "/images/avatar-female.png",
    },
  },
  {
    id: "ES42866",
    status: "delayed",
    origin: "Prague, Czech Republic",
    destination: "Vienna, Austria",
    date: "Mar 15, 2025",
    eta: "Mar 19, 2025",
    delivered: null,
    items: 1,
    weight: "8.2 kg",
    type: "Standard",
    value: "$320.00",
    lastUpdate: "Delivery delayed due to weather conditions",
    recipient: {
      name: "Thomas Müller",
      avatar: "/images/avatar-male.png",
    },
  },
];

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter shipments based on search, tab and status
  const filteredShipments = mockShipments.filter((shipment) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && shipment.status !== "delivered") ||
      (activeTab === "delivered" && shipment.status === "delivered");

    // Status filter
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;

    return matchesSearch && matchesTab && matchesStatus;
  });

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle size={14} className="mr-1" />,
        };
      case "in-transit":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Truck size={14} className="mr-1" />,
        };
      case "processing":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <Clock size={14} className="mr-1" />,
        };
      case "delayed":
        return {
          color: "bg-amber-100 text-amber-800",
          icon: <AlertTriangle size={14} className="mr-1" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Package size={14} className="mr-1" />,
        };
    }
  };

  return (
    <motion.div
      className="container mx-auto py-8 px-4 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Shipments</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your shipments in one place
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-secondary hover:bg-secondary hover:opacity-70">
          <Package className="mr-2 h-4 w-4" /> Create New Shipment
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by ID, location or recipient"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" /> More Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Filter by Date</DropdownMenuItem>
            <DropdownMenuItem>Filter by Value</DropdownMenuItem>
            <DropdownMenuItem>Filter by Weight</DropdownMenuItem>
            <DropdownMenuItem>Filter by Service Type</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0"></TabsContent>
        <TabsContent value="active" className="mt-0"></TabsContent>
        <TabsContent value="delivered" className="mt-0"></TabsContent>
      </Tabs>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Showing {filteredShipments.length} shipments
        </p>
        <Button variant="ghost" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
        </Button>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => {
            const statusBadge = getStatusBadge(shipment.status);

            return (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                className="cursor-pointer"
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7">
                      {/* Left section - ID, Type, Status */}
                      <div className="p-4 md:p-6 md:col-span-1 bg-gray-50 rounded-l-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-3">
                            <Package className="text-secondary h-5 w-5 mr-2" />
                            <h2 className="font-bold">{shipment.id}</h2>
                          </div>
                          <Badge variant="outline" className="mb-2">
                            {shipment.type}
                          </Badge>
                          <Badge
                            className={`flex w-fit items-center ${statusBadge.color}`}
                          >
                            {statusBadge.icon}
                            {shipment.status.charAt(0).toUpperCase() +
                              shipment.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="hidden md:block mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-secondary p-0 h-auto hover:bg-transparent hover:text-secondary"
                          >
                            <Eye size={14} className="mr-1" /> Track
                          </Button>
                        </div>
                      </div>

                      {/* Middle section - Locations, Dates */}
                      <div className="p-4 md:p-6 md:col-span-3 lg:col-span-4 border-b md:border-b-0 md:border-r border-l">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Origin-Destination */}
                          <div className="flex flex-col mb-3 lg:mb-0">
                            <div className="text-sm text-gray-500 mb-1">
                              Route
                            </div>
                            <div className="flex items-center">
                              <MapPin
                                size={16}
                                className="text-gray-400 mr-1"
                              />
                              <span className="font-medium">
                                {shipment.origin}
                              </span>
                              <ArrowRight
                                size={14}
                                className="mx-2 text-gray-400"
                              />
                              <MapPin
                                size={16}
                                className="text-secondary mr-1"
                              />
                              <span className="font-medium">
                                {shipment.destination}
                              </span>
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-500 mb-1">
                              Timeline
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center text-sm">
                                <Calendar
                                  size={14}
                                  className="text-gray-400 mr-1"
                                />
                                <span>Shipped: {shipment.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock
                                  size={14}
                                  className={
                                    shipment.status === "delivered"
                                      ? "text-gray-400 mr-1"
                                      : "text-secondary mr-1"
                                  }
                                />
                                <span>
                                  {shipment.status === "delivered"
                                    ? `Delivered: ${shipment.delivered}`
                                    : `ETA: ${shipment.eta}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lower section */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs text-gray-500">Items</div>
                              <div className="font-medium">
                                {shipment.items}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">
                                Weight
                              </div>
                              <div className="font-medium">
                                {shipment.weight}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Value</div>
                              <div className="font-medium">
                                {shipment.value}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="mt-4 text-sm text-gray-600">
                          <div className="flex items-start">
                            <div className="h-2 w-2 mt-1 mr-2 rounded-full bg-secondary"></div>
                            <div>{shipment.lastUpdate}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right section - Recipient, Actions */}
                      <div className="p-4 md:p-6 md:col-span-1 lg:col-span-2 bg-gray-50 rounded-r-lg flex flex-col justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-2">
                            Recipient
                          </div>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={shipment.recipient.avatar} />
                              <AvatarFallback>
                                {shipment.recipient.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">
                              {shipment.recipient.name}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col md:hidden">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-secondary mb-2"
                          >
                            <Eye size={14} className="mr-1" /> Track
                          </Button>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex space-x-2 mt-6">
                          <Button variant="outline" size="sm">
                            <Download size={14} className="mr-1" /> Receipt
                          </Button>
                          <Button variant="outline" size="sm">
                            <File size={14} className="mr-1" /> Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Package size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No shipments found</h3>
              <p className="text-gray-500 text-center mb-4">
                {searchTerm
                  ? "Try adjusting your search or filters"
                  : "You don't have any shipments matching these filters"}
              </p>
              <Button className="bg-secondary hover:bg-secondary hover:opacity-70">
                Create a New Shipment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {filteredShipments.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mr-2" disabled>
            Previous
          </Button>
          <Button variant="outline" className="bg-secondary text-white mr-2">
            1
          </Button>
          <Button variant="outline" className="mr-2">
            2
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </motion.div>
  );
}

// Utility component for calendar icon
function Calendar({ className, size }) {
  return <CalendarRange className={className} size={size} />;
}

function File({ className, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
