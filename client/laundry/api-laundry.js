const create = async (params, credentials, laundry) => {
    try {
      let response = await fetch('/api/laundry/by/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: laundry
      })
      console.log(response)
        return response.json()
      } catch(err) { 
        console.log(err)
      }
  }
  
  const list = async (signal) => {
    try {
      let response = await fetch('/api/laundry', {
        method: 'GET',
        signal: signal
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
  }
  
  const listByOwner = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/laundry/by/'+params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return response.json()
    }catch(err){
      console.log(err)
    }
  }
  
  const read = async (params, signal) => {
    try {
      let response = await fetch('/api/laundry/' + params.laundryId, {
        method: 'GET',
        signal: signal,
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, laundry) => {
    try {
      let response = await fetch('/api/laundry/' + params.laundryId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: laundry
      })
      return response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/laundry/' + params.laundryId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    create,
    list,
    listByOwner,
    read,
    update,
    remove
  }
  