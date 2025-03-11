// test


// Imports the Listings component from the Listings.tsx file
import Listings from "./components/Listings";

// defines a react component named Home. Next.js will automatically render this component on the page
export default function Home() {
  // Returns JSX that react uses to render the DOM
  return (
    <div>
      <h1>SemiSolution</h1>
      <p>Welcome to the best place to buy and sell semiconductor and IT equipment</p>

      {/* Displays the Listings component */}
      <Listings />
      
    </div>
  );
}