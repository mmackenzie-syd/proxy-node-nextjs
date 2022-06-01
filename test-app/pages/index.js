import { useEffect, useState } from "react";

// Server side page is first rendered and then updated

export default function Home({ animals }) {
  const [_animals, setAnimals] = useState(animals);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          const res = await fetch("http://localhost:3080/api/birds");
          // Cast value to json object
          const birds = await res.json();
          setAnimals(birds);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h3>Home Page</h3>
      {loading && <p>...loading</p>}
      <ul>
        {_animals.map((el, key) => (
          <li key={key} style={{ marginBottom: "5px" }}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  // API fetching
  const res = await fetch("http://localhost:3080/api/pets");

  // Cast value to json object
  const animals = await res.json();
  return {
    // Sending animals to page
    props: { animals: animals },
  };
};
