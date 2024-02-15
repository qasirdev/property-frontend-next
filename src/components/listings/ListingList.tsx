'use client'
import { HomeProps, IListingsParams } from '@/app/page'
import React, { useEffect, useState } from 'react'
import ClientOnly from '../ClientOnly'
import EmptyState from '../EmptyState'
import ListingCard from './ListingCard'
import { useSession } from 'next-auth/react'
import { getListings } from '@/services/listing'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ListingList = (searchParameters:IListingsParams) => {
  
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category
    } = searchParameters;
    const { data: session } = useSession();
    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
      const params:IListingsParams = {
        userId,
        guestCount,
        roomCount,
        bathroomCount,
        startDate,
        endDate,
        locationValue,
        category
      };
      const fetchListings = async () => {
        setIsLoading(true);
        getListings(params)
        .then(res => {
              toast.success('Listing loaded!');
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
  
      fetchListings();
    }, []);

    if (!isLoading && (!listings || listings?.length === 0)) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }
  

  return (
    <>
      {listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
        />
      ))}
    </>
  )
}

export default ListingList