'use client';

import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import { useSession } from "next-auth/react";
import { deleteListings, getListings } from "@/services/listing";
import { ClientOnly } from "@qasirdev/common-ui";
import EmptyState from "@/components/EmptyState";

const PropertiesClient = () => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {data: session} = useSession();
  const currentUser = session?.user

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      getListings({userId:session?.user.id})
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

    // fetchListings();
    if (session?.user?.id) fetchListings();
  }, [router, session?.user.id]);

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    setIsLoading(true);
    deleteListings({
      listingId:id,
      accessToken:currentUser.accessToken,
      userId:currentUser.id,
      provider:currentUser.provider
    })
    // axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
      setIsLoading(false);
    })
  }, [currentUser.accessToken, currentUser.id, currentUser.provider, router]);

  if (!isLoading && (!listings || listings?.length === 0))
  {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return ( 
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
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
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
   );
}
 
export default PropertiesClient;