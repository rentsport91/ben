import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShipmentOriginFormProps {
  data: any;
  onChange: (name: string, value: string | number | boolean) => void;
  onNext: () => void;
}

export default function ShipmentOriginForm({
  data,
  onChange,
  onNext,
}: ShipmentOriginFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Sender Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide information about the sender and origin of this shipment.
          </p>
        </div>

        <div className="pt-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="senderName"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Name *
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="senderName"
                  id="senderName"
                  value={data.senderName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="senderCompany"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="senderCompany"
                  id="senderCompany"
                  value={data.senderCompany}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="senderEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <div className="mt-1">
                <Input
                  type="email"
                  name="senderEmail"
                  id="senderEmail"
                  value={data.senderEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="senderPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number *
              </label>
              <div className="mt-1">
                <Input
                  type="tel"
                  name="senderPhone"
                  id="senderPhone"
                  value={data.senderPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="originAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address *
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="originAddress"
                  id="originAddress"
                  value={data.originAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="originCity"
                className="block text-sm font-medium text-gray-700"
              >
                City *
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="originCity"
                  id="originCity"
                  value={data.originCity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="originState"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province *
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="originState"
                  id="originState"
                  value={data.originState}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="originPostalCode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal Code *
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="originPostalCode"
                  id="originPostalCode"
                  value={data.originPostalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="originCountry"
                className="block text-sm font-medium text-gray-700"
              >
                Country *
              </label>
              <div className="mt-1">
                <Select
                  name="originCountry"
                  defaultValue={data.originCountry}
                  onValueChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Origin Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Mexico">Mexico</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-end">
        <Button type="button" size={"lg"} onClick={onNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
