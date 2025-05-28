"use client";
import Layout from "@/app/_layouts/root";
import PoleTabs from "@/components/(poles)/pole/pole-tabs";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[{ title: "Polos", url: "/poles" }]}
      pageTitle="Informações do seu Polo">
      <PoleTabs />
    </Layout>
  );
}
