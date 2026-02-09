import React, { useState } from 'react';

const LeetcodeCard = ({ 
  username = "codewithavijit_2004", 
  theme = "dark", 
  ext = "activity",
  width = "100%",
  hideBorder = false
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Construct the dynamic URL based on props
  // Docs for parameters: https://github.com/JacobLinCool/LeetCode-Stats-Card
  const baseUrl = "https://leetcard.jacoblin.cool";
  const params = new URLSearchParams({
    theme: theme,
    ext: ext, // 'activity' or 'contest' or leave empty
    font: "inter", // Optional: clearer font
  });
  
  if (hideBorder) params.append('hide_border', 'true');

  const imageUrl = `${baseUrl}/${username}?${params.toString()}`;
  const profileUrl = `https://leetcode.com/${username}/`;

  return (
    <div className="flex justify-center w-full p-4">
      {/* Clickable Wrapper */}
      <a 
        href={profileUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl rounded-lg overflow-hidden"
        style={{ maxWidth: '500px', width: width }}
      >
        
        {/* Loading Skeleton */}
        {loading && !error && (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading Stats...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full h-48 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center p-4 text-center">
            <p className="text-red-500 font-semibold">User Not Found</p>
            <p className="text-red-400 text-sm">Check username: {username}</p>
          </div>
        )}

        {/* The Card Image */}
        {!error && (
          <img 
            src={imageUrl} 
            alt={`${username} LeetCode Stats`}
            className={`w-full h-auto rounded-lg shadow-md object-contain transition-opacity duration-500 ${loading ? 'opacity-0 absolute top-0' : 'opacity-100'}`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}
      </a>
    </div>
  );
};

export default LeetcodeCard;