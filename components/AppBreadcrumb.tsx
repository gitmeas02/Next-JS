"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppBreadcrumb() {
  const pathname = usePathname();

  // Split pathname into segments
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
    const isLast = index === segments.length - 1;

    return (
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  // Add separator between items
  const itemsWithSeparators = breadcrumbItems.reduce((acc, item, index) => {
    if (index > 0) {
      acc.push(
        <BreadcrumbSeparator key={`sep-${index}`} />
      );
    }
    acc.push(item);
    return acc;
  }, [] as React.ReactNode[]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {itemsWithSeparators.length > 0 && <BreadcrumbSeparator />}
        {itemsWithSeparators}
      </BreadcrumbList>
    </Breadcrumb>
  );
}