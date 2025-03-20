import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard Arduus",
  description: "Plataforma de análise e gestão de receita da Arduus",
}

export default function IndexPage() {
  redirect("/dashboard/receita")
}