using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Teacher_management_system.Models
{
    public class Teachermoduleinfo
    {

        public string Courses{get;set;}
        public int ClassId { get; set; }
            public int SectionId { get; set; }
        public string Class { get; set; }
        public string Section { get; set; }
        public string SelectedShift { get; set; }


    }
}