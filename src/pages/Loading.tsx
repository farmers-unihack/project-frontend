import coffeeShopGif from '../assets/coffee_gif.gif';

function Loading() {
  return (
    <div style={{ backgroundColor: '#472200' }} className="min-h-screen flex flex-col 
                    items-center justify-center overflow-x-hidden"
    >
      <img 
          src={coffeeShopGif} 
          alt="Coffee Loading Gif" 
          className="w-auto h-50" 
        />
              <h1 style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-white text-l font-bold">Loading ...</h1>
    </div>
  );
}

export default Loading;
