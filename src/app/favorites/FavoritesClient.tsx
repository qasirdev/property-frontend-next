'use client'
import React, { useEffect, useState } from 'react'

import ListingCard from "@/components/listings/ListingCard";
import { Container, Heading } from "@qasirdev/common-ui";
import { useSession } from 'next-auth/react';
import {getFavoriteListings} from "@/services/favoritelistings"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';

const FavoritesClient = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const {data: session} = useSession();

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      setIsLoading(true);
      getFavoriteListings({favoriteIds:session?.user?.favoriteIds})
      .then(res => {
          toast.success('favorite listings loaded!');
          router.refresh();
          const { data } = res;
          setListings(data)
        })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
    };
    const url = process.env.API_URL;
    if (session?.user?.favoriteIds) fetchFavoriteListings();
  }, [router, session?.user?.favoriteIds, session?.user?.id]);

  if (!isLoading && (!listings || listings?.length === 0)) {
      return (
        <ClientOnly>
          <EmptyState
            title="No favorites found"
            subtitle="Looks like you have no favorite listings."
          />
        </ClientOnly>
      );
    }

  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default FavoritesClient;
