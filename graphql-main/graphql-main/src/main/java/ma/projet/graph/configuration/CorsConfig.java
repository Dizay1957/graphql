package ma.projet.graph.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3000"); // Ajoutez l'origine de votre frontend
        corsConfiguration.addAllowedHeader("*"); // Permet tous les en-têtes
        corsConfiguration.addAllowedMethod("*"); // Permet toutes les méthodes (GET, POST, PUT, DELETE)
        corsConfiguration.setAllowCredentials(true); // Autorise les cookies si nécessaire

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}

