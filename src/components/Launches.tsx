import { useCallback, useEffect, useState } from "react";

import { fetchLaunches } from "../api/axios/spacex";
import { removeDuplicate } from "../lib/utils";
import LaunchCard from "./LaunchCard";
import LoadingComponent from "./Loading/component";

export default function Launches() {
  const limit = 10;
  const [launches, setLaunches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  function incrementPage() {
    setPage((prev) => prev + 1);
  }

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loading) incrementPage();
    }
  );

  const loadMoreRef = useCallback((node: HTMLDivElement) => {
    if (node) observer.observe(node);
  }, []);

  useEffect(() => {
    async function loadMore() {
      setLoading(true);
      const launches = (await fetchLaunches({
        limit,
        offset: page * limit,
      })) as any[];
      setLaunches((prev) =>
        removeDuplicate([...prev, ...launches]).map((i) => JSON.parse(i))
      );
      if (launches.length < limit) setHasMore(false);
      setLoading(false);
    }
    loadMore();
  }, [page]);

  return (
    <div className="max-w-xl grid gap-4">
      <h1>SpaceX Launches</h1>
      <div className="grid gap-4">
        {launches.map((launch) => (
          <LaunchCard
            key={`${launch.flight_number} ${launch.mission_name}`}
            launch={launch}
          />
        ))}
      </div>
      <div>
        {hasMore ? (
          <div ref={loadMoreRef}>
            <LoadingComponent />
          </div>
        ) : (
          <p>No additional results.</p>
        )}
      </div>
    </div>
  );
}
