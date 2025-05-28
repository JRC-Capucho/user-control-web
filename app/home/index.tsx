"use client";
import WelcomeCard from "@/components/home/welcome-card";
import Layout from "../_layouts/root";
export default function Page() {
  return (
    <Layout breadCrumbItems={[{ title: "Home", url: "/home" }]}>
      <WelcomeCard />
    </Layout>
  );
}
