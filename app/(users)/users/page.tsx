import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Usuários");
}

export default function UsersPage() {
  return <Page />;
}
