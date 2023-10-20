// app/search/page.js or app/search/page.tsx
import { Search } from '../components/search'; // change this with the path to your <Search> component

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative">
        {/* Page content here */}

        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Choose object
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-100 min-h-full bg-base-200 text-base-content">
          <Search />
        </ul>
      </div>
    </div>
  );
}
