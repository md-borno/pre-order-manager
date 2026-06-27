"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatusSwitch } from "./StatusSwitch";
import { Pagination } from "./Pagination";
import clsx from "clsx";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Preorder {
  id: string;
  name: string;
  productCount: number;
  preorderWhen: string;
  startAt: string;
  endAt: string;
  status: "active" | "inactive";
}

type TabFilter = "all" | "active" | "inactive";
type SortField = "name" | "createdAt" | "startAt" | "endAt";
type SortDir = "asc" | "desc";

export function PreorderList() {
  const router = useRouter();
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TabFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const limit = 10;

  useEffect(() => {
  const message = sessionStorage.getItem("toast");

  if (message) {
    toast.success(message);
    sessionStorage.removeItem("toast");
  }
}, []);

  useEffect(() => {
    fetchPreorders();
  }, [filter, sortField, sortDir, page]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchPreorders = async () => {
    setLoading(true);
    try {
      const sort = `${sortField}_${sortDir}`;
      const res = await fetch(
        `/api/preorders?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}`
      );
      const data = await res.json();
      setPreorders(data.preorders);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    } catch (error) {
      console.error("Error fetching preorders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, newStatus: "active" | "inactive") => {
    try {
      const res = await fetch(`/api/preorders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPreorders((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  

  const handleSelectAll = () => {
    if (selectedIds.size === preorders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(preorders.map((p) => p.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }) + " " + new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ];

  const sortFields: { value: SortField; label: string }[] = [
    { value: "name", label: "Name" },
    { value: "createdAt", label: "Created At" },
    { value: "startAt", label: "Starts At" },
    { value: "endAt", label: "Ends At" },
  ];
const handleDelete = async (id: string) => {
 const result = await Swal.fire({
  title: "Delete preorder?",
  text: "This action cannot be undone.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
  buttonsStyling: false,
  customClass: {
    confirmButton:
      "px-4 py-2 rounded-lg bg-red-500 text-white mx-2",
    cancelButton:
      "px-4 py-2 rounded-lg bg-gray-200 text-gray-700 mx-2",
  },
});

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`/api/preorders/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPreorders((prev) => prev.filter((p) => p.id !== id));

      setSelectedIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });

      setTotalItems((t) => t - 1);

      toast.success("Preorder deleted successfully.");
    } else {
      toast.error("Failed to delete preorder.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full flex justify-center px-4 pt-20">
        <div className="w-full max-w-4xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Preorders</h1>

          <Link
            href="/preorders/create"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Create Preorder
          </Link>
        </div>
      </div>

      {/* Card */}

      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs + Sort */}
          <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setFilter(tab.key); setPage(1); }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition",
                    filter === tab.key
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative mb-2" ref={sortRef}>
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition border"
                title="Sort"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L4 7m3-3l3 3M17 8v12m0 0l3-3m-3 3l-3-3" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-48">
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Sort by</p>
                  {sortFields.map((f) => (
                    <label key={f.value} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input
                        type="radio"
                        name="sortField"
                        value={f.value}
                        checked={sortField === f.value}
                        onChange={() => setSortField(f.value)}
                        className="accent-gray-800"
                      />
                      {f.label}
                    </label>
                  ))}
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={() => setSortDir("asc")}
                    className={clsx(
                      "w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center gap-2 transition",
                      sortDir === "asc" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    Ascending
                  </button>
                  <button
                    onClick={() => setSortDir("desc")}
                    className={clsx(
                      "w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center gap-2 transition",
                      sortDir === "desc" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    Descending
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-7 h-7 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : preorders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No preorders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="px-4 py-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === preorders.length && preorders.length > 0}
                        onChange={handleSelectAll}
                        className="accent-gray-800 rounded"
                      />
                    </th>
                    <th className="px-2 py-3 font-medium">Name</th>
                    <th className="px-2 py-3 font-medium">Products</th>
                    <th className="px-2 py-3 font-medium">Preorder when</th>
                    <th className="px-2 py-3 font-medium">Starts at</th>
                    <th className="px-2 py-3 font-medium hidden md:table-cell">Ends at</th>
                    <th className="px-2 py-3 font-medium">Status</th>
                    <th className="px-2 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {preorders.map((preorder) => (
                    <tr key={preorder.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(preorder.id)}
                          onChange={() => handleSelectOne(preorder.id)}
                          className="accent-gray-800 rounded"
                        />
                      </td>
                      <td className="px-2 py-3 font-semibold text-gray-900">{preorder.name}</td>
                      <td className="px-2 py-3 text-gray-600">{preorder.productCount}</td>
                      <td className="px-2 py-3 text-gray-600">{preorder.preorderWhen}</td>
                      <td className="px-2 py-3 text-gray-600 whitespace-nowrap">{formatDate(preorder.startAt)}</td>
                      <td className="px-2 py-3 text-gray-600 whitespace-nowrap hidden md:table-cell">{formatDate(preorder.endAt)}</td>
                      <td className="px-2 py-3">
                        <StatusSwitch
                          id={preorder.id}
                          status={preorder.status}
                          onToggle={handleStatusToggle}
                        />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/preorders/edit/${preorder.id}`}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition border"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(preorder.id)}
                            className="border p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
