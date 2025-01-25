import Category from "./components/Category";

const App = () => {
  return (
    <div>
        <Category />
    </div>


    // <div className="flex flex-col h-screen p-4 space-y-4">
    //   {/* Navigation bar */}
    //   <div className="border basis-10">Row 1</div>

    //   {/* Main body */}
    //   <div className="flex flex-1 space-x-4">

    //     {/* Left Column */}
    //     <div className="flex flex-col basis-1/4 space-y-4">         
    //       <div className="border flex-1 basis-1/3">Box 1.1</div>
    //       <div className="border flex-1 basis-1/2">Box 1.2</div>
    //       <div className="border flex-1 basis-1/2">Box 1.3</div>
    //     </div>

    //     {/* Right Column */}
    //     <div className="flex flex-col basis-3/4 space-y-4">
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
  )
}

export default App