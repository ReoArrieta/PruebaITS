using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputController : ControllerBase
    {
        private readonly ITSCTX _db = new();
        private readonly Response _res = new();

        [HttpPost]
        public IActionResult Create(OutputRequest model)
        {
            try
            {
                using (_db)
                {

                    Output output = new();
                    output.IdProduct = model.IdProduct;
                    output.Quantity = model.Quantity;
                    output.Date = DateTime.Now;
                    output.IdUser = model.IdUser;
                    _db.Outputs.Add(output);
                    _db.SaveChanges();

                    Product product = _db.Products.Find(model.IdProduct);
                    product.Quantity -= output.Quantity;
                    if (product.Quantity == 0) product.IdState = 3;
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

        [HttpGet]
        public IActionResult Read()
        {
            try
            {
                using (_db)
                {
                    var data = _db.VReadOutputs.ToList();
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
    }
}
