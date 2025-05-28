import Page from ".";
import { getMetadata } from "@/lib/utils";

export async function generateMetadata() {
  return getMetadata("Home");
}

export default function Home() {
  return <Page />;
}
