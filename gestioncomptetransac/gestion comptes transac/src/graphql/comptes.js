import { gql } from '@apollo/client';

export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_COMPTE = gql`
  mutation AddCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id) {
      id  
    }
  }
`;
