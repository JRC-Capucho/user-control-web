"use client";
import Layout from "@/app/_layouts/root";
import CreateWaitingListForm from "@/components/(users)/waiting-list/new/create-waiting-list-form";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Usuários", url: "/users" },
        { title: "Fila de espera", url: "/users/waiting-list" },
        { title: "Novo", url: "/users/waiting-list/new" },
      ]}
      pageTitle="Cadastrar estudante na fila de espera">
      <CreateWaitingListForm />
    </Layout>
  );
}
