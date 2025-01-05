import { Outlet } from 'react-router-dom';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';

const DefaultLayout = () => {
   return (
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-skin-layout">
         <Header />
         {/* Adding 1px somehow make it works lol */}
         <div className="flex h-1 flex-1">
            <Sidebar />

            <div className="flex-1 bg-skin-base pe-4">
               <div className="h-full w-full overflow-hidden rounded-lg bg-skin-layout">
                  <div className="scrollbar h-full w-full overflow-y-auto px-12 py-5">{<Outlet />}</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DefaultLayout;
