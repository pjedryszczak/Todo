namespace TodoApp.Controllers
{
    using TodoApp.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using TodoApp.Services;
    using WebApi.Models.Users;
    using System.IdentityModel.Tokens.Jwt;
    using System.Text;
    using TodoApp.Helpers;
    using Microsoft.IdentityModel.Tokens;
    using System.Security.Claims;

    [Authorize]
    [Produces("application/json")]
    [Route("api/[Controller]/[Action]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var user = await _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                Token = tokenString
            });
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var user = new User
            {
                Username = model.Username,
                FirstName = model.FirstName
            };

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(long id)
        {
            var user = await _userService.GetById(id);
            var model = new UserModel { 
            FirstName = user.FirstName,
            Username = user.Username,
            Id = user.Id
            };
            return Ok(model);
        }

    }
}