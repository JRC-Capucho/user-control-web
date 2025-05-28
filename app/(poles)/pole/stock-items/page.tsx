import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Estoque");
}

export default function StockItemPage() {
  return <Page />;
}
