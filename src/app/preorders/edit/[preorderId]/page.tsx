import { PreorderForm } from "@/src/components/PreorderForm";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

interface EditPreorderPageProps {
  params: Promise<{
    preorderId: string;
  }>;
}

export default async function EditPreorderPage({
  params,
}: EditPreorderPageProps) {
  const { preorderId } = await params;

  const preorder = await prisma.preorder.findUnique({
    where: {
      id: preorderId,
    },
  });

  if (!preorder) {
    notFound();
  }

  const initialData = {
    id: preorder.id,
    name: preorder.name,
    productCount: preorder.productCount,
    preorderWhen: preorder.preorderWhen,
    startAt: preorder.startAt.toISOString().slice(0, 16),
    endAt: preorder.endAt.toISOString().slice(0, 16),
    status: preorder.status === "inactive" ? "inactive" : "active",
  } as const;

  return (
    <div>
      <PreorderForm initialData={initialData} isEditing />
    </div>
  );
}
