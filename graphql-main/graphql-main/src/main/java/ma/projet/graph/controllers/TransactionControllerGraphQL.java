package ma.projet.graph.controllers;

import lombok.AllArgsConstructor;
import ma.projet.graph.entities.Compte;
import ma.projet.graph.entities.Transaction;
import ma.projet.graph.entities.TypeTransaction;
import ma.projet.graph.repositories.CompteRepository;
import ma.projet.graph.repositories.TransactionRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@AllArgsConstructor
public class TransactionControllerGraphQL {

    private final TransactionRepository transactionRepository;
    private final CompteRepository compteRepository;


    @MutationMapping
    public Transaction saveTransaction(
            @Argument Long compteId,
            @Argument TypeTransaction type,
            @Argument double montant) {

        // Retrieve the account by its ID
        Compte compte = compteRepository.findById(compteId)
                .orElseThrow(() -> new RuntimeException("Compte not found"));

        // Handle insufficient funds for withdrawal transactions
        if (type == TypeTransaction.RETRAIT && compte.getSolde() < montant) {
            throw new RuntimeException("Solde insuffisant pour le retrait");
        }

        // Create a new transaction and set its properties
        Transaction transaction = new Transaction();
        transaction.setCompte(compte);
        transaction.setType(type);
        transaction.setMontant(montant);
        transaction.setDateTransaction(LocalDateTime.now());  // Use LocalDateTime.now() for the date transaction

        // Update the account balance based on transaction type
        if (type == TypeTransaction.RETRAIT) {
            compte.setSolde(compte.getSolde() - montant);
        } else if (type == TypeTransaction.DEPOT) {
            compte.setSolde(compte.getSolde() + montant);
        }

        // Save the updated account balance and transaction
        compteRepository.save(compte);  // Save the updated compte with the new balance
        return transactionRepository.save(transaction);  // Save the transaction
    }

    @QueryMapping
    public List<Transaction> allTransactions() {
        return transactionRepository.findAll();
    }

    @QueryMapping
    public Transaction transactionById(@Argument Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @MutationMapping
    public String deleteTransaction(@Argument Long id) {
        // Find the transaction by ID
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Delete the transaction from the repository
        transactionRepository.delete(transaction);
        return String.format("Transaction avec ID %d supprimée avec succès", id);
    }
}
