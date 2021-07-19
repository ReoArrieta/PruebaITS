using Backend.Models;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ITSCTX _db = new();
        private readonly Response _res = new();

        [HttpGet]
        public IActionResult Read()
        {
            try
            {
                using (_db)
                {
                    var data = _db.Products.Where(p => p.IdState != 3).ToList();
                    _res.Data = data;
                    _res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }
        [HttpGet("optimal")]
        public IActionResult ReadOptimal()
        {
            try
            {
                using (_db)
                {
                    var data = _db.Products.Where(p => p.IdState == 1).ToList();
                    _res.Data = data;
                    _res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }
        [HttpGet("defective")]
        public IActionResult ReadDefective()
        {
            try
            {
                using (_db)
                {
                    var data = _db.Products.Where(p => p.IdState == 2).ToList();
                    _res.Data = data;
                    _res.Exito = 1;
                }
            }
            catch (Exception e)
            {
                _res.Message = e.Message;
            }
            return Ok(_res);
        }

        [HttpPut]
        public IActionResult Update(ProductRequest model)
        {
            try
            {
                using (_db)
                {
                    Product product = _db.Products.Find(model.Id);
                    product.Name = model.Name;
                    product.Image = model.Image;
                    product.IdState = model.IdState;
                    _db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
    }
}
