"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Truck,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  File,
  Printer,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ShipmentLabelModal from "./shipment.modal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Type definitions for our data
export type ShipmentStatus =
  | "delivered"
  | "in-transit"
  | "processing"
  | "delayed";

export type Shipment = {
  id: string;
  tracking_number: string | null;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  date: string;
  eta: string;
  delivered?: string | null;
  items: number;
  weight: string;
  type: string;
  value: string;
  lastUpdate: string;
  recipient: {
    name: string;
    imageUrl?: string | null;
  };
};

// This would be replaced with actual Prisma call in the Server Component
export const ShipmentsPage = ({ shipments }: { shipments: Shipment[] }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Filter shipments based on search, tab and status
  const filteredShipments = shipments.filter((shipment) => {
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
  const getStatusBadge = (status: ShipmentStatus) => {
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

  const handleViewDetails = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    shipmentId: string
  ) => {
    e.stopPropagation();
    router.push(`/shipments/${shipmentId}/details`);
  };

  const handleDownloadReceipt = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    // Implement download receipt functionality
    // This would typically call an API endpoint or use a PDF generation library
  };

  // Function to handle generate label action
  const handleGenerateLabel = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shipment: any
  ) => {
    e.stopPropagation();
    setSelectedShipment(shipment);
    setLabelModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Shipments</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your shipments in one place
          </p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-secondary hover:bg-secondary hover:opacity-70"
          onClick={() => router.push("/shipments/create")}
        >
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
      </div>

      {/* Shipments Table */}
      {filteredShipments.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tracking ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origin/Destination</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => {
                const statusBadge = getStatusBadge(shipment.status);

                return (
                  <TableRow
                    key={shipment.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push(`/shipments/${shipment.id}`)}
                  >
                    <TableCell className="font-medium">
                      {shipment.tracking_number}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`flex w-fit items-center ${statusBadge.color}`}
                      >
                        {statusBadge.icon}
                        {shipment.status.charAt(0).toUpperCase() +
                          shipment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm">
                          <MapPin size={14} className="text-gray-400 mr-1" />
                          <span>{shipment.origin}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <MapPin size={14} className="text-secondary mr-1" />
                          <span>{shipment.destination}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="text-sm">Shipped: {shipment.date}</div>
                        <div className="text-sm">
                          {shipment.status === "delivered"
                            ? `Delivered: ${shipment.delivered}`
                            : `ETA: ${shipment.eta}`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="text-sm">Type: {shipment.type}</div>
                        <div className="text-sm">Items: {shipment.items}</div>
                        <div className="text-sm">Weight: {shipment.weight}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="truncate max-w-32">
                          {shipment.recipient.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/track/results?id=${shipment.tracking_number}`
                              );
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Track Shipment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleViewDetails(e, shipment.id)}
                          >
                            <File className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleDownloadReceipt(e)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleGenerateLabel(e, shipment)}
                          >
                            <Printer className="mr-2 h-4 w-4" />
                            Generate Label
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
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
            <Button
              className="bg-secondary hover:bg-secondary hover:opacity-70"
              onClick={() => router.push("/shipments/create")}
            >
              Create a New Shipment
            </Button>
          </CardContent>
        </Card>
      )}

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

      {/* Shipment Label Modal */}
      {selectedShipment && (
        <ShipmentLabelModal
          shipment={selectedShipment}
          isOpen={labelModalOpen}
          onClose={() => setLabelModalOpen(false)}
        />
      )}
    </div>
  );
};
