export const deleteFavoriteListing = (data:any) => {
  const {favoriteIds, listingId, accessToken, userId, provider} = data;
  const favoriteIdsObject = {
    "favoriteIds": favoriteIds
  };
  const queryString = new URLSearchParams(favoriteIdsObject).toString();
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3009`;
        fetch(`${url}/api/favorites/${listingId}?userId=${userId}&provider=${provider}&${queryString}`, {
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

export const postFavoriteListing = (data:any) => {
  const {favoriteIds, listingId, accessToken, userId, provider} = data;
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3009`;
      fetch(`${url}/api/favorites/${listingId}?userId=${userId}&provider=${provider}`, {
        method: 'POST',
        body: JSON.stringify({ favoriteIds }),
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

export const getFavoriteListings = (data:any) => {
  const queryString = new URLSearchParams(data).toString();
  return new Promise((resolve, reject) => {
    const ur = process.env.API_URL;
      const url = `http://localhost:3009`;  
      fetch(`${url}/api/favorites?${queryString}`, {
          method: 'GET',
          cache: "no-cache",
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
