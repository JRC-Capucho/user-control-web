"use client";
import Layout from "@/app/_layouts/root";
import WaitingListTable from "@/components/(users)/waiting-list/waiting-list-table";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Usuários", url: "/users" },
        { title: "Lista de espera", url: "/users/waiting-list" },
      ]}
      pageTitle="Lista de espera">
      <WaitingListTable />
    </Layout>
  );
}
