using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Teacher_management_system.Models
{
    public class Detail
    {
        public int Teacherid { get; set; }
        public int SalutationId { get; set; }
        public string Salutation { get; set; }
        public string firstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Age { get; set; }

        public string Gender { get; set; }

        public string PhoneNumber { get; set; }


        public int nationalId { get; set; }
       public string Nationality { get; set; }
    }
}