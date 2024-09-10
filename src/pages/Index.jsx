import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const fetchTopAssets = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topAssets'],
    queryFn: fetchTopAssets,
  });

  if (isLoading) return <div className="text-center text-2xl font-bold mt-10">Loading...</div>;
  if (error) return <div className="text-center text-2xl font-bold mt-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-yellow-200 p-8">
      <h1 className="text-5xl font-black mb-8 text-center bg-black text-white p-4">Top 50 Crypto Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((asset) => (
          <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-6">
              <h2 className="text-2xl font-bold mb-2">{asset.name} ({asset.symbol})</h2>
              <p className="text-xl font-semibold mb-2">Rank: {asset.rank}</p>
              <p className="text-lg mb-2">Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
              <p className="text-lg mb-2">Market Cap: ${parseInt(asset.marketCapUsd).toLocaleString()}</p>
              <p className={`text-lg flex items-center ${parseFloat(asset.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                24h Change: 
                {parseFloat(asset.changePercent24Hr) >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 ml-1" />
                )}
                {parseFloat(asset.changePercent24Hr).toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;