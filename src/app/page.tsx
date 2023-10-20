import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Room Selection</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="bg-white p-4 shadow rounded-lg">
          {/* <img src="path_to_your_image" alt="Room Image" className="w-full h-64 object-cover mb-4 rounded-lg" /> */}
          <div className="flex justify-between">
            <Link className="bg-gray-200 px-4 py-2 rounded-lg" href="/decorate">
              Decorate
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
