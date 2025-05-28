import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Novo usuário");
}

export default function NewUserPage() {
  return <Page />;
}
