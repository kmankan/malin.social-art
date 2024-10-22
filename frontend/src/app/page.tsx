import InteractiveAtom from './components/Atom';
import RotatingBoxes from './components/RotatingBoxes';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <header className="p-4 bg-rose-100">
        <h1 className="text-2xl font-mono text-center">The Social Art Platform</h1>
      </header>

      <main className="flex-grow p-8border-2">
        {/* Your custom component will go here */}
        <div className="p-6 rounded-lg shadow-md">
          <RotatingBoxes />
        </div>
      </main>
    </div>
  );
}
