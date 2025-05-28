"use client";
import Layout from "@/app/_layouts/root";
import StockItemsTable from "@/components/(poles)/pole/stock-items/stock-items-table";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Polo", url: "/pole" },
        { title: "Estoque", url: "/pole/stock-items" },
      ]}
      pageTitle="Listagem de items no estoque">
      <StockItemsTable />
    </Layout>
  );
}
