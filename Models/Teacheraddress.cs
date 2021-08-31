using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Teacher_management_system.Models
{
    public class Teacheraddress
    {

        
        public string AddressType { get; set; }
        public int AddressTypeId { get; set; }

        public string Province { get; set; }
        public int ProvinceId { get; set; }


        public string City { get; set; }
        public int CityId { get; set; }
     

        public string Ward { get; set; }
        
        public string Tole { get; set; }
    }
}