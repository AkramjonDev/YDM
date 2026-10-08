import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin login" };

async function LoginContent({
  searchParams,
}: Pick<PageProps<"/admin/login">, "searchParams">) {
  const { next, error } = await searchParams;

  return (
    <>
      {error === "forbidden" && (
        <p className="mt-4 text-center text-sm text-red-600">
          Your account does not have admin access.
        </p>
      )}
      <LoginForm next={typeof next === "string" ? next : "/admin"} />
    </>
  );
}

export default function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold">Admin sign in</h1>
        <Suspense fallback={<LoginForm next="/admin" />}>
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
