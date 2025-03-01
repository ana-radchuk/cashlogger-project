import AddCategory from "./components/category/AddCategory";
import Transaction from "./components/transaction/Transaction";
import CurrentBalance from "./components/balance/CurrentBalance";
import AddTransaction from "./components/transaction/AddTransaction";
import { DataProvider } from "./components/DataContext";

const App = () => {
  return (
    <div className="flex flex-col space-y-4">
      <DataProvider>
        <CurrentBalance />
        <Transaction />
        <AddTransaction />
        <AddCategory />
      </DataProvider>

      {/* <div>
        <Transaction />
      </div>
      <div>
        <AddTransaction />
      </div>
      <div>
        <AddCategory />
      </div> */}
      {/* <div>
        <CurrentBalance />
      </div> */}
    </div>

    // <div className="flex flex-col h-screen p-4 space-y-4">
    //   {/* Navigation bar */}
    //   <div className="border basis-10">Row 1</div>

    //   {/* Main body */}
    //   <div className="flex flex-1 space-x-4">

    //     {/* Left Column */}
    //     <div className="flex flex-col basis-1/3 space-y-4">
    //       <div className="flex-1 basis-1/3">
    //       <CurrentBalance />
    //       </div>
    //       <div className="flex-1 basis-2/3">
    //         <AddTransaction />
    //       </div>
    //     </div>

    //     {/* Right Column */}
    //     <div className="flex flex-col basis-2/3 space-y-4">
    //       <div className="flex flex-1 border basis-2/3 space-x-4">

    //         <div className="flex flex-col basis-2/4 space-y-4">
    //           <div className="border flex-1 basis-1/2">Box 2.1.1 up</div>
    //           <div className="border flex-1 basis-1/2">Box 2.1.1 bottom</div>
    //         </div>

    //         <div className="flex flex-col basis-2/4 space-y-4">
    //           <div className="border flex-1 basis-1/2">Box 2.1.2 up</div>
    //           <div className="border flex-1 basis-1/2">Box 2.1.2 bottom</div>
    //         </div>

    //         <div className="flex flex-col basis-2/5 space-y-4">
    //           <div className="border flex-1 basis-1/2">Box 2.1.3 up</div>
    //           <div className="border flex-1 basis-1/2">Box 2.1.3 bottom</div>
    //         </div>
    //       </div>
    //       <div className="border basis-1/3">Box 2.2</div>
    //     </div>
    //   </div>

    //   {/* Footer bar */}
    //   <div className="border basis-10">Row 2</div>
    // </div>
  );
};

export default App;
