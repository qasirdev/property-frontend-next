export const postResrvations = (data) => {
  const {totalPrice, startDate, endDate, listingId, accessToken, userId, provider} = data;
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3009`;  
      fetch(`${url}/api/reservations`, {
          method: 'POST',
          body: JSON.stringify({ totalPrice, startDate, endDate, listingId, userId, provider }),
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": accessToken
          }
      })
          .then(res => {
              res
                  .json()
                  .then(json => resolve(json))
                  .catch(e => reject(e))
          })
          .catch(e => reject(e))
    })
}

export const getReservations = (data) => {
  const queryString = new URLSearchParams(data).toString();
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3009`;  
    fetch(`${url}/api/reservations?${queryString}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            res
                .json()
                .then(json => resolve(json))
                .catch(e => reject(e))
        })
        .catch(e => reject(e))
  })
}

export const deleteReservation = (data) => {
  const {reservationId, accessToken, userId, provider} = data;
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3009`;
      fetch(`${url}/api/reservations/${reservationId}?userId=${userId}&provider=${provider}`, {
          method: 'DELETE',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": accessToken
          }
      })
          .then(res => {
              res
                  .json()
                  .then(json => resolve(json))
                  .catch(e => reject(e))
          })
          .catch(e => reject(e))
    })
}