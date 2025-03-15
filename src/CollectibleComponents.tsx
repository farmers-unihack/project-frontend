import React, { useState, useEffect } from 'react';
import { collectibles as allCollectibles, Collectible } from './collectibles';

const CollectibleComponents = () => {
  // TODO: harcoded, i assume that we can get a list similar to this from api call??
  const backendCollectibles = ["Item 1", "Item 2", "Item 3"];
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);

  useEffect(() => {
    const filtered = allCollectibles.filter((item) =>
      backendCollectibles.includes(item.name)
    );
    setCollectibles(filtered);
  }, []);

  return (
    <div className="absolute inset-0 z-29 pointer-events-none">
      {collectibles.map((collectible, index) => (
        <img
          key={index}
          src={collectible.image}
          alt={collectible.name}
          className="absolute w-[50px] h-[50px]"
          style={{
            top: collectible.position.top,
            left: collectible.position.left,
          }}
        />
      ))}
    </div>
  );
};

export default CollectibleComponents;
