import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FOOTER_TEXT, OPEN_GRAPH } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringNumberToString(value: string | number): string {
  if (typeof value === "number") return value.toString();
  return value;
}

export function formatDateToApi(date: string): string {
  return new Date(date.split("/").reverse().join("-")).toISOString();
}

export function formatDateToRender(date: string): string {
  let parsedDate;

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    parsedDate = new Date(Date.UTC(year, month - 1, day)); // Cria a data no fuso horário UTC
  } else {
    parsedDate = new Date(date); // Assume que é um formato ISO válido
  }

  const day = String(parsedDate.getUTCDate()).padStart(2, "0");
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const year = parsedDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCpfToRender(cpf: string): string {
  const cleanedCpf = cpf.replace(/\D/g, "");
  return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
}

export function handlePaginate(
  pageIndex: number,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) {
  const params = new URLSearchParams(
    searchParams as unknown as URLSearchParams
  );

  if (pageIndex !== null) {
    params.set("page", pageIndex.toString());
  } else {
    params.delete("page");
  }

  router.push(`?${params.toString()}`);
}

export const calculatePasswordStrength = (password: string) => {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  const strengthScore = [
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    isLongEnough,
    isLongEnough, // peso 2 para o tamanho
  ].filter(Boolean).length;

  if (strengthScore <= 2) return "weak";
  if (strengthScore === 3 || strengthScore === 4) return "medium";
  return "strong";
};

export const getMetadata = (title: string) => {
  return {
    title: title,
    description: `${title} - ${FOOTER_TEXT}`,
    openGraph: OPEN_GRAPH,
  };
};
