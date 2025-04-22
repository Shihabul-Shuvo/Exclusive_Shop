
const FeaturedBanner = () => {
  return (
    <div className="bg-black text-white py-16 my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="mb-4">
              <span className="text-[#e74c3c] font-medium">Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Enhance Your Music Experience</h2>
            
            <div className="flex gap-6 mb-8">
              <div className="flex flex-col items-center justify-center bg-white/10 rounded-full h-20 w-20 p-4">
                <span className="text-xl font-bold">23</span>
                <span className="text-xs">Hours</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 rounded-full h-20 w-20 p-4">
                <span className="text-xl font-bold">05</span>
                <span className="text-xs">Days</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 rounded-full h-20 w-20 p-4">
                <span className="text-xl font-bold">59</span>
                <span className="text-xs">Minutes</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 rounded-full h-20 w-20 p-4">
                <span className="text-xl font-bold">35</span>
                <span className="text-xs">Seconds</span>
              </div>
            </div>
            
            <button className="bg-[#00A76F] text-white py-3 px-8 rounded-md hover:bg-[#008f5d] transition-colors">
              Buy Now!
            </button>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="https://cdn.dummyjson.com/products/images/sports-accessories/Soundbox%20Mini%20Speaker/1.png" 
              alt="JBL Speaker"
              className="max-w-full h-auto md:max-h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
