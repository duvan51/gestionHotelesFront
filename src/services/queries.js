import { gql } from "@apollo/client";

export const GET_USERS_ALOJAMIENTOS = gql`
  query GetUsers {
    getUsers {
      id
      Name
      Alojamientos {
        id
        title
        ciudad
        description
        departamento
        ciudad
        imagePrincipal
        images
        numberPhone
        pais
        whattsap
      }
      
    }
  }
`;
export const GET_USERS_BY_ID = gql`
  query GetUser($id: ID!) {
    getUserById(id: $id) {
      id
      Name
      Alojamientos {
        id
        title
      }
    }
  }
`;

export const GET_USERS_uniq = gql`
  query GetUser {
    getUser {
      id
      Name
      lastName
      email
      dateBirth
      photo
      Alojamientos {
        id
        title
        ciudad
        description
        departamento
        ciudad
        imagePrincipal
        images
        numberPhone
        pais
        whattsap
        typeOfHabitacion {
          nameOfHabitacion
          numberHabitacions
          numbersCama
          price
          id
          alojamientoId
        }
      }
      Reservas {
        id
        payment
        daysAlojamientos
        paymentTotal
        birthCheking
        birthCheckout
        userId
        payment
        status
        alojamientoId
        ReservaAlojamientos {
          id
          daysReserva
          id_habitacion
          price
          reservaId
        }
      }
    }
  }
`;

export const GET_ALOJAMIENTOS = gql`
  query GetAlojamientos {
    getAlojamientos {
      id
      title
      ciudad
      description
      departamento
      ciudad
      imagePrincipal
      images
      numberPhone
      pais
      whattsap
    }
  }
`;
export const GET_ALOJAMIENTO_ID = gql`
  query GetAlojamientoById($id: ID!) {
    getAlojamientoById(id: $id) {
      id
      title
      description
      departamento
      imagePrincipal
      numberPhone
      pais
      ubicacion
      whattsap
      typeOfHabitacion {
        nameOfHabitacion
        numberHabitacions
        numbersCama
        price
        id
        alojamientoId
      }
    }
  }
`;
export const Add_Alojamiento = gql`
  mutation CreateAlojamientos(
    $title: String!
    $description: String!
    $imagePrincipal: String!
    $images: String!
    $ubicacion: String!
    $pais: String!
    $departamento: String!
    $ciudad: String!
    $numberPhone: String!
    $habitacionesTypeIdFk: Int!
    $alojamientosTypeIdFk: Int!
    $whattsap: String!
    $userId: Int!
  ) {
    createAlojamientos(
      title: $title
      description: $description
      imagePrincipal: $imagePrincipal
      images: $images
      ubicacion: $ubicacion
      pais: $pais
      departamento: $departamento
      ciudad: $ciudad
      numberPhone: $numberPhone
      habitaciones_type_id_fk: $habitacionesTypeIdFk
      alojamientos_type_id_fk: $alojamientosTypeIdFk
      whattsap: $whattsap
      userId: $userId
    ) {
      title
      imagePrincipal
    }
  }
`;

export const Add_User = gql`
  mutation (
    $name: String!
    $lastName: String!
    $dateBirth: String!
    $historySearch: String!
    $identificacion: String!
    $email: String!
    $photo: String!
    $password: String!
  ) {
    createUser(
      Name: $name
      lastName: $lastName
      dateBirth: $dateBirth
      historySearch: $historySearch
      identificacion: $identificacion
      email: $email
      photo: $photo
      password: $password
    ) {
      Name
      email
    }
  }
`;

export const Add_Room = gql`
  mutation (
    $numberHabitacion: Int!
    $nameOfHabitacion: String!
    $numbersCama: Int!
    $price: String!
    $alojamientoId: String!
  ) {
    createTypeOfHabitacion(
      numberHabitacions: $numberHabitacion
      nameOfHabitacion: $nameOfHabitacion
      numbersCama: $numbersCama
      price: $price
      alojamientoId: $alojamientoId
    ) {
      nameOfHabitacion
      price
    }
  }
`;
export const Add_Reserva = gql`
  mutation (
    $payment: Int!
    $birthCheking: String!
    $birthCheckout: String!
    $daysAlojamientos: Int!
    $paymentTotal: Int!
    $userId: Int!
    $alojamientoId: Int!
    $status: String!
  ) {
    createReserva(
      payment: $payment
      birthCheking: $birthCheking
      birthCheckout: $birthCheckout
      daysAlojamientos: $daysAlojamientos
      paymentTotal: $paymentTotal
      userId: $userId
      alojamientoId: $alojamientoId
      status: $status
    ) {
      id
      payment
      daysAlojamientos
      paymentTotal
      birthCheking
      birthCheckout
      status
    }
  }
`;
export const Add_Reserva_Alojamiento = gql`
  mutation (
    $reservaId: Int!
    $id_habitacion: Int!
    $price: String!
    $daysReserva: Int!
    $alojamientoId: String!
  ) {
    createReservaAlojamiento(
      reservaId: $reservaId
      id_habitacion: $id_habitacion
      price: $price
      alojamientoId: $alojamientoId
      daysReserva: $daysReserva
    ) {
      reservaId
      id_habitacion
      price
      daysReserva
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation DeleteRoom($id: ID!) {
    deleteTypeOfHabitacion(id: $id)
  }
`;
export const DELETE_ALOJAMIENTO = gql`
  mutation deleteAlojamientos($id: ID!) {
    deleteAlojamientos(id: $id)
  }
`;

export const DELETE_RESERVA = gql`
  mutation deleteReserva($id: ID!) {
    deleteReserva(id: $id)
  }
`;

export const Login_User = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        Name
        id
        Alojamientos {
          id
          title
        }
      }
    }
  }
`;
