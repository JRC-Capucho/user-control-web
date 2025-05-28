import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Cadastrar estudante na fila de espera");
}

export default function NewWaitingListPage() {
  return <Page />;
}
