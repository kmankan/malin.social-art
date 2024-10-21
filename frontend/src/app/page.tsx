import InteractiveAtom from './components/Atom';
import RotatingBoxes from './components/RotatingBoxes';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-center">The Social Art Platform</h1>
      </header>

      <main className="flex-grow p-8 mt-20 border-2">
        {/* Your custom component will go here */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Replace this with your actual component */}
          <RotatingBoxes />
        </div>
      </main>

      <footer className="p-4 bg-gray-100 text-center">
        <p>&copy; Social Art Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
