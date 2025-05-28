"use client";

import ResetPasswordForm from "@/components/(auth)/forget-password/reset-password-form";

export default function Page({ token }: { token: string }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
