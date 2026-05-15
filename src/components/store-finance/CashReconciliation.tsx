
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Calculator, 
  Check,
  AlertTriangle,
  Save,
  FileText
} from "lucide-react";

export function CashReconciliation() {
  const [cashCounts, setCashCounts] = useState({
    notes2000: 0,
    notes500: 0,
    notes200: 0,
    notes100: 0,
    notes50: 0,
    notes20: 0,
    notes10: 0,
    coins10: 0,
    coins5: 0,
    coins2: 0,
    coins1: 0
  });

  const calculateTotal = () => {
    return (
      cashCounts.notes2000 * 2000 +
      cashCounts.notes500 * 500 +
      cashCounts.notes200 * 200 +
      cashCounts.notes100 * 100 +
      cashCounts.notes50 * 50 +
      cashCounts.notes20 * 20 +
      cashCounts.notes10 * 10 +
      cashCounts.coins10 * 10 +
      cashCounts.coins5 * 5 +
      cashCounts.coins2 * 2 +
      cashCounts.coins1 * 1
    );
  };

  const systemCash = 125340; // Example system cash
  const countedCash = calculateTotal();
  const variance = countedCash - systemCash;

  const recentReconciliations = [
    {
      date: "2024-01-24",
      systemCash: 145680,
      countedCash: 145680,
      variance: 0,
      status: "matched"
    },
    {
      date: "2024-01-23", 
      systemCash: 132450,
      countedCash: 132575,
      variance: 125,
      status: "variance"
    },
    {
      date: "2024-01-22",
      systemCash: 156780,
      countedCash: 156780,
      variance: 0,
      status: "matched"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cash Counting Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Physical Cash Count
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Currency Notes */}
            <div>
              <h3 className="font-medium mb-4 text-gray-900">Currency Notes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "₹2000", value: "notes2000", multiplier: 2000 },
                  { label: "₹500", value: "notes500", multiplier: 500 },
                  { label: "₹200", value: "notes200", multiplier: 200 },
                  { label: "₹100", value: "notes100", multiplier: 100 },
                  { label: "₹50", value: "notes50", multiplier: 50 },
                  { label: "₹20", value: "notes20", multiplier: 20 },
                  { label: "₹10", value: "notes10", multiplier: 10 }
                ].map((note) => (
                  <div key={note.value} className="space-y-2">
                    <Label htmlFor={note.value}>{note.label} Notes</Label>
                    <Input
                      id={note.value}
                      type="number"
                      placeholder="Count"
                      value={cashCounts[note.value as keyof typeof cashCounts]}
                      onChange={(e) => setCashCounts({
                        ...cashCounts,
                        [note.value]: parseInt(e.target.value) || 0
                      })}
                    />
                    <p className="text-sm text-gray-600">
                      = ₹{((cashCounts[note.value as keyof typeof cashCounts] || 0) * note.multiplier).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coins */}
            <div>
              <h3 className="font-medium mb-4 text-gray-900">Coins</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "₹10", value: "coins10", multiplier: 10 },
                  { label: "₹5", value: "coins5", multiplier: 5 },
                  { label: "₹2", value: "coins2", multiplier: 2 },
                  { label: "₹1", value: "coins1", multiplier: 1 }
                ].map((coin) => (
                  <div key={coin.value} className="space-y-2">
                    <Label htmlFor={coin.value}>{coin.label} Coins</Label>
                    <Input
                      id={coin.value}
                      type="number"
                      placeholder="Count"
                      value={cashCounts[coin.value as keyof typeof cashCounts]}
                      onChange={(e) => setCashCounts({
                        ...cashCounts,
                        [coin.value]: parseInt(e.target.value) || 0
                      })}
                    />
                    <p className="text-sm text-gray-600">
                      = ₹{((cashCounts[coin.value as keyof typeof cashCounts] || 0) * coin.multiplier).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">System Cash</p>
                  <p className="text-xl font-semibold">₹{systemCash.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Counted Cash</p>
                  <p className="text-xl font-semibold">₹{countedCash.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Variance</p>
                  <p className={`text-xl font-semibold ${variance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{Math.abs(variance).toLocaleString()} {variance > 0 ? '(Excess)' : variance < 0 ? '(Short)' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Reconciliation
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reconciliations */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Reconciliations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReconciliations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{rec.date}</span>
                    <Badge variant={rec.status === 'matched' ? 'default' : 'destructive'}>
                      {rec.status === 'matched' ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {rec.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>System:</span>
                      <span>₹{rec.systemCash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Counted:</span>
                      <span>₹{rec.countedCash.toLocaleString()}</span>
                    </div>
                    {rec.variance !== 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Variance:</span>
                        <span>₹{Math.abs(rec.variance)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Post Collection
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View Audit Trail
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calculator className="h-4 w-4 mr-2" />
              Bank Drop Entry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
