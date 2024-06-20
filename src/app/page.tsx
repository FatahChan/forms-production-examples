import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-8 px-2 py-4 text-center">
      <h1 className="text-3xl font-bold"> Modern Forms example</h1>
      <div>
        <p>This repo is collection of form examples for modern NextJs</p>

        <ul className="px-4 text-left">
          <li>
            <Link href="/shipping" className="text-blue-400 underline">
              Shipping
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
