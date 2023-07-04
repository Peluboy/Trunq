import React, { useEffect, useState } from "react";
import axios from "axios";

const OpenGraphPreview = ({ longUrl }: { longUrl: string }) => {
  const [ogData, setOgData] = useState<{
    hybridGraph: { title: string; image: string; description: string };
  } | null>(null);

  useEffect(() => {
    if (longUrl) {
      fetchOpenGraphData(longUrl);
    }
  }, [longUrl]);

  const fetchOpenGraphData = async (url: string) => {
    try {
      const response = await axios.get(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}`
      );
      setOgData(response.data);
    } catch (error) {
      console.error("Error fetching Open Graph data:", error);
    }
  };

  return (
    <div>
      {ogData ? (
        <div>
          <h2>{ogData.hybridGraph.title}</h2>
          {ogData.hybridGraph.image && (
            <img
              src={ogData.hybridGraph.image}
              alt={ogData.hybridGraph.title}
            />
          )}
          {ogData.hybridGraph.description && (
            <p>{ogData.hybridGraph.description}</p>
          )}
        </div>
      ) : (
        <p>Loading Open Graph data...</p>
      )}
    </div>
  );
};

export default OpenGraphPreview;
