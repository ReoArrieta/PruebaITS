using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly ITSCTX _db = new();
        private readonly Response _res = new();

        [HttpPost]
        public IActionResult Create(EntryRequest model)
        {
            try
            {
                using (_db)
                {
                    Product product = new();
                    product.Name = model.Name;
                    product.Quantity = model.Quantity;
                    product.Image = model.Image;
                    product.IdState = model.IdState;
                    _db.Products.Add(product);
                    _db.SaveChanges();

                    Entry entry = new();
                    entry.IdProduct = product.Id;
                    entry.Quantity = product.Quantity;
                    entry.Date = DateTime.Now;
                    entry.IdUser = model.IdUser;
                    _db.Entries.Add(entry);
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
                    var data = _db.VReadEntries.ToList();
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
