export default function Success() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl font-medium text-ink">
        Paiement confirmé.
      </h1>
      <p className="mt-4 max-w-md text-slate">
        Merci. Nous préparons votre accès — vous recevrez vos identifiants
        par email sous peu.
      </p>
    </main>
  );
}
