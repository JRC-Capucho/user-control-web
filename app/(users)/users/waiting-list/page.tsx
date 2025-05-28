import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Lista de espera");
}

export default function WaitingListPage() {
  return <Page />;
}
