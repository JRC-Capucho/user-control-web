"use client";
import Layout from "@/app/_layouts/root";
import CreateStockItemForm from "@/components/(poles)/pole/stock-items/new/create-stock-item-form";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Polo", url: "/pole" },
        { title: "Estoque", url: "/pole/stock-items" },
        { title: "Novo item", url: "/pole/stock-items/new" },
      ]}
      pageTitle="Cadastrar novo item no estoque">
      <CreateStockItemForm />
    </Layout>
  );
}
