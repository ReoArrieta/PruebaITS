using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class Entry
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int Quantity { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }

        public virtual Product IdProductNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
