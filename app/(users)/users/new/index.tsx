"use client";
import Layout from "@/app/_layouts/root";
import CreateUserForm from "@/components/(users)/new/create-user-form";

export default function Page() {
  return (
    <Layout
      breadCrumbItems={[
        { title: "Usuários", url: "/users" },
        { title: "Novo", url: "/new" },
      ]}
      pageTitle="Cadastrar novo usuário">
      <CreateUserForm />
    </Layout>
  );
}
