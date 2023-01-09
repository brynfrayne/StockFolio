package myspringportfolio.controller;
import myspringportfolio.model.Portfolio;
import myspringportfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import myspringportfolio.model.Asset;
import myspringportfolio.model.User;
import java.util.List;


@Controller
@RequestMapping("/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/")
    public String showtemplate(Portfolio portfolio, User user) {
        Long userId = user.getId();
        portfolioService.getAssets(userId);
        return "portfolioTemplate";
    }

    @DeleteMapping("/{id}")
    public void deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
    }

    @PostMapping
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.createPortfolio(portfolio);
    }

    @GetMapping("/{id}/assets")
    public List<Asset> getAssets(@PathVariable Long id) {
        return portfolioService.getAssets(id);
    }
}

