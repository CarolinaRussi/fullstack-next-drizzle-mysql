"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="text-center text-red-600">
      <h2>Algo deu errado.</h2>
      <p>{error.message}</p>
    </div>
  );
}
