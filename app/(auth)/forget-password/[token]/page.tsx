import { getMetadata } from "@/lib/utils";
import Page from ".";

export async function generateMetadata() {
  return getMetadata("Redefinir senha");
}

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  return <Page token={token} />;
}
