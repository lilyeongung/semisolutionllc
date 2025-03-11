"use client";

import { useState, useEffect } from "react";

type Listing = { id: number; title: string; description: string; price: number };

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const addListing = async () => {
    if (title && price) {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price: Number(price) }),
      });
      const newListing = await res.json();
      setListings([...listings, newListing]);
      setTitle("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Listings</h2>
      <div className="my-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Equipment Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 mr-2"
        />
        <button onClick={addListing} className="bg-blue-500 text-white p-2">
          Add Listing
        </button>
      </div>
      <ul className="list-disc pl-5">
        {listings.map((listing) => (
          <li key={listing.id} className="my-2">
            {listing.title} - {listing.description} - ${listing.price}
            <button className="ml-4 bg-green-500 text-white p-1">Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}