import { AppSidebar } from "@/components/global/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FOOTER_TEXT } from "@/lib/constants";
import { Suspense } from "react";

interface BreadCrumbItem {
  title: string;
  url: string;
}

export default function Layout({
  children,
  breadCrumbItems,
  pageTitle,
}: {
  children: React.ReactNode;
  breadCrumbItems: BreadCrumbItem[];
  pageTitle?: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadCrumbItems.map((item, index) => (
                  <div
                    className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"
                    key={`breadcrumb-${index}`}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.url}>
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadCrumbItems.length - 1 && (
                      <BreadcrumbSeparator className="block" />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="px-4 pb-4 h-full">
          {pageTitle && (
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {pageTitle}
            </h1>
          )}

          <div className="p-4 h-full rounded-2xl border bg-sidebar">
            <Suspense>{children}</Suspense>
          </div>

          <div className="py-2 px-4 rounded-t-2xl border bg-sidebar my-4">
            <p className="text-xs text-right">{FOOTER_TEXT}</p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
