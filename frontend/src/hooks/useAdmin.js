import { useEffect, useState, useCallback } from "react";
import { fetchUsers, fetchStores, fetchStoreRatings } from "../api/apis";

export default function useAdminData() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [uRes, sRes] = await Promise.all([fetchUsers(), fetchStores()]);
      setUsers(uRes);
      setStores(sRes);

      const ratingsCounts = await Promise.all(
        sRes.map((store) => fetchStoreRatings(store.id))
      );
      const totalRatings = ratingsCounts.reduce(
        (acc, r) => acc + (r.length || 0),
        0
      );

      setStats({
        users: uRes.length,
        stores: sRes.length,
        ratings: totalRatings,
      });
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { stats, users, stores, loading, error, refresh: fetchData };
}
