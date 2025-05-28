"use client";
import Layout from "@/app/_layouts/root";
import UsersTable from "@/components/(users)/users-table";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[{ title: "Usuários", url: "/users" }]}
      pageTitle="Listagem de Usuários">
      <UsersTable />
    </Layout>
  );
}
