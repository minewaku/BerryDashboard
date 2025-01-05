import { Posts } from '~/pages';

const Dashboard = () => {
   return (
      <div className="flex h-full flex-col gap-4">
         <div className="flex w-full flex-row gap-4">
            <Posts />
         </div>
      </div>
   );
};

export default Dashboard;
