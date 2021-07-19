using Backend.Models;
using Backend.Models.Common;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Tools;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITSCTX _db = new();
        private readonly Response _res = new();
        private readonly UserResponse _UserRes = new();
        private readonly AppSettings _appSettings;
        public AuthController(IOptions<AppSettings> appSettings) => _appSettings = appSettings.Value;

        [HttpPost("signin")]
        public IActionResult Signin(AuthRequest model)
        {
            try
            {
                using (_db)
                {
                    string passwordEncrypt = Encrypt.GetSHA256(model.Password);
                    var user = _db.Users.Where(u => u.Email == model.Email && u.Password == passwordEncrypt).FirstOrDefault();
                    if (user != null)
                    {
                        _UserRes.Username = user.Username;
                        _UserRes.Token = GetToken(user);
                        /*Guardamos el token en la base de datos para
                        validar que solo inicie sesion una sola vez*/
                        user.Jwt = Encrypt.GetSHA256(_UserRes.Token);
                        _db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        _db.SaveChanges();

                        _res.Data = _UserRes;
                        _res.Exito = 1;
                    }
                    else _res.Message = "Usuario y/o contraseña incorrecto";
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }

        [HttpPost("signup")]
        public IActionResult Signup(UserRequest model)
        {
            try
            {
                using (_db)
                {
                    string passwordEncrypt = Encrypt.GetSHA256(model.Password.Trim());
                    User user = new();
                    user.Name = model.Name.Trim();
                    user.Surname = model.Surname.Trim();
                    user.Identification = model.Identification.Trim();
                    user.Username = model.Username.Trim();
                    user.Email = model.Email.Trim();
                    user.Password = passwordEncrypt;
                    _db.Users.Add(user);
                    _db.SaveChanges();

                    _res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }

        [HttpGet("{jwt}")]
        public IActionResult ReadUser(string jwt)
        {
            try
            {
                using (_db)
                {
                    string EncriptJWT = Encrypt.GetSHA256(jwt);
                    var data = _db.Users.Where(p => p.Jwt == EncriptJWT).ToList();
                    if (data.Count > 0)
                    {
                        _res.Data = data;
                        _res.Exito = 1;
                    }
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }


        #region Tools
        private string GetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var llave = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Identification),
                        new Claim(ClaimTypes.NameIdentifier, user.Username),
                        new Claim(ClaimTypes.NameIdentifier, user.Email)
                    }
                    ),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llave), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        #endregion
    }
}
