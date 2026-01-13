import { notFound } from "next/navigation";

// This page catches all unmatched routes within the [locale] segment
export default function CatchAllPage() {
  notFound();
}
