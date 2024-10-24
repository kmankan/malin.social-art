import InteractiveAtom from './components/ui/Atom';
import RotatingBoxes from './components/ui/RotatingBoxes';
import { auth, currentUser } from '@clerk/nextjs/server'


export default async function Page() {

  // const obj = await auth()
  // console.log('test', obj)

  // const user = await currentUser()
  // console.log('did we get the user object?', user)

  // make a GET request to the backend, triggering the middleware

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <header className="p-4 bg-rose-100">
        <h1 className="text-2xl font-mono text-center">The Social Art Platform</h1>
      </header>

      <main className="flex-grow p-8border-2">
        {/* Your custom component will go here */}
        <div className="p-6 rounded-lg shadow-md">
          Hey Welcome, lets do this!
          {/* <RotatingBoxes /> */}
        </div>
      </main>
    </div>
  );
}
