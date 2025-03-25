// app/quota/page.tsx (or pages/quota.tsx)
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckQuotaForm } from "@/components/features/quota/CheckQuotaForm";

type Quota = {
  id: number;
  region: string;
  origin: string;
  destination: string;
  packageType: string;
  quota: number;
  used: number;
};

const initialQuotas: Quota[] = [
  {
    id: 1,
    region: "North America",
    origin: "New York, USA",
    destination: "Los Angeles, USA",
    packageType: "Standard",
    quota: 1500,
    used: 900,
  },
  {
    id: 2,
    region: "Europe",
    origin: "Berlin, Germany",
    destination: "Paris, France",
    packageType: "Express",
    quota: 1200,
    used: 700,
  },
  {
    id: 3,
    region: "Asia",
    origin: "Beijing, China",
    destination: "Tokyo, Japan",
    packageType: "Economy",
    quota: 2000,
    used: 1600,
  },
  {
    id: 4,
    region: "Africa",
    origin: "Cairo, Egypt",
    destination: "Johannesburg, South Africa",
    packageType: "Standard",
    quota: 1000,
    used: 400,
  },
  // You can add more records as needed.
];

export default function QuotaPage() {
  const [quotas, setQuotas] = React.useState<Quota[]>(initialQuotas);
  const [filter, setFilter] = React.useState<{
    region?: string;
    origin?: string;
    destination?: string;
    packageType?: string;
  }>({});

  const handleFilter = (data: {
    region?: string;
    origin?: string;
    destination?: string;
    packageType?: string;
  }) => {
    setFilter(data);
    let filtered = initialQuotas;

    if (data.region) {
      const regionFilter = data.region.toLowerCase();
      filtered = filtered.filter((q) =>
        q.region.toLowerCase().includes(regionFilter)
      );
    }
    if (data.origin) {
      const originFilter = data.origin.toLowerCase();
      filtered = filtered.filter((q) =>
        q.origin.toLowerCase().includes(originFilter)
      );
    }
    if (data.destination) {
      const destinationFilter = data.destination.toLowerCase();
      filtered = filtered.filter((q) =>
        q.destination.toLowerCase().includes(destinationFilter)
      );
    }
    if (data.packageType) {
      const packageFilter = data.packageType.toLowerCase();
      filtered = filtered.filter((q) =>
        q.packageType.toLowerCase().includes(packageFilter)
      );
    }
    setQuotas(filtered);
  };

  const handleReset = () => {
    setFilter({});
    setQuotas(initialQuotas);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Shipping Quota Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            This page provides an overview of the shipping quotas allocated
            across different regions. Use the filter below to search by region,
            origin, destination, or package type.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Package Type</TableHead>
                <TableHead>Quota</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotas.map((quota) => (
                <TableRow key={quota.id}>
                  <TableCell>{quota.region}</TableCell>
                  <TableCell>{quota.origin}</TableCell>
                  <TableCell>{quota.destination}</TableCell>
                  <TableCell>{quota.packageType}</TableCell>
                  <TableCell>{quota.quota}</TableCell>
                  <TableCell>{quota.used}</TableCell>
                  <TableCell>{quota.quota - quota.used}</TableCell>
                </TableRow>
              ))}
              {quotas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {Object.keys(filter).length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={handleReset}>
                Reset Filter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <CheckQuotaForm onSubmit={handleFilter} />
    </div>
  );
}
