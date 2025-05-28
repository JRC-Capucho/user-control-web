import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Novo item no estoque");
}

export default function NewStockItemPage() {
  return <Page />;
}
