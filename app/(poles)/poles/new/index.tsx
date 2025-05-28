"use client";
import Layout from "@/app/_layouts/root";
import CreatePoleForm from "@/components/(poles)/poles/new/create-pole-form";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Polos", url: "/poles" },
        { title: "Novo", url: "/new" },
      ]}
      pageTitle="Cadastrar novo polo">
      <CreatePoleForm />
    </Layout>
  );
}
