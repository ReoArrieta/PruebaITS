using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class Product
    {
        public Product()
        {
            Entries = new HashSet<Entry>();
            Outputs = new HashSet<Output>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public int IdState { get; set; }

        public virtual State IdStateNavigation { get; set; }
        public virtual ICollection<Entry> Entries { get; set; }
        public virtual ICollection<Output> Outputs { get; set; }
    }
}
