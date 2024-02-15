export const postListings = (data,accessToken) => {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3009`;  
        fetch(`${url}/api/listings`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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

//here create new API end point with get listings action.
export const getListings = (data) => {
  const queryString = new URLSearchParams(data).toString();
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3009`;  
    fetch(`${url}/api/listings?${queryString}`, {
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

export const getListingById = (data) => {
  const { listingId } = data
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3009`;  
    fetch(`${url}/api/listings/${listingId}`, {
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

export const deleteListings = (data) => {
  const {listingId, accessToken, userId, provider} = data;
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3009`;
      fetch(`${url}/api/listings/${listingId}?userId=${userId}&provider=${provider}`, {
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