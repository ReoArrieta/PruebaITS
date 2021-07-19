using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Request
{
    public class OutputRequest
    {
        public int IdProduct { get; set; }
        public int Quantity { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
    }
}
