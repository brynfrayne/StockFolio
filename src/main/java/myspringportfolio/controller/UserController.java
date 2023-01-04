package myspringportfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import myspringportfolio.model.User;
import myspringportfolio.service.UserService;
import java.util.List;
import java.time.LocalDate;

@Controller
@RequestMapping("/users")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping
  public String getUsers(Model model) {
    // Get all users from the database
    List<User> users = userService.getAllUsers();
    // Add the users to the model
    model.addAttribute("users", users);
    // Render the users template
    return "users";
  }

  @GetMapping("/add")
  public String addUserForm(Model model) {
    // Render the add user form template
    return "addUserForm";
  }

  @PostMapping("/add")
  public String addUser(@RequestParam String email, @RequestParam String password, @RequestParam String firstName,
    @RequestParam String lastName, @RequestParam LocalDate dateOfBirth, @RequestParam String phoneNumber,
    @RequestParam String address, @RequestParam String accountType) {

    // Create a new user object
    User user = new User();
    user.setEmail(email);
    user.setPassword(password);
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setDateOfBirth(dateOfBirth);
    user.setPhoneNumber(phoneNumber);
    user.setAddress(address);
    user.setAccountType(accountType);

    // Save the user to the database
    userService.addUser(user);

    // Redirect to the users page
    return "redirect:/users";
  }

  @GetMapping("/update")
  public String updateUserForm(@RequestParam Long id, Model model) {
    User user = userService.getUserById(id);
    model.addAttribute("user", user);
    return "updateUserForm";
  }

  @PostMapping("/update")
  public String updateUser(
      @RequestParam Long id,
      @RequestParam String email,
      @RequestParam String password,
      @RequestParam String firstName,
      @RequestParam String lastName,
      @RequestParam LocalDate dateOfBirth,
      @RequestParam String phoneNumber,
      @RequestParam String address,
      @RequestParam String accountType
  ) {
    User user = userService.getUserById(id);
    user.setEmail(email);
    user.setPassword(password);
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setDateOfBirth(dateOfBirth);
    user.setPhoneNumber(phoneNumber);
    user.setAddress(address);
    user.setAccountType(accountType);
    userService.updateUser(user);
    return "redirect:/users";
    }

    @GetMapping("/delete")
    public String deleteUser(@RequestParam Long id) {
    userService.deleteUser(id);
    return "redirect:/users";
    }
}
