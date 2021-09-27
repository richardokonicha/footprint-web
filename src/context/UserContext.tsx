import React from 'react'

const UserContext = React.createContext( "Default Value" )

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext