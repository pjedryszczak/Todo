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
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Logging;

    [Authorize]
    [Produces("application/json")]
    [Route("api/[Controller]/[Action]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;
        public UsersController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AuthenticateAsync([FromBody]AuthenticateModel model)
        {
            var sanitizedUsername = Sanitize.SanitizeInput(model.Username);
            if(sanitizedUsername != model.Username)
            {
                return StatusCode((int)System.Net.HttpStatusCode.BadRequest, "Usernamed is incorrect");
            }
            var user = await _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return StatusCode((int)System.Net.HttpStatusCode.BadRequest, "Username or password is incorrect");

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
                IdentityModelEventSource.ShowPII = true;
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info and authentication token
                return Ok(new UserModel
                {
                    Id = user.Id,
                    Username = user.Username,
                    FirstName = user.FirstName,
                    Token = tokenString
                });
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterModel model)
        {
            var user = new User()
            {
                Username = Sanitize.SanitizeInput(model.Username),
                FirstName = Sanitize.SanitizeInput(model.FirstName)
            };
            if (user.FirstName != model.FirstName || user.Username != model.Username)
            {
                throw new Exception("Invalid character in Username and First Name");
            }
            try
            {
                // create user
                await _userService.Create(user, model.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return StatusCode((int)System.Net.HttpStatusCode.BadRequest, $"{ex.Message}");
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