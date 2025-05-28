import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Esqueci minha senha");
}

export default function ForgetPassword() {
  return <Page />;
}
