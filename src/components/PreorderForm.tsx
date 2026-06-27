"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "sonner";

interface PreorderFormData {
  name: string;
  productCount: number;
  preorderWhen: string;
  startAt: string;
  endAt: string;
  status: "active" | "inactive";
}

interface PreorderFormProps {
  initialData?: Partial<PreorderFormData> & { id?: string };
  isEditing?: boolean;
}

export function PreorderForm({ initialData, isEditing = false }: PreorderFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusActive, setStatusActive] = useState(
    initialData?.status !== "inactive"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreorderFormData>({
    defaultValues: initialData
      ? {
          name: initialData.name || "",
          productCount: initialData.productCount || 1,
          preorderWhen: initialData.preorderWhen || "regardless-of-stock",
          startAt: initialData.startAt
            ? new Date(initialData.startAt).toISOString().slice(0, 16)
            : "",
          endAt: initialData.endAt
            ? new Date(initialData.endAt).toISOString().slice(0, 16)
            : "",
          status: initialData.status || "active",
        }
      : {
          name: "",
          productCount: 1,
          preorderWhen: "regardless-of-stock",
          startAt: "",
          endAt: "",
          status: "active",
        },
  });

  const onSubmit = async (data: PreorderFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = isEditing ? `/api/preorders/${initialData?.id}` : "/api/preorders";
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: statusActive ? "active" : "inactive",
          startAt: data.startAt ? new Date(data.startAt) : null,
          endAt: data.endAt ? new Date(data.endAt) : null,
        }),
      });
     if (!response.ok) throw new Error("Failed to save preorder");

sessionStorage.setItem(
  "toast",
  isEditing
    ? "Preorder updated successfully."
    : "Preorder created successfully."
);

router.push("/preorders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Top bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => router.push("/preorders")}
          className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/preorders")}
            className="text-sm border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Save changes
          </button>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-base font-semibold text-gray-900">Preorder details</h2>
        <p className="text-sm text-gray-400 mb-6">These values appear in the preorders list.</p>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="form-row py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">
              Name <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mt-0.5">A label to recognize this preorder by.</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={clsx(
                "w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300",
                errors.name ? "border-red-300" : "border-gray-300"
              )}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
        </div>

        {/* Products */}
        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">Products</label>
            <p className="text-xs text-gray-400 mt-0.5">Number of products covered by this preorder.</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              {...register("productCount", { required: true, min: 1 })}
              className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <span className="text-sm text-gray-500">product(s)</span>
          </div>
        </div>

        {/* Preorder when */}
        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">Preorder when</label>
            <p className="text-xs text-gray-400 mt-0.5">When customers are allowed to preorder.</p>
          </div>
          <div className="flex-1">
            <select
              {...register("preorderWhen")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
            >
              <option value="regardless-of-stock">regardless-of-stock</option>
              <option value="out-of-stock">out-of-stock</option>
            </select>
          </div>
        </div>

        {/* Starts at */}
        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">Starts at</label>
            <p className="text-xs text-gray-400 mt-0.5">When the preorder window opens.</p>
          </div>
          <div className="flex-1">
            <input
              type="datetime-local"
              {...register("startAt")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Ends at */}
        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">Ends at</label>
            <p className="text-xs text-gray-400 mt-0.5">Leave empty for no end date.</p>
          </div>
          <div className="flex-1">
            <input
              type="datetime-local"
              {...register("endAt")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Status */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="sm:w-56 shrink-0">
            <label className="font-medium text-gray-800 text-sm">Status</label>
            <p className="text-xs text-gray-400 mt-0.5">Active preorders are visible to customers.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStatusActive((v) => !v)}
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                statusActive ? "bg-gray-900" : "bg-gray-300"
              )}
            >
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                  statusActive ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className="text-sm text-gray-600">{statusActive ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-4xl mx-auto flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => router.push("/preorders")}
          className="text-sm border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Save changes
        </button>
      </div>
    </div>
  );
}
