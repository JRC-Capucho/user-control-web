import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Polos");
}

export default function PolesPage() {
  return <Page />;
}
