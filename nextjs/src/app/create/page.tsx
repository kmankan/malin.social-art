// this page will allow the user to create a new artworkimport InteractiveAtom from './components/ui/Atom';
import RotatingBoxes from '../components/ui/CreateRotatingBoxes';

export default async function Page() {

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <main className="flex-grow p-8border-2">
        {/* Your custom component will go here */}
        <div className="p-6 rounded-lg shadow-md">
          <RotatingBoxes />
        </div>
      </main>
    </div>
  );
}
