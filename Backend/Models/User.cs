using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.Models
{
    public partial class User
    {
        public User()
        {
            Entries = new HashSet<Entry>();
            Outputs = new HashSet<Output>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Identification { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Jwt { get; set; }

        public virtual ICollection<Entry> Entries { get; set; }
        public virtual ICollection<Output> Outputs { get; set; }
    }
}
