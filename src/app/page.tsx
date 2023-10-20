import Link from 'next/link'

export default function Home() {
  const bgImages = [
    '/rooms/room-1.png',
    '/rooms/room-2.png',
    '/rooms/room-3.png',
    '/rooms/room-4.png',
  ];

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
            {/* loop through bgImages and show a thumbnail card and offer a button to pick on, and link to decorate. */}
            {/* pass the bgimage id via the link */}
            {bgImages.map((bgImage, i) => (
              <div className="w-1/4 p-4">
                <img src={bgImage} alt="Room Image" className="w-full h-64 object-cover mb-4 rounded-lg" />
                <Link className="bg-gray-200 px-4 py-2 rounded-lg" href={`/decorate/${i + 1}`}>
                  {`Room ${i + 1}`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
