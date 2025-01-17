const Button = () => {
    return (
        <div>
            <button
                className="bg-[rgb(37,47,49)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={() => alert("Button 1 clicked")}
            >
            Button 1
            </button>

            <button
                className="bg-[rgb(108,155,195)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => alert("Button 2 clicked")}
            >
            Button 2
            </button>

            <button
                className="bg-[rgb(217,220,219)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => alert("Button 3 clicked")}
            >
            Button 3
            </button>

            <button
                className="bg-[rgb(72,83,87)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => alert("Button 4 clicked")}
            >
            Button 4
            </button>
    </div>
    )
  }
  
  export default Button