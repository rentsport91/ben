// /app/(public)/user/shipments/history/page.js
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Calendar,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import { getShipmentHistory } from "./action";

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  intransit: "bg-purple-500",
  delivered: "bg-green-500",
  exception: "bg-red-500",
};

export default function ShipmentHistoryPage() {
  const [shipments, setShipments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchShipments = async (page = 1) => {
    setIsLoading(true);

    try {
      const result = await getShipmentHistory(page, pagination.limit);

      if (result.error) {
        toast.error("Failed", {
          description: result.message || "Failed to fetch shipment history",
        });
      } else {
        setShipments(result.shipments);
        setPagination(result.pagination);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handlePageChange = (newPage) => {
    fetchShipments(newPage);
  };

  const handleRefresh = () => {
    fetchShipments(pagination.page);
  };

  const filteredShipments = searchQuery
    ? shipments.filter(
        (shipment) =>
          shipment.trackingNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          shipment.recipientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          shipment.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : shipments;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Package className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Shipment History</h1>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Find Your Shipments</CardTitle>
          <CardDescription>
            Search by tracking number, recipient name, or status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shipments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pagination.totalCount || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                `${
                  shipments.filter((s) => s.status === "intransit").length
                } In Transit`
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                `${
                  shipments.filter((s) => s.status === "delivered").length
                } Packages`
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Shipments</CardTitle>
          <CardDescription>View and track all your shipments</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
            </div>
          ) : filteredShipments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-medium">No shipments found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "You haven't created any shipments yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredShipments.map((shipment) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <div
                        className={`h-1 ${
                          statusColors[shipment.status] || "bg-gray-300"
                        }`}
                      />
                      <CardContent className="p-4">
                        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                          <div>
                            <div className="mb-1 flex items-center">
                              <h3 className="text-lg font-medium">
                                {shipment.recipientName}
                              </h3>
                              <Badge
                                className="ml-2"
                                variant={
                                  shipment.status === "delivered"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {shipment.status.charAt(0).toUpperCase() +
                                  shipment.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Tracking:{" "}
                              <span className="font-mono">
                                {shipment.trackingNumber}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                              Created: {formatDate(shipment.createdAt)}
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="mr-1 h-4 w-4 text-muted-foreground" />
                              {shipment.serviceType.charAt(0).toUpperCase() +
                                shipment.serviceType.slice(1)}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="ml-auto"
                            >
                              <a
                                href={`/track?trackingNumber=${shipment.trackingNumber}`}
                              >
                                Track Package
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
        {!isLoading && pagination.totalPages > 1 && (
          <CardFooter className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
