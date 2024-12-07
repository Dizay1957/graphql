import { gql } from '@apollo/client';

// Query pour récupérer tous les comptes
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

// Query pour récupérer toutes les transactions
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
      id
      montant
      dateTransaction
      type
      compte {
        id
      }
    }
  }
`;

// Mutation pour ajouter une transaction
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($compteId: ID!, $type: TypeTransaction!, $montant: Float!) {
    saveTransaction(compteId: $compteId, type: $type, montant: $montant) {
      id
      montant
      dateTransaction
      type
      compte {
        id
      }
    }
  }
`;

// Mutation pour supprimer une transaction
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
