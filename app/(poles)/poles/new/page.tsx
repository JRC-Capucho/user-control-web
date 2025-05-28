import { getMetadata } from "@/lib/utils";
import Page from "..";

export async function generateMetadata() {
  return getMetadata("Novo polo");
}

export default function NewPolePage() {
  return <Page />;
}
