import { useEffect, useState } from "react";

import { fetchLaunches } from "../api/axios/spacex";
import { removeDuplicate } from "../lib/utils";
import LaunchCard from "./LaunchCard";

export default function Launches() {
  const limit = 10;
  const [launches, setLaunches] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    async function init() {
      const launches = await fetchLaunches({
        limit,
        offset: page * limit,
      }) as any[];
      setLaunches((prev) => removeDuplicate([...prev, ...launches]).map(i => JSON.parse(i)));
      if (launches.length < limit) setHasMore(false);
    }
    init();
  }, [page]);

  return (
    <div className="max-w-xl grid gap-4">
      <h1>SpaceX Launches</h1>
      <div className="grid gap-4">
        {launches.map((launch) => <LaunchCard key={`${launch.flight_number} ${launch.mission_name}`} launch={launch} />)}
      </div>
      <div>
        {hasMore ? (
        <button
          disabled={!hasMore}
          onClick={() => {
            if (hasMore) setPage((prev) => prev + 1);
          }}
        >
          Load More
        </button>) : (
            <p>No additional results.</p>
        )}
      </div>
    </div>
  );
}
