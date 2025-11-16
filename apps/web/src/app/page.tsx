export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">Welcome to Propery Connect</h1>
        <p className="mb-8 text-xl text-gray-600">
          The modern digital classified platform for property listings
        </p>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-blue-600">Find Properties</h2>
            <p className="text-gray-600">Browse through thousands of property listings</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-green-600">List Your Property</h2>
            <p className="text-gray-600">Post your property and reach potential buyers</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-amber-600">Connect Easily</h2>
            <p className="text-gray-600">Connect via WhatsApp and manage payments securely</p>
          </div>
        </section>

        <div className="mt-12">
          <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
