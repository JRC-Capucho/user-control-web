import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Polo");
}

export default function PolePage() {
  return <Page />;
}
