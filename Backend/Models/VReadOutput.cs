using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class VReadOutput
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public int IdUser { get; set; }
        public string Username { get; set; }
        public DateTime Date { get; set; }
    }
}
