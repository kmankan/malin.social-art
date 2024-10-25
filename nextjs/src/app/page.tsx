

export default async function Page() {



  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <main className="flex-grow p-8border-2">
        {/* Your custom component will go here */}
        <div className="feed p-6 rounded-lg shadow-lg flex justify-center items-center min-h-screen w-2/3 mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-mono">Your Social Art Works</h2>
            <p className="text-gray-600">Start creating and sharing your artistic journey today!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
