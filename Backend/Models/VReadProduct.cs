using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class VReadProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int IdState { get; set; }
        public string State { get; set; }
    }
}
