"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavs);
  }, []);

  const toggleFavorite = (product: any) => {
    let updatedFavs;
    if (favorites.find((item) => item.id === product.id)) {
      updatedFavs = favorites.filter((item) => item.id !== product.id);
    } else {
      updatedFavs = [...favorites, product];
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <div style={{ padding: 300 }}>
      <h1> Enhjin Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "",
              border: "5px solid #ddd",
              padding: 10,
            }}
          >
            <img src={p.image} alt={p.title} width="100" />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <button onClick={() => toggleFavorite(p)}>
              {favorites.find((item) => item.id === p.id)
                ? "◉ Favorite"
                : "◎ Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
