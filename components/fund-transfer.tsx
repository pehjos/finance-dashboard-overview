"use client";

import { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, User, CheckCircle, XCircle, Star, Clock } from "lucide-react";
import { Confetti } from "@/components/confetti";
import { AnimatedCard } from "@/components/animated-card";
import { useAppContext } from "@/src/context/AppContext";
import { useContacts } from "@/src/hooks/useContacts";
import type { Contact } from "@/src/types";
import { LoadingSpinner } from "@/components/loading-spinner";

type TransferStep = "recipient" | "amount" | "confirmation" | "result"
type TransferTab = "all" | "favorites" | "recent"

export function FundTransfer(): React.ReactElement {
  const { addTransaction } = useAppContext();
  const { contacts, favoriteContacts, recentContacts } = useContacts();
  const [currentStep, setCurrentStep] = useState<TransferStep>("recipient");
  const [selectedRecipient, setSelectedRecipient] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [transferResult, setTransferResult] = useState<"success" | "failed" | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState<TransferTab>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedAmounts] = useState([50, 100, 200, 500]);

  const getFilteredContacts = (): Contact[] => {
    let contactList = contacts;
    
    if (activeTab === "favorites") {
      contactList = favoriteContacts;
    } else if (activeTab === "recent") {
      contactList = recentContacts;
    }

    return contactList.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    );
  };

  const filteredContacts = getFilteredContacts();

  const handleRecipientSelect = (contact: Contact): void => {
    setSelectedRecipient(contact);
    setCurrentStep("amount");
  };

  const handleAmountSubmit = (): void => {
    if (amount && Number.parseFloat(amount) > 0) {
      setCurrentStep("confirmation");
    }
  };

  const handleTransferConfirm = (): void => {
    setIsLoading(true);
    setCurrentStep("result");
    
    // Simulate transfer processing
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setTransferResult(success ? "success" : "failed");
      setIsLoading(false);
      
      if (success) {
        // Add transaction to the context
        addTransaction({
          date: new Date().toISOString(),
          description: `Transfer to ${selectedRecipient?.name}`,
          recipient: selectedRecipient?.name || "",
          category: "Transfer",
          amount: -Number.parseFloat(amount),
          status: "completed",
          type: "debit",
        });
        
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 2000);
  };

  const resetTransfer = (): void => {
    setCurrentStep("recipient");
    setSelectedRecipient(null);
    setAmount("");
    setNote("");
    setTransferResult(null);
    setSearchTerm("");
    setIsLoading(false);
    setShowConfetti(false);
  };

  const renderStepIndicator = (): React.ReactElement => {
    const steps = [
      { id: "recipient", label: "Recipient", number: 1 },
      { id: "amount", label: "Amount", number: 2 },
      { id: "confirmation", label: "Confirm", number: 3 },
      { id: "result", label: "Complete", number: 4 },
    ];

    return (
      <div className="md:flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="md:flex gap-3  items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                currentStep === step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : steps.findIndex((s) => s.id === currentStep) > index
                    ? "bg-green-600 border-green-600 text-white"
                    : "border-slate-300 text-slate-400"
              }`}
            >
              {steps.findIndex((s) => s.id === currentStep) > index ? <Check className="h-4 w-4" /> : step.number}
            </div>
            <span
              className={`ml-2 text-sm transition-colors ${
                currentStep === step.id ? "text-blue-600 font-medium" : "text-slate-500"
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-slate-300 mx-4" />}
          </div>
        ))}
      </div>
    );
  };

  const renderRecipientStep = (): React.ReactElement => (
    <AnimatedCard className="max-w-2xl mx-auto">
      {showConfetti && <Confetti />}
      <CardHeader>
        <CardTitle>Select Recipient</CardTitle>
        <CardDescription>Choose who you want to send money to</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search by name, username, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as TransferTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No contacts found</p>
                </div>
              ) : (
                filteredContacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    onClick={() => handleRecipientSelect(contact)}
                    className={`flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover-lift animate-slideInFromLeft stagger-${index + 1}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold transition-transform duration-300 hover:scale-110">
                      {contact.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-slate-900">{contact.name}</h3>
                        {contact.favorite && (
                          <Star className="h-3 w-3 text-yellow-500 fill-current animate-pulse-custom" />
                        )}
                        {contact.recent && <Clock className="h-3 w-3 text-green-500 animate-bounce-custom" />}
                      </div>
                      <p className="text-sm text-slate-500">{contact.username}</p>
                      <p className="text-sm text-slate-500">{contact.phone}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            className="w-full hover:bg-slate-50 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          >
            <User className="h-4 w-4 mr-2" />
            Add New Recipient
          </Button>
        </div>
      </CardContent>
    </AnimatedCard>
  );

  const renderAmountStep = (): React.ReactElement => (
    <AnimatedCard className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Amount</CardTitle>
        <CardDescription>
          Sending to {selectedRecipient?.name} ({selectedRecipient?.username})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg">$</span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 text-lg h-12 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Quick amounts</Label>
          <div className="grid grid-cols-4 gap-2">
            {suggestedAmounts.map((suggestedAmount) => (
              <Button
                key={suggestedAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(suggestedAmount.toString())}
                className="hover:bg-blue-50 hover:border-blue-300 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
              >
                ${suggestedAmount}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Note (Optional)</Label>
          <Textarea
            id="note"
            placeholder="What's this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Transfer Amount</span>
            <span>${amount || "0.00"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Transfer Fee</span>
            <span>$0.00</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${amount || "0.00"}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("recipient")}
            className="flex-1 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          >
            Back
          </Button>
          <Button
            onClick={handleAmountSubmit}
            disabled={!amount || Number.parseFloat(amount) <= 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </AnimatedCard>
  );

  const renderConfirmationStep = (): React.ReactElement => (
    <AnimatedCard className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Confirm Transfer</CardTitle>
        <CardDescription>Please review the details before confirming</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
              {selectedRecipient?.avatar}
            </div>
            <div>
              <h3 className="font-medium">{selectedRecipient?.name}</h3>
              <p className="text-sm text-slate-500">{selectedRecipient?.username}</p>
              <p className="text-sm text-slate-500">{selectedRecipient?.phone}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Amount</span>
              <span className="font-medium text-lg">${amount}</span>
            </div>
            {note && (
              <div className="flex justify-between">
                <span className="text-slate-600">Note</span>
                <span className="text-slate-900">{note}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">Transfer Fee</span>
              <span>$0.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${amount}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("amount")}
            className="flex-1 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          >
            Back
          </Button>
          <Button
            onClick={handleTransferConfirm}
            className="flex-1 bg-blue-600 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
          >
            Confirm Transfer
          </Button>
        </div>
      </CardContent>
    </AnimatedCard>
  );

  const renderResultStep = (): React.ReactElement => (
    <AnimatedCard className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        {isLoading || transferResult === null ? (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" text="Processing Transfer..." />
            <p className="mt-2 text-slate-500">Please wait while we process your transaction</p>
          </div>
        ) : transferResult === "success" ? (
          <div className="text-center py-8">
            {showConfetti && <Confetti />}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Transfer Successful!</h3>
            <p className="text-slate-600 mb-4">
              ${amount} has been sent to {selectedRecipient?.name}
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-800">Transaction ID: TXN{Date.now().toString().slice(-6)}</p>
            </div>
            <Button
              onClick={resetTransfer}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
            >
              Send Another Transfer
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Transfer Failed</h3>
            <p className="text-slate-600 mb-4">We couldn't process your transfer. Please try again.</p>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-red-800">Error: Insufficient funds or network error</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={resetTransfer}
                className="flex-1 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
              >
                Start Over
              </Button>
              <Button
                onClick={handleTransferConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 transition-shadow duration-300"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </AnimatedCard>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Send Money</h1>
        <p className="text-slate-600">Transfer funds quickly and securely</p>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      {currentStep === "recipient" && renderRecipientStep()}
      {currentStep === "amount" && renderAmountStep()}
      {currentStep === "confirmation" && renderConfirmationStep()}
      {currentStep === "result" && renderResultStep()}
    </div>
  );
}
