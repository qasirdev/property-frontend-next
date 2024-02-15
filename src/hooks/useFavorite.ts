import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/types";
import { deleteFavoriteListing, getFavoriteListings, postFavoriteListing } from "@/services/favoritelistings";
import { Session } from "next-auth";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | Session | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        deleteFavoriteListing({
          favoriteIds:currentUser?.favoriteIds,
          listingId,
          accessToken:currentUser.accessToken,
          userId:currentUser.id,
          provider:currentUser.provider
        })
          .then(res => {
            toast.success('favorite delete listing loaded!');
            router.refresh();
          })
        .catch((e) => {
          toast.error('Something went wrong.');
        })
      } else {
        postFavoriteListing({
          favoriteIds:currentUser?.favoriteIds,
          listingId,accessToken:currentUser.accessToken,
          userId:currentUser.id,
          provider:currentUser.provider
        })
          .then(res => {
            toast.success('favorite delete listing loaded!');
            router.refresh();
          })
        .catch((e) => {
          toast.error('Something went wrong.');
        })
      }

    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
