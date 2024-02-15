'use client'
import { ClientOnly } from "@qasirdev/common-ui";
import TripsClient from "./ReservationsClient";

const ReservationsPage = () => {
  return (
    <ClientOnly>
      <TripsClient />
    </ClientOnly>
  );
}
 
export default ReservationsPage;
