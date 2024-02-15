'use client';

import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/types"
;
import { Heading } from "@qasirdev/common-ui";
import { Container } from "@qasirdev/common-ui";
import ListingCard from "@/components/listings/ListingCard";
import {deleteReservation, getReservations} from "@/services/reservation";

import React from 'react'
import { useSession } from "next-auth/react";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";

const ReservationsClient = () => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const {data: session} = useSession();
  const currentUser = session?.user;

    useEffect(() => {
      const fetchReservations = async () => {
        setIsLoading(true);
        getReservations({authorId:session?.user?.id})
        .then(res => {
              toast.success('Reservations loaded!');
              router.refresh();
              const { data } = res;
              setReservations(data)
          })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      };
  
      if (session?.user?.id) fetchReservations();
    }, [router, session?.user?.id]);
  

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    setIsLoading(true);
    deleteReservation({
      reservationId:id,
      accessToken:currentUser.accessToken,
      userId:currentUser.id,
      provider:currentUser.provider
    })
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
      setIsLoading(true);
    })
  }, [currentUser.accessToken, currentUser.id, currentUser.provider, router]);

  if (!session?.user) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  if (!isLoading && (!reservations || reservations?.length === 0)) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
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
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationsClient;