import {
  createContext,
  useState,
  useEffect,
} from "react"

import type { ReactNode } from "react"


import api from "../api/axios";

interface User {
  telephone: string
}

interface AuthContextType {

  user: User | null

  login: (
    phone: string,
    password: string
  ) => Promise<void>

  logout: () => void
}

export const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  )

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {

  const [user, setUser] =
    useState<User | null>(null)

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user")

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      )
    }

  }, [])

  const login = async (
    phone: string,
    password: string
  ) => {

    const res =
      await api.post(
        "/auth/login",
        {
          telephone: phone,
          password,
        }
      )

    const user =
      res.data.user

    const token =
      res.data.token

    setUser(user)

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    )

    localStorage.setItem(
      "token",
      token
    )
  }

  const logout = () => {

    setUser(null)

    localStorage.removeItem(
      "user"
    )

    localStorage.removeItem(
      "token"
    )
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}