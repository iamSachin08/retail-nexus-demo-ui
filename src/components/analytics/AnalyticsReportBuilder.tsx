
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Play, 
  Save,
  Calendar,
  Filter
} from "lucide-react";

export function AnalyticsReportBuilder() {
  const [reportName, setReportName] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const metrics = [
    "Sales Revenue", "Gross Margin", "Units Sold", "Conversion Rate",
    "Average Transaction Value", "Footfall", "Returns Rate", "Inventory Turnover"
  ];

  const dimensions = [
    "Store", "Brand", "Category", "Product", "Staff Member", "Time Period", "Customer Segment"
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Custom Report Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                placeholder="Enter report name..."
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Analysis</SelectItem>
                  <SelectItem value="performance">Performance Dashboard</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                  <SelectItem value="custom">Custom Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  From Date
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  To Date
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Filters</Label>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Add Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox 
                    id={metric}
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMetrics([...selectedMetrics, metric]);
                      } else {
                        setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
                      }
                    }}
                  />
                  <Label htmlFor={metric} className="text-sm">{metric}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dimensions.map((dimension) => (
                <div key={dimension} className="flex items-center space-x-2">
                  <Checkbox id={dimension} />
                  <Label htmlFor={dimension} className="text-sm">{dimension}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Report preview will appear here</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
