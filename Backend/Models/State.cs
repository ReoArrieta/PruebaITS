using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class State
    {
        public State()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
