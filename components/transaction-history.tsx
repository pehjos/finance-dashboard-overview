"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowUpRight, ArrowDownLeft, Search, Download, Filter, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useAppContext } from "@/src/context/AppContext";
import { useTransactions } from "@/src/hooks/useTransactions";
import type { Transaction } from "@/src/types";

export function TransactionHistory() {
  const { state } = useAppContext();
  const { transactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
      const matchesType =
        activeTab === "all" ||
        (activeTab === "income" && transaction.type === "credit") ||
        (activeTab === "expenses" && transaction.type === "debit");
      return matchesSearch && matchesStatus && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
          <p className="text-slate-600">Track and manage all your financial transactions</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
          onClick={() => window.alert("Transactions exported!")}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Transaction Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and Filter Toggle */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {showFilters && <X className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="animate-fadeIn relative">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="amount">Sort by Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions Table */}
      <AnimatedCard className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} transactions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {state.isLoading ? (
            <div className="space-y-4">
              <LoadingSkeleton type="table" lines={5} />
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="hidden md:table-cell">Recipient</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                          No transactions found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map((transaction, index) => (
                        <TableRow
                          key={transaction.id}
                          className={`cursor-pointer hover:bg-slate-50 transition-all duration-300 animate-fadeIn stagger-${index + 1}`}
                          onClick={() => setSelectedTransaction(transaction)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-1 rounded-full transition-transform duration-300 hover:scale-110 ${
                                  transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                                }`}
                              >
                                {transaction.type === "credit" ? (
                                  <ArrowDownLeft className="h-3 w-3 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="h-3 w-3 text-red-600" />
                                )}
                              </div>
                              {transaction.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{transaction.recipient}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline" className="animate-scaleIn">
                              {transaction.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-bold transition-colors duration-300 ${
                                transaction.type === "credit" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}$
                              {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </AnimatedCard>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    selectedTransaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {selectedTransaction.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedTransaction.description}</h3>
                  <p className="text-sm text-slate-500">{formatDate(selectedTransaction.date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p
                    className={`font-bold ${selectedTransaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedTransaction.type === "credit" ? "+" : "-"}$
                    {Math.abs(selectedTransaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p>{getStatusBadge(selectedTransaction.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Recipient</p>
                  <p className="font-medium">{selectedTransaction.recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="font-medium">{selectedTransaction.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Transaction ID</p>
                  <p className="font-medium">{selectedTransaction.id}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => window.alert("Download receipt")}>
                  Download Receipt
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.alert("Report issue with this transaction")}
                >
                  Report Issue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
