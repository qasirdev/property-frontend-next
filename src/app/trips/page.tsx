'use client'
import { ClientOnly } from "@qasirdev/common-ui";
const getCurrentUser = () => null;
const getReservations = () => {};

import TripsClient from "./TripsClient";

const TripsPage = () => {
  return (
    <ClientOnly>
      <TripsClient />
    </ClientOnly>
  );
}
 
export default TripsPage;
