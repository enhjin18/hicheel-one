"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavs);
  }, []);

  const toggleFavorite = (product: Product) => {
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
    <div style={{ padding: 20 }}>
      <h1>Enhjin Store</h1>

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
              border: "1px solid #ddd",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Image src={p.image} alt={p.title} width={150} height={150} />
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
