package myspringportfolio.controller;
import myspringportfolio.model.Portfolio;
import myspringportfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import myspringportfolio.model.Asset;
import java.util.List;


@Controller
@RequestMapping("/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
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

    @PostMapping("/{id}/assets")
    public Asset addAsset(@PathVariable Long id, @RequestBody Asset asset) {
        return portfolioService.addAsset(id, asset);
    }

    @PutMapping("/{portfolioId}/assets/{assetId}")
    public Asset updateAsset(@PathVariable Long portfolioId, @PathVariable Long assetId, @RequestBody Asset asset) {
        return portfolioService.updateAsset(portfolioId, assetId, asset);
    }

    @DeleteMapping("/{portfolioId}/assets/{assetId}")
    public void deleteAsset(@PathVariable Long portfolioId, @PathVariable Long assetId) {
        portfolioService.deleteAsset(portfolioId, assetId);
    }



}

// @GetMapping
//     public String getAllPortfolios(Model model) {
//         List<Portfolio> portfolios = portfolioService.getAllPortfolios();
//         model.addAttribute("portfolios", portfolios);
//         return "portfolios";
//     }

    // @GetMapping("/{id}")
    // public String getPortfolioById(@PathVariable Long id, Model model) {
    //     Portfolio portfolio = portfolioService.getPortfolioById(id);
    //     model.addAttribute("portfolio", portfolio);
    //     return "portfolio";
    // }

    // @GetMapping("/create")
    // public String createPortfolioForm(Model model) {
    //     model.addAttribute("portfolio", new Portfolio());
    //     return "createPortfolioForm";
    // }

    // @PostMapping("/create")
    // public String createPortfolio(@ModelAttribute Portfolio portfolio) {
    //     portfolioService.createPortfolio(portfolio);
    //     return "redirect:/portfolios";
    // }

    // @GetMapping("/update")
    // public String updatePortfolioForm(@RequestParam Long id, Model model) {
    //     Portfolio portfolio = portfolioService.getPortfolioById(id);
    //     model.addAttribute("portfolio", portfolio);
    //     return "updatePortfolioForm";
    // }

    // @PostMapping("/update")
    // public String updatePortfolio(@ModelAttribute Portfolio portfolio) {
    //     portfolioService.updatePortfolio(portfolio);
    //     return "redirect:/portfolios";
    // }

    // @GetMapping("/delete")
    // public String deletePortfolio(@RequestParam Long id) {
    //     portfolioService.deletePortfolio(id);
    //     return "redirect:/portfolios";
    // }
