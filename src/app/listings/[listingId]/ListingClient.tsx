'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';

import useLoginModal from "@/hooks/useLoginModal";

import { Container } from "@qasirdev/common-ui";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

import React from 'react'
import { useSession } from "next-auth/react";
import { getReservations, postResrvations } from "@/services/reservation";
import { getListingById } from "@/services/listing";
import { IParams } from "./page";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";

const ListingClient = ({ params }: { params: IParams }) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [listing, setListing] = useState([]);
  const [reservations, setReservations] = useState([]);
  const {data: session} = useSession();
  const currentUser = session?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    const fetchListingById = async () => {
      setIsLoading(true);
      getListingById({listingId:params.listingId})
      .then(res => {
            toast.success('listing loaded!');
            router.refresh();
            const { data } = res;
            setListing(data)
        })
      .catch((e) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
    };

    if (session?.user?.id) fetchListingById();
  }, [params.listingId, router, session?.user?.id]);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      getReservations({listingId:params.listingId})
      .then(res => {
            toast.success('Reservations loaded!');
            router.refresh();
            const { data } = res;
            setReservations(data)
        })
      .catch((e) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
    };

    if (session?.user?.id) fetchReservations();
  }, [params.listingId, router, session?.user?.id]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);


  const onCreateReservation = useCallback(() => {
      if (!session?.user) {
        return loginModal.onOpen();
      }
      setIsLoading(true);
      postResrvations({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        accessToken:currentUser.accessToken,
        userId:currentUser.id,
        provider:currentUser.provider
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch((e) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [dateRange.endDate, dateRange.startDate, listing?.id, loginModal, router, session?.user, totalPrice]);

  useEffect(() => {
    if (listing && dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing]);

  if (!isLoading && (!listing || listing?.length === 0))
  {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  if (!isLoading && (!reservations || reservations?.length === 0))
  {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={session?.user}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
