"use client";
import Layout from "@/app/_layouts/root";
import PolesTable from "@/components/(poles)/poles/poles-table";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[{ title: "Polos", url: "/poles" }]}
      pageTitle="Listagem de Polos">
      <PolesTable />
    </Layout>
  );
}
