'use client';

import { useState, useEffect } from 'react';

interface Profile {
  id: string;
  name: string;
  bio: string;
  // ... other profile fields
}

export default function ProfileComponent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      {/* Render other profile information */}
    </div>
  );
}